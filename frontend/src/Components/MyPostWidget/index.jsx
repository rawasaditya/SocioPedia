import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  MicOutlined,
  MoreHorizOutlined,
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
  useMediaQuery,
} from "@mui/material";
import FlexBoxBetween from "../FlexBoxBetween";
import DropZone from "react-dropzone";
import WidgetWrapper from "../WidgetWrapper";
import UserImage from "../UserImage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import API from "../../axiosConfig.js";
const MuPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(true);
  const [image, setImage] = useState(null);
  const [post, setPosts] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state?.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    const response = await API.post("posts/post", formData);
    // setIsImage(false);
    // setImage(null);
    // setPosts(null);
  };

  return (
    <WidgetWrapper>
      <FlexBoxBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind"
          onChange={(e) => setPosts(e.target.value)}
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
      <Divider sx={{ margin: "1.25rem 0" }} />
      <FlexBoxBetween>
        <FlexBoxBetween
          gap="0.25rem"
          onClick={() => {
            setIsImage(!isImage);
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
        <FlexBoxBetween gap="0.25rem">
          <GifBoxOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Clip
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
