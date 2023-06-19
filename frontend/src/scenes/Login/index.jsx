import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
const Login = () => {
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem,1.5rem,3rem)"
          color="primary"
        >
          SocioPedia
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreen ? "50%" : "100%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to SocioPedia, the Social Media for Sociopaths
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default Login;
