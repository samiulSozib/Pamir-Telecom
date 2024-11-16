import { Fragment, useEffect, useState } from "react";
import { Box, Card, Grid, IconButton, styled, useTheme } from "@mui/material";
import StatCards from "../dashboard/shared/StatCards";
import TopSellingTable from "../dashboard/shared/TopSellingTable";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {dashboardData} from '../../redux/actions/dashboardAction'
import { useDispatch, useSelector } from "react-redux";
import PaginationTable from "./shared/PaginationTable";
import { Breadcrumb, SimpleCard } from "app/components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";




// STYLED COMPONENTS
const ContentBox = styled("div")(({ theme }) => ({
  padding: "10px 10px 10px 10px",
  [theme.breakpoints.down("sm")]: { margin: "2px" }
}));



export default function SubReseller() {
  const { palette } = useTheme();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar" || i18n.language === "fa" || i18n.language === "ps";


  
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);  // Go back to the previous page
  };

  return (
    <Fragment>
      <ContentBox className="analytics">
      <Box className="breadcrumb" display="flex" alignItems="center">
        <IconButton onClick={handleBack} color="primary">
        {isRtl?<ArrowForward/>:<ArrowBack/>}  
        </IconButton>
        <Breadcrumb routeSegments={[ { name: t('SUB_RESELLER') }]} />
      </Box>
        <PaginationTable />
        {/* <SimpleForm/> */}
      </ContentBox>
      <ToastContainer/>
    </Fragment>
  );
}
