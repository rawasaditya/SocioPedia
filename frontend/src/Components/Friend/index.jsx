import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBoxBetween from "../FlexBoxBetween";
import UserImage from "../UserImage";
import { setFriends } from "../../state";
import API from "../../axiosConfig.js";
const Friend = ({
  friendId,
  name,
  subTitle,
  userPicturePath,
  loggedInUserId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const friends = useSelector((state) => state?.user?.friends);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const isFriend = friends?.find((friends) => friends._id === friendId);
  const patchFriend = async () => {
    if (user?._id) {
      API.patch(`user/${user?._id}/${friendId}`)
        .then((data) => {
          dispatch(setFriends({ friends: data.data.friends }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <FlexBoxBetween>
      <FlexBoxBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subTitle}
          </Typography>
        </Box>
      </FlexBoxBetween>
      {friendId !== loggedInUserId ? (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined
              sx={{
                color: primaryDark,
              }}
            />
          ) : (
            <PersonAddOutlined
              sx={{
                color: primaryDark,
              }}
            />
          )}
        </IconButton>
      ) : null}
    </FlexBoxBetween>
  );
};

export default Friend;
