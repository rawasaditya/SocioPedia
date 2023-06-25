import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";
import API from "../../axiosConfig.js";
const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const getPosts = async () => {
    const response = await API.get("posts");
    dispatch(setPosts({ posts: response.data }));
  };

  const getUserPosts = async () => {
    const response = await API.get(`posts/${userId}`);
    dispatch(setPosts({ posts: response.data }));
  };
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [userId]);
  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          likes,
          description,
          picturePath,
          pictureName,
          comments,
          createdAt,
          updatedAt,
        }) => {
          return (
            <PostWidget
              key={_id}
              _id={_id}
              userId={userId}
              likes={likes}
              description={description}
              picturePath={picturePath}
              pictureName={pictureName}
              comments={comments}
              createdAt={createdAt}
              updatedAt={updatedAt}
            />
          );
        }
      )}
    </>
  );
};

export default PostsWidget;
