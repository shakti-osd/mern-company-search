import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import ServiceCard from "../common/ServiceCard";
import { getServicesAPI } from "../helper/constant";

export default function Service() {
  const [serviceList, setServiceList] = useState([]);
  useEffect(() => {
    axios
      .get(getServicesAPI, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setServiceList(response?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div style={{ margin: "30px 0px" }}>
      <Grid container spacing={2}>
        {serviceList.map((data) => {
          return (
            <Grid key={data._id} item sm={4} xs={12}>
              <Card className="cardContainer" variant="outlined">
                <ServiceCard  {...data} />
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
