import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GoogleIcon from "@mui/icons-material/Google";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xxs: "300px", sm: "400px" },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function LoginModal({ openLogin, closeLoginHandler }) {
  const handleClick = (loginWith) => {
    if (loginWith === "google") {
      // window.location.href = 'http://localhost:5555/auth/google'
      window.open("http://localhost:5555/auth/google", "_self");
    }
  };

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

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Modal
          open={openLogin}
          onClose={closeLoginHandler}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <p id="modal-modal-title" className="signInHeader">
              Sign In
            </p>
            <span id="modal-modal-description" className="signInDescription">
              to continue to techmate
            </span>
            <div className="loginWithBox">
              <Button
                variant="contained"
                startIcon={<LinkedInIcon />}
                sx={{ margin: "10px", padding: "15px 20px" }}
              >
                Siginup With LinkedIn
              </Button>
              <Button
                variant="contained"
                startIcon={<GoogleIcon />}
                sx={{ margin: "10px", padding: "15px 20px" }}
                onClick={() => handleClick("google")}
              >
                Siginup With Google
              </Button>
            </div>
            <Divider variant="fullWidth" />
            <p className="alternativeLogin">Alternative log in</p>
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
}
