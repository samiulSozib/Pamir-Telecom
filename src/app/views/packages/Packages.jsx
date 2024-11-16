import { Fragment, useEffect, useState } from "react";
import { Box, Card, Grid, styled, useTheme } from "@mui/material";
import StatCards from "./shared/StatCards";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Breadcrumb } from "app/components";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";




// STYLED COMPONENTS
const ContentBox = styled("div")(({ theme }) => ({
  padding: "10px 10px 10px 10px",
  [theme.breakpoints.down("sm")]: { margin: "8px" }
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginRight: ".5rem",
  textTransform: "capitalize"
}));

const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary
}));

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "16px",
  textTransform: "capitalize",
  color: theme.palette.text.secondary
}));

export default function Analytics() {
  const { palette } = useTheme();
  const { t, i18n } = useTranslation();

  


  return (
    <Fragment>
      <ContentBox className="analytics">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[ { name: t('PRODUCT_PACKAGE') }]} />
      </Box>
          <Grid item lg={12} md={8} sm={12} xs={12} sx={{marginTop:"-25px"}}>
            <StatCards />
          </Grid>
      </ContentBox>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

    </Fragment>
  );
}
