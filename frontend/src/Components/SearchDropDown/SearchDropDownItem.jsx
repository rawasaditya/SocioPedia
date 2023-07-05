import { MenuItem, Box, Typography, useTheme } from "@mui/material";

import UserImage from "../UserImage";
import { useNavigate } from "react-router-dom";

const SearchDropDownItem = ({ name, picture, _id }) => {
  const navigate = useNavigate();

  const { palette } = useTheme();
  const main = palette.neutral.main;
  return (
    <MenuItem
      className="searchDropDown"
      onClick={() => navigate(`/profile/${_id}`)}
    >
      <Box display="flex" flexDirection="column" sx={{ width: "100%" }}>
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body2" color={main}>
              <Typography variant="body1">{name}</Typography>
            </Typography>
            <UserImage image={picture} size="2.3rem" />
          </Box>
        </Box>
      </Box>
    </MenuItem>
  );
};

export default SearchDropDownItem;
