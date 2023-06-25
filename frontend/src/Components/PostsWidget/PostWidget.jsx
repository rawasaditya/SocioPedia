import { useState } from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBoxBetween from "../FlexBoxBetween";
import Friend from "../Friend";
import WidgetWrapper from "../WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";
import API from "../../axiosConfig.js";
import { assets } from "../../constUtils.js";
const PostWidget = ({
  _id,
  userId,
  likes,
  description,
  picturePath,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = likes.includes(loggedInUserId);
  const likeCount = Object.keys(likes).length;
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    //
    API.patch(`posts/${_id}/like`)
      .then((data) => {
        dispatch(setPost({ post: data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={userId?._id}
        name={`${userId.firstName} ${userId?.lastName}`}
        subTitle={userId.location}
        userPicturePath={userId.picturePath}
        loggedInUserId={loggedInUserId}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          src={`${assets}/${picturePath}`}
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
        />
      )}
      <FlexBoxBetween mt="0.25rem">
        <FlexBoxBetween
          gap="1rem"
          sx={{
            justifyContent: "end",
            width: "100%",
          }}
        >
          <FlexBoxBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined sx={{ color: primary }} />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBoxBetween>
          <FlexBoxBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments((prev) => !prev)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBoxBetween>
        </FlexBoxBetween>
      </FlexBoxBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment) => {
            <Box key={comment._id}>
              <Divider />
              <Typography
                sx={{
                  color: main,
                  m: "0.5rem 0",
                  pl: "1rem",
                }}
              >
                {comment}
              </Typography>
            </Box>;
          })}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
