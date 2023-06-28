import { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { useTheme, IconButton, Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "./style.module.css";
import { giphy_APIKEY } from "../../utils.js";
export default function GifContainer({ setGifLink, gifLink }) {
  const { palette } = useTheme();
  const [searchValue, setSearchValue] = useState(null);
  const [gifs, setGifs] = useState([]);

  const searchGif = () => {
    if (searchValue) {
      fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${giphy_APIKEY}&q=${searchValue}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
      )
        .then((data) => {
          return data.json();
        })
        .then((res) => {
          console.log(res);
          setGifs(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Box>
      <Divider sx={{ my: "1rem" }} />
      <Box
        sx={{
          backgroundColor: palette.neutral.light,
        }}
        display="flex"
      >
        <InputBase
          sx={{
            flex: 1,
            backgroundColor: palette.neutral.light,
            padding: "10px",
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              searchGif();
            }
          }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search for gif"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={searchGif}
        >
          <SearchIcon />
        </IconButton>
      </Box>
      <ImageList sx={{ width: "100%", height: 450 }} cols={5} rowHeight={164}>
        {gifs?.map((item) => (
          <ImageListItem key={item.id}>
            <img
              onClick={() => setGifLink(item.images.original?.url)}
              className={`${styled.gifPreview} ${
                gifLink == item.images.original?.url ? styled.selected : ""
              }`}
              src={`${item.images.original?.url}`}
              srcSet={`${item.images.original?.url}`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
