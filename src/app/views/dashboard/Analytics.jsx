import { Fragment, useEffect, useState } from "react";
import { Box, Card, Grid, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import TopSellingTable from "./shared/TopSellingTable";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {dashboardData} from '../../redux/actions/dashboardAction'
import { useDispatch, useSelector } from "react-redux";
import DashboardCard from "./shared/DashboardCard";
import { Breadcrumb } from "app/components";
import { useTranslation } from "react-i18next";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import StatCards from "./shared/StatCards";
import StatCards3 from "./shared/StatCards3";
import Marquee from "react-fast-marquee";


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

const WhatsAppCard = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  color: "#25D366", // WhatsApp green color
  backgroundColor: theme.palette.background.paper,
  marginBottom: theme.spacing(2),
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const pulse = {
  "@keyframes pulse": {
    "0%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.1)" },
    "100%": { transform: "scale(1)" },
  },
};

const AnimatedWhatsAppIcon = styled(WhatsAppIcon)(({ theme }) => ({
  fontSize: "3rem",
  cursor: "pointer",
  animation: "pulse 1.5s infinite",
  ...pulse,
}));

export default function Analytics() {
  const { palette } = useTheme();
  const { t, i18n } = useTranslation();
  const {advertisement_sliders}=useSelector((state)=>state.dashboardReducer)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(dashboardData())
  },[dispatch])
  const isRtl = i18n.language === "ar" || i18n.language === "fa" || i18n.language === "ps";
  

  useEffect(()=>{
    console.log(advertisement_sliders)
  },[dispatch,advertisement_sliders])

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));


  return (
    <Fragment>
      <ContentBox className="analytics">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[ { name: t('DASHBOARD') }]} />
      </Box>
      <WhatsAppCard sx={{height:isSmallScreen?"60px":"80px"}}>
        <AnimatedWhatsAppIcon sx={{cursor:"pointer"}} fontSize="large" onClick={() => window.open("https://wa.me//+905347869800", "_blank")}/>
        <Marquee direction={isRtl ? "left" : "right"} speed={50} style={{color:"green",marginRight:"20px",marginLeft:"20px"}}>
        {advertisement_sliders.map((ad, index) => (
        <span key={ad.id} style={{ marginRight: "40px", fontWeight: "bold" }}>
          {ad.advertisement_title}
          {index < advertisement_sliders.length - 1 && " | "}
        </span>
      ))}
        </Marquee>
        <AnimatedWhatsAppIcon sx={{cursor:"pointer"}} fontSize="large" onClick={() => window.open("https://wa.me/+905347869800", "_blank")}/>
      </WhatsAppCard>
      <Grid container spacing={3}>
        <Grid 
          item 
          lg={8} 
          md={8} 
          sm={12} 
          xs={12} 
          sx={{ order: { sm: 3, xs: 3, md: 2, lg: 2 } }} // First Grid displayed second on sm screens
        >
          {/* <StatCards /> */}
          <DashboardCard />
        </Grid>

        <Grid 
          item 
          lg={4} 
          md={4} 
          sm={12} 
          xs={12} 
          dir={isRtl ? 'rtl' : 'ltr'} 
          sx={{ order: { sm: 2, xs: 2, md: 2, lg: 2 } }} // Second Grid displayed first on sm screens
        >
          <Card sx={{ px: 3,  }} dir={isRtl ? 'rtl' : 'ltr'}>
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {advertisement_sliders.map((slider, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={slider.ad_slider_image_url}
                    alt={`ad_slider_image-${index}`}
                    style={{ width: "100%", height: isSmallScreen?"150px":"280px", objectFit: "fill" }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Card>
        </Grid>
      </Grid>
      <TopSellingTable />
      </ContentBox>
    </Fragment>
  );
}
