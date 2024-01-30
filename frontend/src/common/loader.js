import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
const TransitionPopUp = styled("div")`
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  backdrop-filter: blur(2px);
`;

export default function Loader() {
  return (
    <TransitionPopUp sx={{ display: "flex" }}>
      <CircularProgress sx={{ position: "fixed", top: "50%", left: "50%" }} />
    </TransitionPopUp>
  );
}
