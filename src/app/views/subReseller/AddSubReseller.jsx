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
import AddForm from "./shared/AddForm";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";




// STYLED COMPONENTS
const ContentBox = styled("div")(({ theme }) => ({
  margin: "10px",
  [theme.breakpoints.down("sm")]: { margin: "8px" }
}));



export default function AddSubReseller() {
  const { palette } = useTheme();
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);  // Go back to the previous page
  };
  


  return (
    <Fragment>
      <ContentBox className="analytics">
      <Box className="breadcrumb"  display="flex" alignItems="center">
        <IconButton onClick={handleBack} color="primary">
            <ArrowBack />
          </IconButton>
        <Breadcrumb routeSegments={[ { name: "Sub Reseller", path: "/sub-reseller/default" },{ name: t("ADD_NEW_SUBRESELLER") }]} />
      </Box>
      <SimpleCard>
        <AddForm/>
      </SimpleCard>
      </ContentBox>
      <ToastContainer/>
    </Fragment>
  );
}
