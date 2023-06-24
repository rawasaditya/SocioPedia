import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FriendListWidget from "../../Components/FriendListWidget";
import MyPostWidget from "../../Components/MyPostWidget";
import PostsWidget from "../../Components/PostsWidget";
import UserWidget from "../../Components/UserWidget";
import API from "../../axiosConfig.js";
const Profile = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const getUser = async () => {
    API.get(`user/${userId}`)
      .then((data) => {
        setUser(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUser();
  }, []);
  if (!user) return null;
  return (
    <Box
      width="100%"
      padding="2rem 6%"
      display={isNonMobileScreens ? "flex" : "block"}
      gap="2rem"
      justifyContent="center"
    >
      <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
        <UserWidget user={user} />
        <Box m="2rem 0">
          <FriendListWidget userId={userId} />
        </Box>
      </Box>
      <Box
        flexBasis={isNonMobileScreens ? "42%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
      >
        <MyPostWidget picturePath={user.picturePath} />
        <PostsWidget userId={userId} />
      </Box>
    </Box>
  );
};

export default Profile;
