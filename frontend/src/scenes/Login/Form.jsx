import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import DropZone from "react-dropzone";
import FlexBoxBetween from "../../Components/FlexBoxBetween";
import { setLogin } from "../../state";
import * as yup from "yup";
import { Formik } from "formik";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("register");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const handleFormSubmit = async (values, onSubmitProps) => {};
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="1rem"
              gridTemplateColumns="repeat(4,minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {isRegister && (
                <>
                  <TextField
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                    }
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    type="password"
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name="location"
                    error={
                      Boolean(touched.location) && Boolean(errors.location)
                    }
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: "span 4" }}
                  />

                  <TextField
                    label="Occupation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation}
                    name="occupation"
                    error={
                      Boolean(touched.occupation) && Boolean(errors.occupation)
                    }
                    helperText={touched.occupation && errors.occupation}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <Box
                    gridColumn="span 4"
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius="5px"
                    p="1rem"
                  >
                    <DropZone
                      accept={{
                        "image/*": [".png", ".gif", ".jpeg", ".jpg"],
                      }}
                      multiple={false}
                      onDrop={(acceptedFiles) => {
                        setFieldValue("picture", acceptedFiles[0]);
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
                          {!values.picture ? (
                            <Typography textAlign="center">
                              Add Picture HERE
                            </Typography>
                          ) : (
                            <FlexBoxBetween>
                              <Typography>{values.picture.name}</Typography>
                              <EditOutlinedIcon />
                            </FlexBoxBetween>
                          )}
                        </Box>
                      )}
                    </DropZone>
                  </Box>
                </>
              )}

              {isLogin && (
                <>
                  <TextField
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="email"
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                  />
                </>
              )}
            </Box>
            <Button
              type="submit"
              sx={{
                m: "2rem 0",
                p: "0.5rem",
                width: "100%",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "Login" : "Register"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
                width: "fit-content",
              }}
            >
              {isLogin
                ? "Don't have an account? Sign up here."
                : "Already have an account? Login in here"}
            </Typography>
          </form>
        );
      }}
    </Formik>
  );
};

export default Form;
