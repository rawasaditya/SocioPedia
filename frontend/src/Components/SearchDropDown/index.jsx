import { Paper, Box } from "@mui/material";
import { useEffect, useState } from "react";
import SearchDropDownItem from "./SearchDropDownItem";
import API from "../../axiosConfig.js";
function SearchDropDown({ value }) {
  const [results, setResults] = useState([]);
  useEffect(() => {
    if (value?.length) {
      API.post("user/search", { searchText: value }).then((res) => {
        setResults(res.data);
      });
    } else {
      setResults([]);
    }
  }, [value]);
  return (
    <Paper
      sx={{
        zIndex: 1,
      }}
    >
      {results.map((i) => (
        <Box
          sx={{ width: "30rem", maxWidth: "100%", padding: "0.2rem 0" }}
          key={i._id}
        >
          <SearchDropDownItem
            name={`${i.firstName} ${i.lastName}`}
            picture={i.picturePath}
            _id={i._id}
          />
        </Box>
      ))}
    </Paper>
  );
}
export default SearchDropDown;
