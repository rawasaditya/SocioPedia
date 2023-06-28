import {
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
} from "@mui/icons-material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import FlexBoxBetween from "../FlexBoxBetween";
import DropZone from "react-dropzone";
import WidgetWrapper from "../WidgetWrapper";
import UserImage from "../UserImage";
import GifContainer from "./GifContainer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import API from "../../axiosConfig.js";
const MuPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [isGif, setIsGif] = useState(true);
  const [gifLink, setGifLink] = useState("");
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const user = useSelector((state) => state?.user);
  const posts = useSelector((state) => state?.posts);
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", user?._id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    if (gifLink) {
      formData.append("gifPath", gifLink);
    }
    API.post("posts/post", formData)
      .then((res) => {
        console.log(res);
        dispatch(setPosts({ posts: [res.data, ...posts] }));
        setIsImage(false);
        setIsGif(false);
        setImage(null);
        setPost("");
        setGifLink(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <WidgetWrapper>
      <FlexBoxBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind"
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBoxBetween>
      {isImage && (
        <Box
          borderRadius="5px"
          border={`1px solid ${medium}`}
          mt="1rem"
          p="1rem"
        >
          <DropZone
            accept={{
              "image/*": [".png", ".gif", ".jpeg", ".jpg"],
            }}
            multiple={false}
            onDrop={(acceptedFiles) => {
              setImage(acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <Box
                {...getRootProps()}
                border={`1px dashed ${palette.primary.main}`}
                p="1rem"
                sx={{
                  "&:hover": { cursor: "pointer" },
                }}
              >
                <input {...getInputProps()} />
                {!image ? (
                  <Typography textAlign="center">Add Picture Here</Typography>
                ) : (
                  <FlexBoxBetween>
                    <Typography>{image.name}</Typography>
                    {image && (
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setImage(null);
                        }}
                        p="1rem"
                      >
                        <DeleteOutlined />
                      </IconButton>
                    )}
                  </FlexBoxBetween>
                )}
              </Box>
            )}
          </DropZone>
        </Box>
      )}
      {isGif && (
        <Box mt="1rem" p="1rem">
          <GifContainer setGifLink={setGifLink} gifLink={gifLink} />
        </Box>
      )}
      <Divider sx={{ margin: "1.25rem 0" }} />
      <FlexBoxBetween>
        <FlexBoxBetween
          gap="0.25rem"
          onClick={() => {
            setIsImage(!isImage);
            setIsGif(false);
            setImage(null);
            setGifLink("");
          }}
        >
          <ImageOutlinedIcon sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBoxBetween>
        <FlexBoxBetween
          gap="0.25rem"
          onClick={() => {
            setIsImage(false);
            setIsGif(!isGif);
            setImage(null);
            setGifLink("");
          }}
        >
          <GifBoxOutlined
            sx={{
              color: mediumMain,
              "&:hover": { cursor: "pointer", color: medium },
            }}
          />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Gif
          </Typography>
        </FlexBoxBetween>
        <FlexBoxBetween gap="0.25rem">
          <AttachFileOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Attachment
          </Typography>
        </FlexBoxBetween>
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          Post
        </Button>
      </FlexBoxBetween>
    </WidgetWrapper>
  );
};

export default MuPostWidget;
