import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Box,
  useTheme,
  IconButton,
} from "@mui/material";
import { margin, styled, useMediaQuery } from "@mui/system";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { format } from 'date-fns';
import html2canvas from 'html2canvas';
import { useTranslation } from "react-i18next";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import jsPDF from 'jspdf';


// Styled components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.shape.borderRadius,
    width: "450px",
    maxWidth: "90%",
    fontFamily: 'Vazir, sans-serif',
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      maxWidth: "100%",
      height: "100%",
      borderRadius: 0,
      display: "flex",
      padding:"50px 5px 0px 5px"
    },
  },
}));

const HeaderIcon = styled(Box)(({ theme }) => ({
  fontSize: 60,
  marginBottom: theme.spacing(1),
  background: theme.palette.grey[200],
  borderRadius: '20%',
  padding: theme.spacing(1),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const Label = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
}));

const Value = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: 500,
}));

const Small = styled("small")(({ bgcolor }) => ({
  width: 'fit-content',
  color: "#fff",
  padding: "2px 8px",
  borderRadius: "4px",
  background: bgcolor,
  boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
}));

const StyledCardContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(3),
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize:"220px 220px"
}));

export default function InfoModal({ open, onClose, orderDetails, currency_preference_code }) {
  const [showBuyingPrice, setShowBuyingPrice] = useState(false);
  const [showSellingPrice, setShowSellingPrice] = useState(false);
  const imageRef = useRef(null);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar" || i18n.language === "fa" || i18n.language === "ps";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getStatusLabel = (status) => {
    switch (status) {
      case 0:
        return (
          <>
            <HeaderIcon>
              <HourglassEmptyIcon color="warning" />
            </HeaderIcon>
            <Small bgcolor="#f0ad4e">Pending</Small>
          </>
        );
      case 1:
        return (
          <>
            <HeaderIcon>
              <CheckCircleIcon color="success" />
            </HeaderIcon>
            <Small bgcolor="#5cb85c">CONFIRMED</Small>
          </>
        );
      case 2:
        return (
          <>
            <HeaderIcon>
              <ErrorOutlineIcon color="error" />
            </HeaderIcon>
            <Small bgcolor="#d9534f">REJECTED</Small>
          </>
        );
      default:
        return (
          <>
            <HeaderIcon>
              <ErrorOutlineIcon color="disabled" />
            </HeaderIcon>
            <Small bgcolor="#6c757d">{t('PENDING')}</Small>
          </>
        );
    }
  };

  const toggleBuyingPriceVisibility = () => {
    setShowBuyingPrice((prev) => !prev);
  };

  const toggleSellingPriceVisibility = () => {
    setShowSellingPrice((prev) => !prev);
  };


  const saveAsImage = () => {
    // Ensure the page or modal content has the correct RTL direction
    const canvasParent = imageRef.current;
    canvasParent.style.direction = "rtl"; // Force RTL direction for correct Arabic rendering
    
    html2canvas(canvasParent, {
      useCORS: true, // Enable CORS to load external resources
      allowTaint: true, // Allow tainting of external resources
      backgroundColor: null, // Keep the background transparent
      textRendering: "geometricPrecision", // Improve text rendering quality
      logging: true, // Enable logging for debugging issues
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      
      // Debugging: To inspect the canvas content in the console
      //console.log(canvas);
  
      // Create a link to download the image
      const link = document.createElement("a");
      link.href = imgData;
      link.download =  `${orderDetails.rechargeble_account}.png`; // Filename for the image
      link.click(); // Trigger download
    });
  };
  
  
  
  
  const shareImage = async () => {
    if (navigator.share) {
      try {
        const canvas = await html2canvas(imageRef.current, {
          useCORS: true,
          allowTaint: true,
          backgroundColor: "white",
        });
  
        const imgData = canvas.toDataURL("image/png");
  
        // Convert the data URL to a Blob
        const response = await fetch(imgData);
        const blob = await response.blob();
  
        const file = new File([blob], "order-details.png", { type: "image/png" });
  
        await navigator.share({
          title: t('ORDER_DETAILS'),
          text: t('CHECK_OUT_THIS_ORDER_DETAILS'),
          files: [file],
        });
      } catch (error) {
        //console.error("Error sharing image:", error);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };
  
  
  



  return (
    <StyledDialog open={open} onClose={onClose} fullScreen={isMobile} dir={isRtl?'rtl':'ltr'}>
      {isMobile && (
          <Box position="absolute" top={8} left={8}>
            <IconButton onClick={onClose} color="primary">
              {isRtl?<ArrowForward/>:<ArrowBack />}
            </IconButton>
          </Box>
        )}
      <Box ref={imageRef}>
        <Box sx={{ border: '2px solid black', borderRadius: 2, m:1 }}>
        
          <DialogTitle>
            <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
              {orderDetails ? getStatusLabel(orderDetails.status) : "Info"}
              {orderDetails && orderDetails.status === 2 && (
                <Typography variant="body2" color="textSecondary" gutterBottom sx={{ mt: 2 }}>
                    {orderDetails.reject_reason}
                </Typography>
              )}
            </Box>
            <Divider sx={{ mt: 2, mb: 0, borderStyle: 'dashed', borderWidth: 1 }} />
          </DialogTitle>

          <DialogContent>
            <StyledCardContent 
              variant="outlined" 
              sx={{ 
                backgroundSize: "150px 150px",
                borderRadius: 2, 
                width: '100%',
                backgroundImage: `url('/assets/images/telecom/pamir_telecom.jpeg')`,
                paddingLeft: isRtl ? 3 : 1, 
                paddingRight: isRtl ? 1 : 3 
              }}
            >
              <Box textAlign="left">
                {orderDetails && (
                  <>
                    
                    <Box display="flex" justifyContent="space-between" my={1}>
                      <Label sx={{ color: "black" }}>{t('PHONE_NUMBER')}</Label>
                      <Value>{orderDetails.rechargeble_account || "N/A"}</Value>
                    </Box>
                    
                    {showSellingPrice && (
                      <Box display="flex" justifyContent="space-between" my={1}>
                        <Label sx={{ color: "black" }}>{t('SELLING_PRICE')}</Label>
                        <Value>{currency_preference_code} {orderDetails.bundle.selling_price}</Value>
                      </Box>
                    )}
                    {showBuyingPrice && (
                      <Box display="flex" justifyContent="space-between" my={1}>
                        <Label sx={{ color: "black" }}>{t('BUYING_PRICE')}</Label>
                        <Value>{currency_preference_code} {orderDetails.bundle.buying_price}</Value>
                      </Box>
                    )}
                    <Box display="flex" justifyContent="space-between" my={1}>
                      <Label sx={{ color: "black" }}>{t('ORDER_ID')}</Label>
                      <Value>{orderDetails.id || "N/A"}</Value>
                    </Box>
                  </>
                )}
              </Box>

              <Box mt={2} display="flex" justifyContent="space-between">
                <Box>
                  <Label sx={{ color: "black" }}>{t('DATE')}</Label>
                  <Typography variant="body2" color="textSecondary" sx={{ color: "black" }}>
                    {orderDetails ? format(new Date(orderDetails.created_at), 'dd-MM-yyyy') : "N/A"}
                  </Typography>
                </Box>
                
              </Box>
              <Divider sx={{ my: 2, borderStyle: 'dashed', borderWidth: 1 }} />
            </StyledCardContent>
          </DialogContent>
        </Box>
      </Box>

      <DialogActions sx={{ width: "100%", padding: isRtl ? '16px 16px 24px 24px' : '24px 24px 16px 16px' }}>
        <Box display="flex" flexDirection="column" sx={{ width: '100%' }}>
          <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
            <Button onClick={toggleBuyingPriceVisibility} sx={{ display: 'flex', alignItems: 'center', color: "black" }}>
              {t('BUYING_PRICE')} {showBuyingPrice ? <VisibilityIcon sx={{ ml: 1 }} /> : <VisibilityOffIcon sx={{ ml: 1 }} />}
            </Button>
            <Button onClick={toggleSellingPriceVisibility} sx={{ display: 'flex', alignItems: 'center', color: "black" }}>
              {t('PRICE')} {showSellingPrice ? <VisibilityIcon sx={{ ml: 1 }} /> : <VisibilityOffIcon sx={{ ml: 1 }} />}
            </Button>
          </Box>

          <Box display="flex" flexDirection="row" justifyContent="space-between" sx={{ width: '100%' }}>
            <Button sx={{fontSize: {xs: "0.75rem", xm:"0.875rem", md: "1rem"   }}} variant="contained" onClick={shareImage}>
              {t('SHARE')}
            </Button>
          <Button sx={{fontSize: {xs: "0.75rem", xm:"0.875rem", md: "1rem"   }}} variant="contained"  onClick={saveAsImage}>
          {t('SAVED_IMAGE_TO_GALLERY')}
          </Button>
          <Button sx={{fontSize: {xs: "0.75rem", xm:"0.875rem", md: "1rem"   }}} variant="contained" color="secondary" onClick={onClose}>
          {t('CLOSE')}
          </Button>
        </Box>
        </Box>
      </DialogActions>
    </StyledDialog>
  );
}
