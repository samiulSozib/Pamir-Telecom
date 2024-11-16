import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Card, Grid, TextField, Box, styled, useTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../redux/actions/authAction';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// STYLED COMPONENTS
const ContentBox = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  padding: "32px",
  backgroundColor: "#f5f5f5",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
}));

const StyledRoot = styled("div")(() => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#1A2038",
  padding: "2rem",
}));

const StyledCard = styled(Card)(() => ({
  maxWidth: 900,
  minHeight: 450,
  display: "flex",
  flexDirection: "row",
  borderRadius: 12,
  overflow: "hidden",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)"
}));

const initialValues = {
  email: "",
  password: "",
  remember: true
};

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 characters long")
    .required("Password is required!")
});

export default function JwtLogin() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await dispatch(signIn({ username: values.email, password: values.password }));
      navigate("/packages/default");
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/packages/default');
    }
  }, [isAuthenticated, navigate]);

  return (
    <StyledRoot>
      <StyledCard>
        <Grid container>
          <Grid item sm={6} xs={12} style={{ backgroundColor: "#f0f0f0" }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
              width="100%"
            >
              <img src="/assets/images/telecom/pamir_telecom.jpeg" alt="Logo" style={{ maxWidth: "80%", height: "auto" }} />
            </Box>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ContentBox>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      name="email"
                      label={t('USERNAME')}
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label={t('PASSWORD')}
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 2 }}
                    />

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      fullWidth
                      sx={{ mb: 2 }}
                    >
                      {t('LOGIN')}
                    </LoadingButton>
                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </StyledCard>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </StyledRoot>
  );
}
