import {
  ManageAccountsOutlined,
  EditOutlined,
  WorkOutlined,
} from "@mui/icons-material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../UserImage";
import FlexBoxBetween from "../FlexBoxBetween";
import WidgetWrapper from "../WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../axiosConfig.js";
const UserWidget = ({ userId }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const getUser = async () => {
    API.get(`/user/${userId}`).then((res) => {
      setUser(res.data);
    });
  };
  useEffect(() => {
    getUser();
  }, []);
  if (!user) return null;
  const { firstName, lastName, occupation, location, friends, picturePath } =
    user;
  return (
    <WidgetWrapper>
      <FlexBoxBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBoxBetween>
          <UserImage image={picturePath} size="10px" />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="5000"
              sx={{
                "&hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
          <ManageAccountsOutlined />
        </FlexBoxBetween>
        <Divider />
        <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlinedIcon fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <WorkOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{occupation}</Typography>
          </Box>
        </Box>
      </FlexBoxBetween>
    </WidgetWrapper>
  );
};

export default UserWidget;
