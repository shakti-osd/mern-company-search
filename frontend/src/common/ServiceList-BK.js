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
import { companyProfilesAPI } from "../helper/constant";
import SendMessage from "../components/SendMessage";
import { useSearchParams } from "react-router-dom";

export default function ServiceList() {
  const [companyProfileList, setCompanyProfileList] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchComapanyList();
  }, []);

  const fetchComapanyList = () => {
    axios
      .get(
        `${companyProfilesAPI}?location=${searchParams.get(
          "location"
        )}&service=${searchParams.get("service")}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        if (response?.data?.length) setCompanyProfileList(response?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const visitWebsite = (comapnyWebsite) => {
    window.open(comapnyWebsite, "_blank");
  };

  const openSendMessagePopUp = () => {
    setOpen(true);
  };

  const closeSendMessageHandler = () => {
    setOpen(false);
  };

  return (
    <div>
      <SendMessage
        openLogin={open}
        closeSendMessageHandler={closeSendMessageHandler}
      />
      {companyProfileList.map(
        ({
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
        }) => (
          <Card variant="outlined" style={{ marginBottom: "20px" }}>
            <Grid container spacing={2}>
              <Grid item xs={9} style={{ marginLeft: "20px" }}>
                <p className="serviceProviderName">
                  {companyName}
                  <span>{description}</span>
                </p>
                <p className="serviceProviderRating">
                  {rating}
                  <Rating
                    style={{ margin: "0px 10px" }}
                    name="read-only"
                    value={rating}
                    readOnly
                  />
                  <span>{reviews} reviews</span>
                </p>
                <Divider />
                <Grid container spacing={2}>
                  <Grid item xs={4} style={{ marginTop: "10px" }}>
                    {verified && (
                      <Stack direction="row" alignItems="center" gap={1}>
                        <VerifiedIcon />
                        <Typography variant="body1">Verified</Typography>
                      </Stack>
                    )}
                    <Stack direction="row" alignItems="center" gap={1}>
                      <CodeIcon />
                      <Typography variant="body1">10,000+</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <PersonIcon />
                      <Typography variant="body1">
                        0 - {totalEmployees}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <FmdGoodIcon />
                      <Typography variant="body1">{`${city.cityName}, ${country.countryName}`}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={4}>
                    <p className="serviceProviderFocus">Service Focus</p>
                    {subService.map((item) => (
                      <p className="serviceProviderFocusName">
                        {item?.subServiceName}
                      </p>
                    ))}
                  </Grid>
                  <Grid item xs={4}>
                    <p className="serviceProviderreview">{clientComment}</p>
                    <p className="serviceProviderreviewBy">Tata Digital</p>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2} className="websiteBox">
                <div className="borderBoxButton">
                  <Button
                    variant="contained"
                    onClick={() => visitWebsite(companyWebsite)}
                    endIcon={<LanguageIcon />}
                  >
                    Visit Website
                  </Button>
                  <Button variant="contained" endIcon={<VisibilityIcon />}>
                    View Profile
                  </Button>
                  <Button
                    variant="contained"
                    onClick={openSendMessagePopUp}
                    endIcon={<PermPhoneMsgIcon />}
                  >
                    Contact
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Card>
        )
      )}
    </div>
  );
}
