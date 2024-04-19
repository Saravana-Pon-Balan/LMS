import * as React from "react";
import {  Link } from "react-router-dom";
import MoreIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';

export default function NavItems() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
    <Link to="/createcourse" style={{ textDecoration: "none" }}>
        <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <AddIcon />
        </IconButton>
        <p>Add Course</p>
      </MenuItem>
    </Link>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <HomeIcon />
          </Badge>
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <PeopleIcon />
          </Badge>
        </IconButton>
        <p>Follows</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: { xs: "none", md: "flex" },gap:"30px" }}>
       <Link to="/createcourse" style={{ textDecoration: "none",color:"white" }}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <AddIcon />
        </IconButton>
        </Link>
      <Link to="/feed" style={{ textDecoration: "none",color:"white" }}>
      <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={5} color="error">
            <HomeIcon />
          </Badge>
        </IconButton>
        </Link>
        <Link to="/network" style={{ textDecoration: "none",color:"white" }}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={5} color="error">
            <PeopleIcon />
          </Badge>
        </IconButton>
        </Link>
        <Link to="/message" style={{ textDecoration: "none",color:"white" }}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={5} color="error">
            <ChatIcon />
          </Badge>
        </IconButton>
        </Link>
        <Link to="/notification" style={{ textDecoration: "none",color:"white" }}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        </Link>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </Box>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
}
