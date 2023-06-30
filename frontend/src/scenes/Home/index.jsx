import { useState, useEffect } from "react";
import UserWidget from "../../Components/UserWidget";
import MyPostWidget from "../../Components/MyPostWidget";
import { Box, useMediaQuery } from "@mui/material";
import PostsWidget from "../../Components/PostsWidget";
import API from "../../axiosConfig.js";
import FriendListWidget from "../../Components/FriendListWidget";
const Home = () => {
  const [user, setUser] = useState(null);

  let userDetails = JSON.parse(localStorage.getItem("user"));
  userDetails = userDetails.user;
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const getUser = async () => {
    API.get(`/user/${userDetails._id}`).then((res) => {
      setUser(res.data);
    });
  };
  useEffect(() => {
    getUser();
  }, []);
  if (!user) return null;
  const { picturePath } = user;
  return (
    <Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget user={user} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <FriendListWidget userId={user?._id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
