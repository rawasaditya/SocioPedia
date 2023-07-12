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
  Badge,
} from "@mui/material";
import { useSelector } from "react-redux";
const Notification = () => {
  const notification = useSelector((state) => state.notification);
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
        <Badge badgeContent={notification.length} color="primary">
          <Notifications sx={{ fontSize: "1.5rem" }} />
        </Badge>
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
          </Box>
          <Divider />
          <MenuList>
            {notification.map((i) => (
              <NotificationItem
                key={i._id}
                message={i.description}
                name={`${i?.initiator?.firstName} ${i?.initiator?.lastName}`}
                picture={i.initiator.picturePath}
                date={i.date}
              />
            ))}
          </MenuList>
        </Box>
      </Menu>
    </>
  );
};

export default Notification;
