import React, { useRef } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { styled, useMediaQuery } from "@mui/system";
import { format } from "date-fns";
import html2canvas from "html2canvas";
import { useTranslation } from "react-i18next";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Small } from "app/components/Typography";

// Styled components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.shape.borderRadius,
    width: "400px",
    maxWidth: "90%",
    fontFamily: "iranyekan, sans-serif",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      maxWidth: "100%",
      height: "100%",
      borderRadius: 0,
      margin: 0,
    },
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
}));

const Logo = styled("img")(({ theme }) => ({
  height: "50px",
  width: "auto",
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 700,
  textAlign: "center",
  marginBottom: theme.spacing(1),
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  textAlign: "center",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
}));

const StatusText = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: 500,
  textAlign: "center",
  color: "#d9534f", // Red color for error
  marginBottom: theme.spacing(2),
}));

const StyledTable = styled(Table)(({ theme }) => ({
  "& .MuiTableCell-root": {
    padding: "8px 16px",
    borderBottom: "1px dashed rgba(0, 0, 0, 0.2)",
  },
  "& .MuiTableRow-root:last-of-type .MuiTableCell-root": {
    borderBottom: "none",
  },
}));

const FooterText = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  textAlign: "center",
  margin: theme.spacing(2, 0),
}));

const ServiceNumber = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: 700,
  textAlign: "center",
  margin: theme.spacing(1, 0),
}));

const ActionButton = styled(Button)(({ theme }) => ({
  flex: 1,
  margin: theme.spacing(0, 1),
  textTransform: "none",
}));

const StatusButton = styled(Button)(({ theme }) => ({
  flex: 1,
  margin: theme.spacing(0, 1),
  textTransform: "none",
  fontWeight: "900",
}));

export default function InfoModal1({
  open,
  onClose,
  orderDetails,
  currency_preference_code,
  user_info
}) {
  const imageRef = useRef(null);
  const { t, i18n } = useTranslation();
  const isRtl =
    i18n.language === "ar" || i18n.language === "fa" || i18n.language === "ps";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getStatusLabel = (status) => {
    switch (status) {
      case 0:
        return (
          <>
            <Small color="#f0ad4e" fontWeight="900">
              {t('PENDING')}
            </Small>
          </>
        );
      case 1:
        return (
          <>
            <Small color="#5cb85c" fontWeight="900">
              {t('CONFIRMED')}
            </Small>
          </>
        );
      case 2:
        return (
          <>
            <Small color="#d9534f" fontWeight="900">
              {t('REJECTED')}
            </Small>
          </>
        );
      default:
        return (
          <>
            <Small bgcolor="#6c757d">{t("PENDING")}</Small>
          </>
        );
    }
  };

  const saveAsImage = () => {
    html2canvas(imageRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `${orderDetails.rechargeble_account}.png`;
      link.click();
    });
  };

  const shareImage = async () => {
    if (navigator.share) {
      try {
        const canvas = await html2canvas(imageRef.current);
        const imgData = canvas.toDataURL("image/png");
        const response = await fetch(imgData);
        const blob = await response.blob();
        const file = new File([blob], "order-details.png", {
          type: "image/png",
        });

        await navigator.share({
          title: t("ORDER_DETAILS"),
          text: t("CHECK_OUT_THIS_ORDER_DETAILS"),
          files: [file],
        });
      } catch (error) {
        console.error("Error sharing image:", error);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {isMobile && (
        <Box position="absolute" top={8} left={8}>
          <IconButton onClick={onClose} color="primary">
            {isRtl ? <ArrowForward /> : <ArrowBack />}
          </IconButton>
        </Box>
      )}

      <Box  sx={{ p: isMobile ? 0 : 2 }}>
        <Box ref={imageRef}>
        <DialogTitle sx={{ textAlign: "center", p: 2 }}>
          {/* Added Logo Container */}
          <LogoContainer>
            <Logo
              src="/assets/images/telecom/pamir_telecom.jpeg"
              alt="Pamir Net Logo"
            />
          </LogoContainer>

          <Title>Pamir Net</Title>
          <Subtitle>
            {orderDetails
              ? format(
                  new Date(orderDetails.created_at),
                  "yyyy-MM-dd hh:mm:ss a"
                )
              : "N/A"}
          </Subtitle>
          <Box display="flex" justifyContent="space-between" width="100%">
            <StatusButton variant="" onClick={shareImage} sx={{color:'green'}}>
              {t('ORDER_STATUS')}
            </StatusButton>
            <StatusButton variant="" onClick={saveAsImage}>
              {orderDetails ? getStatusLabel(orderDetails.status) : "Info"}
            </StatusButton>
          </Box>
          {orderDetails && orderDetails.status === 2 && (
            <StatusText>{orderDetails.reject_reason}</StatusText>
          )}

          <Divider />
        </DialogTitle>

        <DialogContent sx={{ p: 2 }}>
          <StyledTable>
            {orderDetails && (
              <TableBody>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "start" }}
                  >
                    {t("BUNDLE_TYPE")}
                  </TableCell>
                  <TableCell sx={{ textAlign: "end" }}>
                    {orderDetails.bundle.bundle_title}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "start" }}
                  >
                    {t("PHONE_NUMBER")}
                  </TableCell>
                  <TableCell sx={{ textAlign: "end" }}>
                    {orderDetails.rechargeble_account || "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "start" }}
                  >
                    {t("VALIDITY_TYPE")}
                  </TableCell>
                  <TableCell sx={{ textAlign: "end" }}>
                    {t(`${orderDetails.bundle.validity_type.toUpperCase()}`)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "start" }}
                  >
                    {t("SELLING_PRICE")}
                  </TableCell>
                  <TableCell sx={{ textAlign: "end" }}>
                    {currency_preference_code}{" "}
                    {orderDetails.bundle.selling_price}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "start" }}
                  >
                    {t("ORDER_ID")}
                  </TableCell>
                  <TableCell sx={{ textAlign: "end" }}>
                    {orderDetails.id || "N/A"}
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </StyledTable>

          <Divider sx={{ my: 2 }} />

          <FooterText>{user_info.name}</FooterText>
          <ServiceNumber>{user_info.phone}</ServiceNumber>

          <LogoContainer>
            <Logo
              src={orderDetails?.bundle.service.company.company_logo}
              alt=""
              sx={{
                width: "48px",
                height: "48px",
                borderRadius: "50%", // makes it circular
                objectFit: "cover", // ensures image fits nicely within the circle
              }}
            />
          </LogoContainer>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" sx={{ textAlign: "center", mb: 2 }}>
            Best Telecom and Social Packages provider
          </Typography>
        </DialogContent>
      </Box>
        <DialogActions sx={{ p: 2 }}>
          <Box display="flex" justifyContent="space-between" width="100%">
            <ActionButton
              variant="outlined"
              onClick={shareImage}
              sx={{ fontSize: "12px" }}
            >
              {t('SHARE')}
            </ActionButton>
            <ActionButton
              variant="outlined"
              onClick={saveAsImage}
              sx={{ fontSize: "10px" }}
            >
              {t('SAVED_IMAGE_TO_GALLERY')}
            </ActionButton>
            <ActionButton
              variant="contained"
              onClick={onClose}
              sx={{ fontSize: "12px" }}
            >
              {t('CLOSE')}
            </ActionButton>
          </Box>
        </DialogActions>
        
      </Box>
    </StyledDialog>
  );
}
