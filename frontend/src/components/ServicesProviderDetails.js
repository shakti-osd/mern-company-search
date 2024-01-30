import React from "react";
import Grid from "@mui/material/Grid";

import ServiceList from "../common/ServiceList";

export default function ServicesProviderDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const location = urlParams.get("location");
  const service = urlParams.get("service");
  const getService = service.replace("_", " ");

  return (
    <div style={{ margin: "30px 0px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <p>
            List of the Top {location} {getService} Companies
          </p>
          <ServiceList />
        </Grid>
      </Grid>
    </div>
  );
}
