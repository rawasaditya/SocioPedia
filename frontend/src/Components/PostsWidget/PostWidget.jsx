import { useEffect, useState } from "react";
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
import { InputBase, Button } from "@mui/material";
import axios from "axios";
const PostWidget = ({
  _id,
  userId,
  likes,
  description,
  picturePath,
  comments,
  gifPath,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = likes.includes(loggedInUserId);
  const likeCount = Object.keys(likes).length;
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const [commentInput, setComment] = useState("");
  const [localComments, setArray] = useState([]);

  useEffect(() => {
    if (comments != null) {
      setIsComments(true);
    }
  }, [""]);

  const postComment = async () => {
    setArray([
      ...localComments,
      {
        id: localComments.length,
        name: commentInput,
      },
    ]);

    var body = {
      postId: _id,
      description: commentInput,
    };

    API.post("comments/postcomment", body)
      .then(async (res) => {
        setComment("");
      })
      .catch((err) => {
        console.log(err);
      });

    setAddComment(true);
  };

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

      {gifPath && (
        <img
          width="100%"
          height="auto"
          src={gifPath}
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
        />
      )}
      <FlexBoxBetween mb="0.25rem">
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
            <Typography>{comments.length + localComments.length}</Typography>
          </FlexBoxBetween>
        </FlexBoxBetween>
      </FlexBoxBetween>

      {!isComments && (
        <>
          <FlexBoxBetween
            sx={{
              alignItems: "stretch",
              mb: "1rem",
            }}
          >
            <InputBase
              placeholder="Add a Comment"
              className="comment"
              onChange={(e) => setComment(e.target.value)}
              onKeyPress={(e) => {
                console.log(e.which === 13 ? postComment() : null);
              }}
              value={commentInput}
              sx={{
                width: "100%",
                backgroundColor: palette.neutral.light,
                padding: "0.5rem 1rem",
              }}
            />
            <Button
              onClick={() => {
                postComment();
              }}
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                paddingInline: "1rem",
                paddingTop: "0.5rem 1rem",
              }}
            >
              Comment
            </Button>
          </FlexBoxBetween>

          <Box mt="0.5rem">
            <Divider />
            {comments.map((comment) => {
              return (
                <Box key={comment._id}>
                  <Typography
                    sx={{
                      color: main,
                      m: "0.5rem 0",
                      pl: "1rem",
                    }}
                  >
                    {comment.description}
                  </Typography>
                  <Divider />
                </Box>
              );
            })}
          </Box>
          {addComment && (
            <>
              {!isComments && <Divider />}
              <Box mt="0.5rem">
                {localComments.map((localComment, idx) => {
                  return (
                    <Box key={idx}>
                      <Typography
                        sx={{
                          color: main,
                          m: "0.5rem 0",
                          pl: "1rem",
                        }}
                      >
                        {localComment.name}
                      </Typography>
                      <Divider />
                    </Box>
                  );
                })}
              </Box>
            </>
          )}
        </>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
