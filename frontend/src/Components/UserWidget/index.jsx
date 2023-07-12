import {
  ManageAccountsOutlined,
  WorkOutlined,
  PersonAddOutlined,
  PersonRemoveOutlined,
} from "@mui/icons-material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import {
  Box,
  Typography,
  Divider,
  useTheme,
  Link,
  IconButton,
} from "@mui/material";
import UserImage from "../UserImage";
import FlexBoxBetween from "../FlexBoxBetween";
import WidgetWrapper from "../WidgetWrapper";
import { useSelector } from "react-redux";
import API from "../../axiosConfig.js";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ user, selfProfile, getUser }) => {
  const friendsList = useSelector((state) => state?.user?.friends);
  const loggedIn = useSelector((state) => state?.user);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const primaryLight = palette.primary.light;

  const {
    firstName,
    lastName,
    occupation,
    location,
    friends,
    picturePath,
    linkedIn,
    twitter,
    instagram,
    // _id,
  } = user;

  const patchFriend = async () => {
    if (user?._id) {
      API.patch(`user/${loggedIn?._id}/${user._id}`)
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <WidgetWrapper>
      <FlexBoxBetween gap="0.5rem" flexDirection="column">
        <Box display="flex" alignItems="center" gap="0.8rem" width="100%">
          <UserImage image={picturePath} size="50px" />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Box>
              <Typography
                variant="h4"
                color={dark}
                fontWeight="5000"
                onClick={() => navigate(`/profile/${user?._id}`)}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                {firstName} {lastName}
              </Typography>
              <Typography color={medium}>{friends.length} friends</Typography>
            </Box>
          </Box>
          {selfProfile ? (
            <></>
          ) : friendsList.map((i) => i._id)?.includes(user?._id) ? (
            <IconButton
              onClick={() => patchFriend()}
              sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
            >
              <PersonRemoveOutlined
                sx={{
                  color: primaryDark,
                }}
              />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => patchFriend()}
              sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
            >
              <PersonAddOutlined
                sx={{
                  color: primaryDark,
                }}
              />
            </IconButton>
          )}
        </Box>
        <Divider width="100%" />
        <Box p="1rem 0" width="100%">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlinedIcon fontSize="medium" sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <WorkOutlined fontSize="medium" sx={{ color: main }} />
            <Typography color={medium}>{occupation}</Typography>
          </Box>
        </Box>
        {linkedIn || twitter || instagram ? (
          <>
            <Divider width="100%" />
            <Box p="1rem 0" width="100%">
              {twitter && (
                <Link
                  href={twitter}
                  display="flex"
                  alignItems="center"
                  gap="1rem"
                  mb="0.5rem"
                >
                  <TwitterIcon fontSize="medium" sx={{ color: main }} />
                  <Typography color={medium}>Twitter</Typography>
                </Link>
              )}
              {linkedIn && (
                <Link
                  href={linkedIn}
                  display="flex"
                  alignItems="center"
                  gap="1rem"
                  mb="0.5rem"
                >
                  <LinkedInIcon fontSize="medium" sx={{ color: main }} />
                  <Typography color={medium}>LinkedIn</Typography>
                </Link>
              )}
              {instagram && (
                <Link
                  href={instagram}
                  display="flex"
                  alignItems="center"
                  gap="1rem"
                  mb="0.5rem"
                >
                  <InstagramIcon fontSize="medium" sx={{ color: main }} />
                  <Typography color={medium}>Instagram</Typography>
                </Link>
              )}
            </Box>
          </>
        ) : null}
      </FlexBoxBetween>
    </WidgetWrapper>
  );
};

export default UserWidget;
