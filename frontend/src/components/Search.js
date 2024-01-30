import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { subServiceAPI, locationAPI } from "../helper/constant";

const Search = () => {
  const [subServiceList, setSubServiceList] = useState([]);
  const [isServiceSelected, setIsServiceSelected] = useState(false);
  const [locationList, setLocationList] = useState([]);
  const [location, setLocation] = useState("");
  const [cityNoOptionText, setCityNoOptionText] = useState("Type city name");
  const [subServiceNoOptionText, setSubServiceNoOptionText] =
    useState("Type service");

  useEffect(() => {
    getSubServicesList();
    getLocationList();
  }, []);

  const getSubServicesList = (str = "") => {
    axios
      .get(`${subServiceAPI}?search=${str}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (!response?.data?.length)
          setSubServiceNoOptionText("No result found");
        setSubServiceList(response?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getLocationList = (str = "") => {
    axios
      .get(`${locationAPI}?search=${str}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (!response?.data?.length) setCityNoOptionText("No result found");
        setLocationList(response?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleServiceChange = (e, value) => {
    value ? setIsServiceSelected(true) : setIsServiceSelected(false);
  };

  const handleChange = () => {
    if (!locationList.length) return;
    setTimeout(() => {
      const selectedService = document.getElementById("serviceList").value;
      const selectedLocation = document.getElementById("locationList").value;
      window.location.href = `${
        window.location.origin
      }/listing?service=${selectedService.replace(
        / /g,
        "_"
      )}&location=${selectedLocation.replace(/ /g, "_")}`;
    }, 1);
  };
  return (
    <>
      <Container style={{ padding: 0 }}>
        <Box className="search-bg">
          <div style={{ color: "black" }}>
            <p className="heroBannerTitle">Hiring from the top most company</p>
            <p className="heroBannerDescription">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout
            </p>

            <Box sx={{ p: "20px", mr: 2, maxWidth: "600px", display: "flex" }}>
              <Autocomplete
                disablePortal
                id="serviceList"
                getOptionLabel={(option) => option.subServiceName}
                options={subServiceList}
                noOptionsText={subServiceNoOptionText}
                onChange={handleServiceChange}
                onInputChange={(ev, str) => getSubServicesList(str)}
                className="autoCompleteHero"
                renderInput={(params) => (
                  <TextField {...params} label="Search Services ...." />
                )}
              />
              <Autocomplete
                disablePortal
                disabled={!isServiceSelected}
                id="locationList"
                getOptionLabel={(option) => option.cityName}
                options={locationList}
                onChange={handleChange}
                noOptionsText={cityNoOptionText}
                onInputChange={(ev, str) => getLocationList(str)}
                className="autoCompleteHero"
                renderInput={(loc) => (
                  <TextField {...loc} label="Location Search" />
                )}
              />
            </Box>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default Search;
