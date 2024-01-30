import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import LoginModal from "./LoginModal";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

export default function Header({ userData }) {
  let email, displayname, picture;
  if (userData) {
    email = userData.email;
    displayname = userData.displayName;
    picture = userData.picture;
  }
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [login, setLogin] = useState(false);
  useEffect(() => {
    if (email) setLogin(true);
    else setLogin(false);
  }, [email]);

  const logoutHandler = async () => {
    window.location.assign("http://localhost:5555/user/logout");
    // const url = "http://localhost:5555/user/logout";
    // const { data } = await axios.get(url);
    // console.log("data_logout", data);
    // setLogin(false);
  };

  const [open, setOpen] = useState(false);

  const openLoginHandler = () => {
    setOpen(true);
  };

  const closeLoginHandler = () => {
    setOpen(false);
  };

  const mobileMenuItems = () => {
    return (
      <Box sx={{ backgroundColor: "#333" }}>
        <MenuItem>
          <NavLink
            to="/profile"
            className={(isActive) =>
              "nav-link" + (!isActive ? " unselected" : "")
            }
            style={{ textDecoration: "none" }}
          >
            <Button sx={{ p: 0, my: 1, color: "#fff" }}>My Profile</Button>
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink
            to="/edit-company-profile"
            className={(isActive) =>
              "nav-link" + (!isActive ? " unselected" : "")
            }
            style={{ textDecoration: "none" }}
          >
            <Button sx={{ p: 0, my: 1, color: "#fff" }}>Company Profile</Button>
          </NavLink>
        </MenuItem>
        <Divider dark="true" />
        <MenuItem>
          <NavLink
            to="/about-us"
            className={(isActive) =>
              "nav-link" + (!isActive ? " unselected" : "")
            }
            style={{ textDecoration: "none" }}
          >
            <Button sx={{ p: 0, my: 1, color: "white" }}>About Us</Button>
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink
            to="/services"
            className={(isActive) =>
              "nav-link" + (!isActive ? " unselected" : "")
            }
            style={{ textDecoration: "none" }}
          >
            <Button sx={{ p: 0, my: 1, color: "white" }}>Services</Button>
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink
            to="/contact-us"
            className={(isActive) =>
              "nav-link" + (!isActive ? " unselected" : "")
            }
            style={{ textDecoration: "none" }}
          >
            <Button sx={{ p: 0, my: 1, color: "white" }}>Contact Us</Button>
          </NavLink>
        </MenuItem>
        <Divider dark="true" />
        <MenuItem>
          <NavLink
            className={(isActive) =>
              "nav-link" + (!isActive ? " unselected" : "")
            }
            style={{ textDecoration: "none" }}
          >
            <Button
              sx={{ p: 0, my: 1, color: "white" }}
              onClick={login ? logoutHandler : openLoginHandler}
            >
              {login ? "Logout" : "Login"}
            </Button>
          </NavLink>
        </MenuItem>
      </Box>
    );
  };

  const desktopMenuItems = () => {
    return (
      <>
        <NavLink
          to="/about-us"
          className={(isActive) =>
            "nav-link" + (!isActive ? " unselected" : "")
          }
          style={{ textDecoration: "none" }}
        >
          <Button sx={{ my: 2, color: "white" }}>About Us</Button>
        </NavLink>
        <NavLink
          to="/services"
          className={(isActive) =>
            "nav-link" + (!isActive ? " unselected" : "")
          }
          style={{ textDecoration: "none" }}
        >
          <Button sx={{ my: 2, color: "white" }}>Services</Button>
        </NavLink>
        <NavLink
          to="/contact-us"
          className={(isActive) =>
            "nav-link" + (!isActive ? " unselected" : "")
          }
          style={{ textDecoration: "none" }}
        >
          <Button sx={{ my: 2, color: "white" }}>Contact Us</Button>
        </NavLink>
      </>
    );
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#333" }}>
      <LoginModal openLogin={open} closeLoginHandler={closeLoginHandler} />
      <Container style={{ padding: "0", position: "relative" }} maxWidth="xl">
        <Toolbar
          sx={{ maxWidth: "1200px", margin: "0 auto" }}
          disablegutters="true"
        >
          <NavLink
            to="/"
            className={(isActive) =>
              "nav-link" + (!isActive ? " unselected" : "")
            }
            style={{
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                p: "0 10px",
                mr: 2,
                display: { md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
              }}
            >
              TechMate
            </Typography>
          </NavLink>
          {/* Mobile Menu Items Starts */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none", lg: "none" },
              position: "absolute",
              right: 0,
            }}
            disablegutters="true"
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              className="menuAppbarMobile"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {mobileMenuItems()}
            </Menu>
          </Box>
          {/* Mobile Menu Items Ends */}

          {/* Desktop Menu Items Starts */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", lg: "flex" },
            }}
          >
            {desktopMenuItems()}
          </Box>
          {/* Desktop Menu Items Ends */}
          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "none", md: "flex", lg: "flex" },
            }}
          >
            <Typography sx={{ p: "10px" }}>
              Welcome{" "}
              <strong style={{ color: "#7fffd4" }}>
                {login ? displayname : "Guest"}
              </strong>
            </Typography>
            <Tooltip title="Account settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="User"
                  src={login ? `${picture}` : `/static/images/avatar/2.jpg`}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ margin: "45px auto 0px" }}
              id="menu-appbar"
              className="menuAppbarDesktop"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {login && (
                <MenuItem onClick={handleCloseUserMenu}>
                  <NavLink
                    to="/profile"
                    className={(isActive) =>
                      "nav-link" + (!isActive ? " unselected" : "")
                    }
                    style={{ textDecoration: "none" }}
                  >
                    <Button sx={{ p: 0, my: 1, color: "#000" }}>
                      My Profile
                    </Button>
                  </NavLink>
                </MenuItem>
              )}
              {login && (
                <MenuItem onClick={handleCloseUserMenu}>
                  <NavLink
                    to="/edit-company-profile"
                    className={(isActive) =>
                      "nav-link" + (!isActive ? " unselected" : "")
                    }
                    style={{ textDecoration: "none" }}
                  >
                    <Button sx={{ p: 0, my: 1, color: "#000" }}>
                      Company Profile
                    </Button>
                  </NavLink>
                </MenuItem>
              )}
              <MenuItem onClick={handleCloseUserMenu}>
                <NavLink
                  className={(isActive) =>
                    "nav-link" + (!isActive ? " unselected" : "")
                  }
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    sx={{ p: 0, my: 1, color: "#000" }}
                    onClick={login ? logoutHandler : openLoginHandler}
                  >
                    {login ? "Logout" : "Login"}
                  </Button>
                </NavLink>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
