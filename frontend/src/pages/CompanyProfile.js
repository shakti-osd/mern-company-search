import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import axios from "axios";
import { companyProfilesAPI } from "../helper/constant";
import { Chart } from "react-google-charts";

import {
  Link,
  Grid,
  List,
  ListItemText,
  Tab,
  Tabs,
  ListSubheader,
  createTheme,
  ThemeProvider,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import PropTypes from "prop-types";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const theme = createTheme({
  breakpoints: {
    values: {
      xxs: 0, // small phone
      xs: 300, // phone
      sm: 600, // tablets
      md: 900, // small laptop
      lg: 1200, // desktop
      xl: 1536, // large screens
    },
  },
});

export default function CompanyProfile() {
  const [companyDetails, setCompanyDetails] = useState({});
  let { id } = useParams();

  useEffect(() => {
    if (id) {
      getProfileById(id);
    }
  }, [id]);

  const getProfileById = (id) => {
    axios
      .post(
        `${companyProfilesAPI}/getProfileById`,
        {
          profileId: id,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setCompanyDetails({ ...companyDetails, ...response.data[0] });
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container style={{ padding: 0, minHeight: "450px" }}>
        <CompanyHeader {...companyDetails} />
        <Grid container>
          <Grid
            container
            item
            sm={6}
            xs={12}
            spacing={2}
            sx={{
              paddingRight: { xs: "18px" },
              paddingLeft: { xs: "18px", sm: "0" },
            }}
          >
            <Grid item xs={12}>
              <Typography
                noWrap
                variant="h3"
                component="h3"
                sx={{
                  mr: 2,
                  fontFamily: "arial",
                  fontWeight: 500,
                  letterSpacing: ".3rem",
                  wordWrap: "normal",
                  fontSize: "1.6rem",
                  lineHeight: "2rem",
                  minHeight: "32px",
                  color: "#717171",
                }}
              >
                {companyDetails.tagline}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography
                variant="h3"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  fontFamily: "arial",
                  wordWrap: "normal",
                  fontSize: ".8rem",
                  lineHeight: "1.2rem",
                  whiteSpace: "normal",
                  color: "#6a797d",
                  overflowWrap: "anywhere",
                }}
              >
                {companyDetails.description}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              sx={{
                paddingBottom: { xs: "16px" },
              }}
            >
              <List
                sx={{
                  paddingTop: "0",
                  paddingBottom: "0",
                  marginRight: "16px",
                }}
              >
                <ListItemText>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#434f52",
                    }}
                  >
                    <Typography
                      variant="p"
                      component="p"
                      sx={{ fontSize: "14px", fontWeight: "bold" }}
                    >
                      Total Employee
                    </Typography>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        fontSize: "14px",
                        color: "#377b8e",
                        fontWeight: "bold",
                      }}
                    >
                      {companyDetails.totalEmployees}
                    </Typography>
                  </div>
                </ListItemText>
                <ListItemText>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#434f52",
                    }}
                  >
                    <Typography
                      variant="p"
                      component="p"
                      sx={{ fontSize: "14px", fontWeight: "bold" }}
                    >
                      Founding Year
                    </Typography>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        fontSize: "14px",
                        color: "#377b8e",
                        fontWeight: "bold",
                      }}
                    >
                      {companyDetails.foundingYear}
                    </Typography>
                  </div>
                </ListItemText>
              </List>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <BasicTabs {...companyDetails} />
          </Grid>
          <Grid
            container
            spacing={2}
            mb={4}
            mt={2}
            sx={{ paddingLeft: { xs: "18px" }, paddingRight: { xs: "18px" } }}
          >
            <Grid item xs={12} sm={3}>
              <Card sx={{ borderTop: "solid 3px #3e839e" }}>
                <CardActionArea>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="p"
                      component="div"
                      sx={{ color: "#969696", fontSize: "16px" }}
                    >
                      Average Review Rating
                    </Typography>
                    <Typography variant="h4" color="text.secondary">
                      5.0
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Card sx={{ borderTop: "solid 3px #e62415" }}>
                <CardActionArea>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="p"
                      component="div"
                      sx={{ color: "#969696", fontSize: "16px" }}
                    >
                      Total Reviews
                    </Typography>
                    <Typography variant="h4" color="text.secondary">
                      28
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Card sx={{ borderTop: "solid 3px #44cc24" }}>
                <CardActionArea>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="p"
                      component="div"
                      sx={{ color: "#969696", fontSize: "16px" }}
                    >
                      Most Common Project Size
                    </Typography>
                    <Typography variant="h4" color="text.secondary">
                      $1000 - $5000
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Card sx={{ borderTop: "solid 3px #ffb635" }}>
                <CardActionArea>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="p"
                      component="div"
                      sx={{ color: "#969696", fontSize: "16px" }}
                    >
                      Average Referral Rating
                    </Typography>
                    <Typography variant="h4" color="text.secondary">
                      5.0
                      <Typography variant="p" component="small">
                        /5
                      </Typography>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>

          <Grid xs={12} mb={4}>
            <iframe
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Dew%20Solutions%20Pvt%20Ltd+(Dew%20Solutions%20Pvt%20Ltd)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              height="450"
              frameborder="0"
              style={{ border: "solid 1px #cae0e7", width: "100%" }}
              allowfullscreen=""
              aria-hidden="false"
              tabindex="0"
              title="address"
            ></iframe>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

