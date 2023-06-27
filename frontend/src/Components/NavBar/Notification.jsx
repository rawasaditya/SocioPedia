import { useState } from "react";
import { Notifications } from "@mui/icons-material";
import NotificationItem from "./NotificationItems";
import {
  IconButton,
  Divider,
  Menu,
  MenuList,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
const Notification = () => {
  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <Notifications sx={{ fontSize: "1.5rem" }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ width: "30rem", maxWidth: "100%" }}>
          <Box
            p="0.5rem 1rem"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1">Notifications.</Typography>
            <Typography color={medium} sx={{ fontSize: "0.7rem" }}>
              4m
            </Typography>
          </Box>
          <Divider />
          <MenuList>
            <NotificationItem
              message="Added you as a friends"
              name="John Doe"
              picture="p1.jpeg"
            />
            <NotificationItem
              message="Liked your post"
              name="Justin Rhysss"
              picture="p2.jpeg"
            />
            <NotificationItem
              message="Liked your post"
              name="Aditya Rawas"
              picture="p3.jpeg"
            />
            <NotificationItem
              message="Commented on you post"
              name="John Doe"
              picture="p1.jpeg"
            />
          </MenuList>
        </Box>
      </Menu>
    </>
  );
};

export default Notification;
