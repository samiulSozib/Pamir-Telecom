import { Fragment} from "react";
import { Box, IconButton, styled } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import PaginationTable from "./shared/PaginationTable";
import { Breadcrumb, SimpleCard } from "app/components";
import { useTranslation } from "react-i18next";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";




// STYLED COMPONENTS
const ContentBox = styled("div")(({ theme }) => ({
  padding: "1px 10px 10px 10px",
  [theme.breakpoints.down("sm")]: { margin: "2px" }
}));





export default function Order() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
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
        <Breadcrumb routeSegments={[ { name: t('ORDERS') }]} />
      </Box>
        <PaginationTable/>
      </ContentBox>
    </Fragment>
  );
}
