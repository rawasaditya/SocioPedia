import { ManageAccountsOutlined, WorkOutlined } from "@mui/icons-material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Box, Typography, Divider, useTheme, Link } from "@mui/material";
import UserImage from "../UserImage";
import FlexBoxBetween from "../FlexBoxBetween";
import WidgetWrapper from "../WidgetWrapper";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const UserWidget = ({ user }) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const loggedInUser = useSelector((state) => state.user);
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
    _id,
  } = user;
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
            {loggedInUser?._id === user?._id ? (
              <ManageAccountsOutlined
                onClick={() => navigate(`/profile/${_id}`)}
              />
            ) : (
              <></>
            )}
          </Box>
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
