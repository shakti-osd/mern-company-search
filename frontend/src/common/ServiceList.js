import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import CodeIcon from "@mui/icons-material/Code";
import LanguageIcon from "@mui/icons-material/Language";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import VerifiedIcon from "@mui/icons-material/Verified";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { companyProfilesAPI, defaultPageSize } from "../helper/constant";
import SendMessage from "../components/SendMessage";
import { useSearchParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Loader from "./loader";
import CircularProgress from "@mui/material/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getLocalData } from "../utils";

export default function ServiceList() {
  const theme = createTheme();

  theme.typography.h2 = {
    fontSize: "1.2rem",
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.6rem",
    },
  };

  theme.typography.h5 = {
    fontSize: "1rem",
    marginLeft: "20px",
    marginTop: "-10px",
    fontWeight: "normal",
    "@media (min-width:600px)": {
      fontSize: ".3rem",
      marginLeft: "20px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: ".9rem",
      marginTop: "20px",
    },
  };

  theme.typography.link = {
    fontSize: "1rem",
    fontWeight: "normal",
    cursor: "pointer",
  };

  theme.typography.heading = {
    fontSize: "1rem",
    fontWeight: 700,
  };

  const navigate = useNavigate();
  const [companyProfileList, setCompanyProfileList] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [companyId, setCompanyId] = useState(null);

  const [contactCompany, setContactCompany] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactServices, setContactServices] = useState([]);

  const [isCompleted, setIsCompleted] = useState(false);
  const fetchComapanyList = (count = defaultPageSize) => {
    companyProfileList?.length === 0 && setIsLoading(true);
    axios
      .get(
        `${companyProfilesAPI}?location=${searchParams.get(
          "location"
        )}&service=${searchParams.get("service")}&count=${count}&skip=${
          companyProfileList?.length
        }`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        if (response?.data?.length)
          setCompanyProfileList([...companyProfileList, ...response?.data]);
        response?.data?.length < count && setIsCompleted(true);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  useEffect(() => {
    fetchComapanyList();
  }, []);

  const visitWebsite = (comapnyWebsite) => {
    window.open(comapnyWebsite, "_blank");
  };

  const openSendMessagePopUp = (companyName, saleEmail, subService, _id) => {
    setContactCompany(companyName);
    setContactEmail(saleEmail);
    setContactServices(subService);
    setCompanyId(_id);
    setOpen(true);
  };

  const handleClickCompanyProfile = (companyId) => {
    const path = `/company-profile/${companyId}`;
    navigate(path);
  };

  const closeSendMessageHandler = () => {
    setOpen(false);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div>
        <Box>
          <p>
            {companyProfileList.length} result
            {companyProfileList.length > 1 && `s`} found
          </p>
          <SendMessage
            openLogin={open}
            companyId={companyId}
            closeSendMessageHandler={closeSendMessageHandler}
            contactEmail={contactEmail}
            contactCompany={contactCompany}
            contactServices={contactServices}
          />
          <div
            id="scrollableDiv"
            style={{
              height: 600,
              overflow: "auto",
            }}
          >
            <InfiniteScroll
              dataLength={companyProfileList.length}
              next={fetchComapanyList}
              inverse={false}
              hasMore={!isCompleted}
              loader={
                <CircularProgress sx={{ display: "table", margin: "0 auto" }} />
              }
              scrollableTarget="scrollableDiv"
            >
              {companyProfileList.map(
                ({
                  _id,
                  companyName,
                  verified,
                  totalEmployees,
                  description,
                  companyWebsite,
                  city,
                  country,
                  clientComment,
                  reviews,
                  rating,
                  subService,
                  saleEmail = "",
                }) => (
                  <Card
                    key={Math.floor(Math.random() * 1000)}
                    variant="outlined"
                    style={{ marginBottom: "20px" }}
                  >
                    <Grid container spacing={2} p={2}>
                      <ThemeProvider theme={theme}>
                        <Grid item xs={12} md={9}>
                          <Grid container spacing={2}>
                            <Grid
                              item
                              xs={12}
                              md={6}
                              className="serviceProviderName"
                            >
                              <Typography variant="h2">
                                {companyName}
                              </Typography>
                            </Grid>
                            <Grid
                              xs={12}
                              md={6}
                              className="serviceProviderName"
                            >
                              <Typography variant="h5">
                                {description.substring(0, 30)}
                              </Typography>
                            </Grid>
                          </Grid>

                          <Typography className="serviceProviderRating">
                            {rating}
                            <Rating
                              style={{ margin: "0px 10px" }}
                              name="read-only"
                              value={rating}
                              readOnly
                            />
                            <Typography>{reviews} reviews</Typography>
                          </Typography>
                          <Divider sx={{ margin: "10px 0" }} />
                          <Grid container spacing={2}>
                            <Grid item xs={6} md={4}>
                              {verified && (
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  gap={1}
                                >
                                  <VerifiedIcon />
                                  <Typography variant="body1">
                                    Verified
                                  </Typography>
                                </Stack>
                              )}
                              <Stack
                                direction="row"
                                alignItems="center"
                                gap={1}
                              >
                                <CodeIcon />
                                <Typography variant="body1">10,000+</Typography>
                              </Stack>
                              <Stack
                                direction="row"
                                alignItems="center"
                                gap={1}
                              >
                                <PersonIcon />
                                <Typography variant="body1">
                                  0 - {totalEmployees}
                                </Typography>
                              </Stack>
                              <Stack
                                direction="row"
                                alignItems="center"
                                gap={1}
                              >
                                <FmdGoodIcon />
                                <Typography variant="body1">{`${city.cityName}, ${country.countryName}`}</Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={6} md={4}>
                              <Typography
                                varient="heading"
                                className="serviceTypographyroviderFocus"
                              >
                                Service Focus
                              </Typography>
                              {subService.map((item) => (
                                <Typography
                                  variant="link"
                                  key={item?._id}
                                  className="serviceProviderFocusName"
                                >
                                  {item?.subServiceName}
                                </Typography>
                              ))}
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <Typography className="serviceProviderreview">
                                {clientComment}
                              </Typography>
                              <Typography className="serviceProviderreviewBy">
                                - Tata Digital
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={3} className="websiteBox">
                          <Box className="borderBoxButton">
                            <Button
                              variant="contained"
                              onClick={() => visitWebsite(companyWebsite)}
                              endIcon={<LanguageIcon />}
                              sx={{ m: 1 }}
                            >
                              Visit Website
                            </Button>
                            <Button
                              variant="contained"
                              endIcon={<VisibilityIcon />}
                              sx={{ m: 1 }}
                              onClick={() => handleClickCompanyProfile(_id)}
                            >
                              View Profile
                            </Button>

                            {getLocalData(_id) ? (
                              <>
                                <Button
                                  disabled
                                  variant="contained"
                                  endIcon={<PermPhoneMsgIcon />}
                                  sx={{ m: 1 }}
                                >
                                  Contact
                                </Button>
                                <Typography
                                  component="div"
                                  variant="p"
                                  sx={{
                                    textAlign: "center",
                                    fontSize: "0.8rem",
                                    color: "#71ba54",
                                  }}
                                >
                                  Already Applied
                                </Typography>
                              </>
                            ) : (
                              <Button
                                variant="contained"
                                onClick={() =>
                                  openSendMessagePopUp(
                                    companyName,
                                    saleEmail,
                                    subService,
                                    _id
                                  )
                                }
                                endIcon={<PermPhoneMsgIcon />}
                                sx={{ m: 1 }}
                              >
                                Contact
                              </Button>
                            )}
                          </Box>
                        </Grid>
                      </ThemeProvider>
                    </Grid>
                  </Card>
                )
              )}
            </InfiniteScroll>
          </div>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {isCompleted && (
            <Typography
              variant="h3"
              noWrap
              component="a"
              sx={{
                mr: 2,
                fontFamily: "arial",
                fontWeight: 700,
                letterSpacing: ".3rem",
                wordWrap: "normal",
                fontSize: "1rem",
                lineHeight: "5rem",
              }}
            >
              No more data found...
            </Typography>
          )}
        </Box>
      </div>
    </>
  );
}
