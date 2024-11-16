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
import { useTranslation } from "react-i18next";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";




// STYLED COMPONENTS
const ContentBox = styled("div")(({ theme }) => ({
  padding: "10px 10px 10px 10px",
  [theme.breakpoints.down("sm")]: { margin: "8px" }
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: "50%",
  padding: theme.spacing(1),
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
    transform: "scale(1.1)",
  },
  "&:active": {
    transform: "scale(0.95)",
    boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.2)",
  },
}));



export default function Transaction() {
  const { palette } = useTheme();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();  // Use navigate hook here
  const isRtl = i18n.language === "ar" || i18n.language === "fa" || i18n.language === "ps";



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
        <Breadcrumb routeSegments={[ { name: t('TRANSACTIONS') }]} />
      </Box>
        <PaginationTable />
      </ContentBox>
    </Fragment>
  );
}
