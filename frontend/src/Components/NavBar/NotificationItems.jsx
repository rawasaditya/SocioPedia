import { MenuItem, Box, Typography, useTheme } from "@mui/material";
import UserImage from "../UserImage";
const NotificationItems = ({ message, name, picture }) => {
  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  return (
    <MenuItem>
      <Box display="flex" flexDirection="column" sx={{ width: "100%" }}>
        <Typography color={medium} sx={{ fontSize: "0.7rem" }}>
          4m ago
        </Typography>
        <Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color={main}>
              <Typography variant="body1">{name}</Typography>
              {message}
            </Typography>
            <UserImage image={picture} size="2.3rem" />
          </Box>
        </Box>
      </Box>
    </MenuItem>
  );
};

export default NotificationItems;
