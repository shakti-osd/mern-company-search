import React, { useEffect, useState } from "react";
import axios from "axios";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AutoFixOffIcon from "@mui/icons-material/AutoFixOff";
import { subServiceAPI } from "../helper/constant";

const ServiceCard = ({ _id, serviceName }) => {
  const [subServiceList, setSubServiceList] = useState([]);
  useEffect(() => {
    axios
      .get(`${subServiceAPI}?serviceId=${_id}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setSubServiceList(response?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [_id]);
  return (
    <React.Fragment>
      <CardContent>
        <Typography className="cardServiceName" gutterBottom>
          <AutoFixOffIcon /> <span>{serviceName}</span>
        </Typography>
        {subServiceList.map((item) => (
          <Typography key={item._id} className="subServicename" variant="h5" component="div">
            {item?.subServiceName || ""}
          </Typography>
        ))}
      </CardContent>
    </React.Fragment>
  );
};

export default ServiceCard;
