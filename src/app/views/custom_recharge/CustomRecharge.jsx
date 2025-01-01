import { Fragment, useEffect, useState } from "react";
import { Box, Card, Grid, styled, useTheme, IconButton } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import StatCards from "../dashboard/shared/StatCards";
import TopSellingTable from "../dashboard/shared/TopSellingTable";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { dashboardData } from '../../redux/actions/dashboardAction';
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, SimpleCard } from "app/components";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowForward } from "@mui/icons-material";
import Recharge from "./shared/Recharge";

// STYLED COMPONENTS
const ContentBox = styled("div")(({ theme }) => ({
  padding: "10px 10px 10px 10px",
  [theme.breakpoints.down("sm")]: { margin: "8px" }
}));

export default function CustomRecharge() {
  const { palette } = useTheme();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();  // Use navigate hook here
  const isRtl = i18n.language === "ar" || i18n.language === "fa" || i18n.language === "ps";


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');

  const handleBack = () => {
    navigate(-1);  // Go back to the previous page
  };

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Box className="breadcrumb" display="flex" alignItems="center" sx={{marginTop:"-15px"}}>
          {/* Back Arrow Button */}
          <IconButton onClick={handleBack} color="primary">
          {isRtl?<ArrowForward/>:<ArrowBack/>}
          </IconButton>

          {/* Breadcrumb */}
          <Breadcrumb routeSegments={[{ name: t('CUSTOM_RECHARGE'), path: "/packages/default" }, { name: t('RECHARGE') }]} />
        </Box>
        
        <Recharge />
      </ContentBox>
    </Fragment>
  );
}
