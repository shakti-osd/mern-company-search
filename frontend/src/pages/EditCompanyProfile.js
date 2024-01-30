import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import {
  Box,
  Button,
  Divider,
  Chip,
  Snackbar,
  Autocomplete,
} from '@mui/material';

import { useAuth } from '../context/AuthContext';
import { isValidUrl, isValidEmail, isValidPhoneNumber } from '../helper/utils';

import axios from 'axios';
import {
  subServiceAPI,
  companyProfilesAPI,
  locationAPI,
  countryAPI,
} from '../helper/constant';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const currentYear = new Date().getFullYear();
const yearsArray = [...Array(100)].map((_, i) => currentYear - i);
const employeeRanges = [
  'Freelancer',
  '2 - 9',
  '10 - 49',
  '50 - 249',
  '250 - 999',
];
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function EditCompanyProfile() {
  const { user } = useAuth();

  const [subServiceList, setSubServiceList] = React.useState([]);
  const [selectedSubServiceList, setSelectedSubServiceList] = React.useState(
    []
  );

  const [locationList, setLocationList] = React.useState([]);
  const [countryList, setCountryList] = React.useState([]);
  const [cityNoOptionText, setCityNoOptionText] =
    React.useState('Type city name');

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [existingProfile, setExistingProfile] = React.useState(false);
  const [emailExistsError, setEmailExistsError] = React.useState(false);
  const [companyDetails, setCompanyDetails] = React.useState({
    companyName: '',
    city: null,
    country: null,
    subService: [],
    address: '',
    phone: '',
    companyWebsite: '',
    totalEmployees: -1,
    foundingYear: -1,
    tagline: '',
    description: '',
    companyLogo: '',
    saleEmail: '',
    userId: user.userId,
  });

  React.useEffect(() => {
    const { userId } = user;
    if (userId) {
      getSubServicesList();
      getLocationList();
      getCountryList();
      getProfileById();
    }
  }, [user]);

  const getSubServicesList = (str = '') => {
    axios
      .get(`${subServiceAPI}?search=${str}`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        if (response?.data?.length) setSubServiceList(response?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getLocationList = (str = '') => {
    axios
      .get(`${locationAPI}?search=${str}`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        if (!response?.data?.length) setCityNoOptionText('No result found');

        setLocationList(response?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getCountryList = (str = '') => {
    axios
      .get(`${countryAPI}?search=${str}`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        if (!response?.data?.length) setCityNoOptionText('No result found');

        setCountryList(response?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getProfileById = () => {
    axios
      .post(
        `${companyProfilesAPI}/getProfileById`,
        {
          userId: user.userId,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setCompanyDetails({ ...companyDetails, ...response.data[0] });
          setExistingProfile(response.data[0].saleEmail ? true : false);

          const subServiceList =
            response.data[0]?.subService?.map((item) => item.subServiceName) ||
            [];
          setSelectedSubServiceList(subServiceList);
        }
      })
      .catch((error) => console.error(error));
  };

  function handleSubServicesChange(event) {
    const {
      target: { value },
    } = event;

    setSelectedSubServiceList(
      typeof value === 'string' ? value.split(',') : value
    );
  }

  function handleChange(event) {
    setCompanyDetails((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleCityChange(event, newValue) {
    setCompanyDetails((prev) => ({
      ...prev,
      city: newValue,
    }));
  }

  function handleCountryChange(event, newValue) {
    setCompanyDetails((prev) => ({
      ...prev,
      country: newValue,
    }));
  }

  const checkEmail = async (email, newUser = false) => {
    try {
      const response = await axios.post(
        `${companyProfilesAPI}/checkEmail`,
        { saleEmail: email },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (newUser) {
        if (response.status === 200) {
          setEmailExistsError(false);
        } else if (response.status === 203) {
          setEmailExistsError(true);
        }
      }
      return response.status;
    } catch (error) {
      console.error('Error checking email:', error);
      return null;
    }
  };

  async function saveCompanyDetails(event) {
    event.preventDefault();

    const subService = [];
    subServiceList.forEach((item) => {
      if (selectedSubServiceList.includes(item.subServiceName)) {
        subService.push(item);
      }
    });

    const email = companyDetails.saleEmail.trim();

    if (email !== '') {
      const status = await checkEmail(email);

      if (status === 200) {
        // Handle profile creation
        try {
          const response = await axios.post(
            `${companyProfilesAPI}/profileCreate`,
            { ...companyDetails, subService, userId: user.userId },
            {
              headers: { 'Content-Type': 'application/json' },
            }
          );
          setOpenSnackbar(true);
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      } else if (status === 203) {
        // Handle profile update
        try {
          const response = await axios.patch(
            `${companyProfilesAPI}/profileUpdate`,
            { ...companyDetails, subService, userId: user.userId },
            {
              headers: { 'Content-Type': 'application/json' },
            }
          );
          setOpenSnackbar(true);
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }

  function handleBlur(event) {
    const email = companyDetails.saleEmail.trim();

    // Check if the email exists in the database using the API
    if (email !== '') {
      checkEmail(email, true);
    }
  }

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <p>Edit Company Profile</p>
          </Grid>
        </Grid>
        <form onSubmit={saveCompanyDetails}>
          <Grid
            container
            sx={{ mb: 6, flexDirection: { xs: 'column', md: 'row' } }}
            spacing={2}
          >
            <Grid item md={6} xs={12}>
              <InputLabel>Company name</InputLabel>
              <TextField
                onChange={handleChange}
                fullWidth
                required
                value={companyDetails.companyName}
                id="companyName"
                name="companyName"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputLabel>Company Website</InputLabel>
              <TextField
                fullWidth
                name="companyWebsite"
                id="companyWebsite"
                required
                value={companyDetails.companyWebsite}
                onChange={handleChange}
                inputMode="url"
                variant="outlined"
                error={Boolean(
                  companyDetails.companyWebsite &&
                    companyDetails.companyWebsite !== '' &&
                    !isValidUrl(companyDetails.companyWebsite)
                )}
                helperText={
                  companyDetails.companyWebsite &&
                  companyDetails.companyWebsite !== '' &&
                  !isValidUrl(companyDetails.companyWebsite)
                    ? 'The value provided for Website is not a valid URL; http:// or https:// prefix is required.'
                    : ''
                }
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputLabel className="serviceProviderRating">
                Total Employees<span>*</span>{' '}
              </InputLabel>
              <FormControl required sx={{ minWidth: 250, width: '100%' }}>
                <Select
                  name="totalEmployees"
                  required
                  value={companyDetails.totalEmployees}
                  onChange={handleChange}
                >
                  <MenuItem value={-1}>
                    <em>- Select a value -</em>
                  </MenuItem>
                  {employeeRanges.map((range) => (
                    <MenuItem value={range}>{range}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <InputLabel className="serviceProviderRating">
                Sales Email<span>*</span>{' '}
              </InputLabel>
              <TextField
                fullWidth
                name="saleEmail"
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={existingProfile}
                sx={{
                  '& .MuiInputBase-input.Mui-disabled': {
                    backgroundColor: 'rgba(0, 0, 0, 0.12)',
                  },
                }}
                required
                value={companyDetails.saleEmail}
                inputMode="email"
                autoComplete="email"
                variant="outlined"
                error={Boolean(
                  companyDetails.saleEmail &&
                    companyDetails.saleEmail !== '' &&
                    !isValidEmail(companyDetails.saleEmail) &&
                    emailExistsError
                )}
                helperText={
                  companyDetails.saleEmail &&
                  companyDetails.saleEmail !== '' &&
                  !isValidEmail(companyDetails.saleEmail)
                    ? 'Sale Email is required'
                    : emailExistsError
                    ? 'Email already exists in the database'
                    : ''
                }
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputLabel className="serviceProviderRating">
                Founding Year<span>*</span>{' '}
              </InputLabel>
              <FormControl required sx={{ minWidth: 250, width: '100%' }}>
                <Select
                  name="foundingYear"
                  required
                  value={companyDetails.foundingYear}
                  variant="outlined"
                  onChange={handleChange}
                >
                  <MenuItem value={-1}>
                    <em>- Select a value -</em>
                  </MenuItem>
                  {yearsArray.map((year, i) => (
                    <MenuItem value={year}>{year}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={6} xs={12}>
              <InputLabel className="serviceProviderRating">
                Admin Contact Phone<span>*</span>
              </InputLabel>
              <TextField
                fullWidth
                name="phone"
                inputMode="phone"
                required
                value={companyDetails.phone}
                onChange={handleChange}
                autoComplete="phone"
                variant="outlined"
                error={Boolean(
                  companyDetails.phone &&
                    companyDetails.phone !== '' &&
                    !isValidPhoneNumber(companyDetails.phone)
                )}
                helperText={
                  companyDetails.phone &&
                  companyDetails.phone !== '' &&
                  !isValidPhoneNumber(companyDetails.phone)
                    ? 'Enter valid phone number'
                    : ''
                }
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <div>
                <InputLabel>Sub Services</InputLabel>
                <FormControl sx={{ minWidth: 250, width: '100%' }}>
                  <Select
                    id="demo-multiple-chip"
                    name="subService"
                    multiple
                    required
                    displayEmpty
                    value={selectedSubServiceList}
                    onChange={handleSubServicesChange}
                    renderValue={(selected) => {
                      if (selected.length === '') {
                        return <em>- Select Sub-Service -</em>;
                      }
                      return (
                        <Box
                          sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      );
                    }}
                    MenuProps={MenuProps}
                  >
                    <MenuItem disabled value="">
                      <em>- Select Sub-Service -</em>
                    </MenuItem>
                    {subServiceList.map((item) => (
                      <MenuItem key={item._id} value={item.subServiceName}>
                        {item.subServiceName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Grid>

            <Grid item md={6} xs={12}>
              <InputLabel className="serviceProviderRating">Tagline</InputLabel>
              <TextField
                fullWidth
                value={companyDetails.tagline}
                required
                name="tagline"
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <InputLabel className="serviceProviderRating">Address</InputLabel>
              <TextField
                fullWidth
                value={companyDetails.address}
                required
                name="address"
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <InputLabel className="serviceProviderRating">City</InputLabel>
              <Autocomplete
                fullWidth
                disablePortal
                id="city"
                name="city"
                value={companyDetails.city}
                getOptionLabel={(option) => option.cityName}
                options={locationList}
                onChange={handleCityChange}
                noOptionsText={cityNoOptionText}
                onInputChange={(ev, str) => getLocationList(str)}
                className="autoCompleteHero"
                renderInput={(loc) => (
                  <TextField {...loc} placeholder="Location Search" />
                )}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <InputLabel className="serviceProviderRating">Country</InputLabel>
              <Autocomplete
                fullWidth
                disablePortal
                id="country"
                name="country"
                value={companyDetails.country}
                getOptionLabel={(option) => option.countryName}
                options={countryList}
                onChange={handleCountryChange}
                noOptionsText={cityNoOptionText}
                onInputChange={(ev, str) => getCountryList(str)}
                className="autoCompleteHero"
                renderInput={(loc) => (
                  <TextField {...loc} placeholder="Country Search" />
                )}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <InputLabel className="serviceProviderRating">
                Company Logo
              </InputLabel>
              <TextField
                fullWidth
                required
                value={companyDetails.companyLogo}
                name="companyLogo"
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <InputLabel className="serviceProviderRating">
                Desciption<span>*</span>
              </InputLabel>
              <TextField
                fullWidth
                onChange={handleChange}
                multiline
                value={companyDetails.description}
                rows={4}
                name="description"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Divider />
          <Box sx={{ m: 4, display: 'flex' }} justifyContent="flex-end">
            <Button
              disabled={
                emailExistsError ||
                !isValidEmail(companyDetails.saleEmail) ||
                !isValidUrl(companyDetails.companyWebsite) ||
                !isValidPhoneNumber(companyDetails.phone)
              }
              type="submit"
              variant="contained"
            >
              Save Changes
            </Button>
          </Box>
        </form>
      </Container>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={(e) => setOpenSnackbar(false)}
        message="Company information saved succesfully"
      />
    </>
  );
}
