import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import Notification from "./Notification";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexBoxBetween from "../FlexBoxBetween";
import SearchDropDown from "../SearchDropDown";
const NavBar = () => {
  const [isMobileMenuToggled, setIisMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const [SearchInput, setSearchInput] = useState(false);
  const fullName = `${user?.firstName ? user?.firstName : ""} ${user?.lastName ? user?.lastName : ""
    }`;
  return (
    <FlexBoxBetween padding="1rem 6%" backgroundColor={alt}>
      <Typography
        fontWeight="bold"
        fontSize="clamp(1rem,2rem,2.25rem)"
        color="primary"
        onClick={() => navigate("/home")}
        sx={{
          "&:hover": {
            color: primaryLight,
            cursor: "pointer",
          },
        }}
      >
        SocioPedia
      </Typography>
      {isNonMobileScreens && (
        <FlexBoxBetween
          backgroundColor={neutralLight}
          borderRadius={"0.5rem"}
          gap="3rem"
          padding="0.1rem 1.5rem"
        >
          <InputBase placeholder="Search" onChange={(e) => console.log(e.target.value)} />
          <IconButton>
            <Search />
          </IconButton>
          <FlexBoxBetween
            backgroundColor={neutralLight}
            borderRadius={"0.5rem"}
            gap="3rem"
            padding="0.1rem 1.5rem"
            position='absolute'
            top='70px'
            maxWidth='230px'
            width='100%'
          >
            <SearchDropDown value={SearchInput} />
          </FlexBoxBetween>
        </FlexBoxBetween>
      )}
      {/* Desktop */}
      {isNonMobileScreens ? (
        <FlexBoxBetween gap="1rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "1.5rem" }} />
            ) : (
              <LightMode sx={{ fontSize: "1.5rem", color: dark }} />
            )}
          </IconButton>
          <IconButton>
            <Message sx={{ fontSize: "1.5rem" }} />
          </IconButton>
          <Notification />
          <IconButton>
            <Help sx={{ fontSize: "1.5rem" }} />
          </IconButton>
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "10rem",
                p: "0.25rem 1rem",
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>
                <Typography>Logout</Typography>
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBoxBetween>
      ) : (
        <IconButton
          onClick={() => setIisMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIisMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>
          {/* MENU ITEMS */}
          <FlexBoxBetween
            display="flex"
            flexDirection="column"
            gap="2rem"
            alignItems="center"
          >
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "1.5rem" }} />
              ) : (
                <LightMode sx={{ fontSize: "1.5rem", color: dark }} />
              )}
            </IconButton>
            <IconButton>
              <Message sx={{ fontSize: "1.5rem" }} />
            </IconButton>
            <Notification />
            <IconButton>
              <Help sx={{ fontSize: "1.5rem" }} />
            </IconButton>
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "10rem",
                  p: "0.25rem 1rem",
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  <Typography>Logout</Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBoxBetween>
        </Box>
      )}
    </FlexBoxBetween>
  );
};

export default NavBar;