function CompanyHeader({ companyName, companyWebsite }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 18px",
        border: { sm: "1px solid #cae0e7" },
        borderBottom: { xs: "1px solid #cae0e7" },
        marginTop: { sm: "32px" },
        marginBottom: { sm: "32px", xs: "24px" },
        minHeight: "80px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <img
          src="https://img.shgstatic.com/clutchco-static/image/scale/50x50/s3fs-public/logos/1609a20199588d17caa666aaa7697810.png"
          height="50"
          alt={companyName}
        />

        <Typography
          variant="h2"
          noWrap
          component="a"
          sx={{
            mr: 2,
            fontFamily: "arial",
            fontWeight: 500,
            letterSpacing: { sm: ".3rem" },
            wordWrap: "normal",
            fontSize: { sm: "1.6rem", xs: "1.3rem" },
            lineHeight: "5rem",
          }}
        >
          {companyName}
        </Typography>
      </Box>

      <Box sx={{ display: { sm: "block", xs: "none" } }}>
        {/* <Link href="#" color="inherit" underline="none" sx={{ marginRight: 2 }}>
          Link 1
        </Link>
        <Link href="#" color="inherit" underline="none" sx={{ marginRight: 2 }}>
          Link 2
        </Link> */}
        <Link
          href={companyWebsite}
          target="_blank"
          variant="contained"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            "&:hover": {
              color: "#404644",
              translate: "1px 1px",
            },
          }}
        >
          {"Visit Website"}
          <ChevronRightIcon />
        </Link>
      </Box>
      <Box sx={{ display: { sm: "none", xs: "block" } }}>
        <Link
          href={companyWebsite}
          target="_blank"
          variant="contained"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            "&:hover": {
              color: "#404644",
              translate: "1px 1px",
            },
          }}
        >
          <ChevronRightIcon />
        </Link>
      </Box>
    </Box>
  );
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function BasicTabs({ subService }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ width: "100%", border: "solid 1px #cae0e7", minHeight: "300px" }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="info"
          sx={{
            ".MuiTabs-flexContainer": {
              justifyContent: "space-between",
            },
            ".Mui-selected": {
              background: "#cae0e7",
              fontWeight: "bold",
            },

            "&.MuiTab-textColorPrimary": {
              color: "#7fffd4",
            },
          }}
        >
          <Tab
            label="Services Provided"
            {...a11yProps(0)}
            sx={{
              paddingLeft: "24px",
            }}
          />
          <Tab label="Focus" {...a11yProps(1)} />
          <Tab label="Industries" {...a11yProps(2)} />
          <Tab
            label="Clients"
            {...a11yProps(3)}
            sx={{ paddingRight: "24px" }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Grid container>
          <Grid sm={5} pr={2}>
            <PieChart />
          </Grid>
          <Grid sm={7} sx={{ width: "100%" }}>
            <List
              sx={{ width: "100%" }}
              subheader={
                <ListSubheader
                  sx={{
                    bgcolor: "transparent",
                    borderBottom: 1,
                    paddingLeft: 0,
                    paddingRight: 0,
                    position: "none",
                  }}
                  component="div"
                >
                  Service Lines
                </ListSubheader>
              }
            >
              {subService &&
                subService.map(({ _id, subServiceName }) => (
                  <ListItemText sx={{ color: "#6a797d" }} key={_id}>
                    {subServiceName}
                  </ListItemText>
                ))}
            </List>
          </Grid>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Focus
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Industries
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Clients
      </CustomTabPanel>
    </Box>
  );
}

function PieChart() {
  const data = [
    ["Service", "Percentage"],
    ["Web Development", 48],
    ["Search Engine Optimization", 10],
    ["UI Design", 20],
    ["UX Design", 22],
  ];

  const options = {
    is3D: true,
    legend: "none",
    backgroundColor: "#f5f5f5",
    padding: "8px",
    chartArea: { width: "100%", height: "100%" },
  };

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={window.innerWidth < 600 ? "calc(100vw - 64px)" : "100%"}
      height={"200px"}
    />
  );
}
