import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

// Styled components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.shape.borderRadius,
    width: "450px",
    maxWidth: "90%",
  },
}));

const HeaderIcon = styled(Box)(({ theme }) => ({
  fontSize: 60,
  marginBottom: theme.spacing(1),
  background: theme.palette.grey[200],
  borderRadius: "20%",
  padding: theme.spacing(1),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
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
  width: "fit-content",
  color: "#fff",
  padding: "2px 8px",
  borderRadius: "4px",
  background: bgcolor,
  boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
}));

export default function InfoDialog({ open, onClose, transaction, currency_preference_code }) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar" || i18n.language === "fa" || i18n.language === "ps";

  const getStatusLabel = (status) => {
    switch (status) {
      case "debit":
        return (
          <>
            <HeaderIcon>
              <ErrorOutlineIcon color="error" />
            </HeaderIcon>
            <Small bgcolor="#d9534f">DEBIT</Small>
          </>
        );
      case "credit":
        return (
          <>
            <HeaderIcon>
              <CheckCircleIcon color="success" />
            </HeaderIcon>
            <Small bgcolor="#5cb85c">CREDIT</Small>
          </>
        );
      default:
        return (
          <>
            <HeaderIcon>
              <HourglassEmptyIcon color="warning" />
            </HeaderIcon>
            <Small bgcolor="#f0ad4e">PENDING</Small>
          </>
        );
    }
  };

  return (
    <StyledDialog open={open} onClose={onClose}>
        <Box sx={{ border: '2px solid black', borderRadius: 2, m:1 }}>
            <DialogTitle>
            <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
            {transaction ? getStatusLabel(transaction.status) : "Transaction Info"}
            </Box>
            <Divider sx={{ mt: 2, mb: 0, borderStyle: "dashed", borderWidth: 1 }} />
            </DialogTitle>

            <DialogContent>
                <Box >
                {transaction && (
                    <>
                    <Box display="flex" justifyContent="space-between" my={1}>
                        <Label sx={{ color: "black" }}>{t("TRANSACTION_ID")}</Label>
                        <Value>{transaction.id || "N/A"}</Value>
                    </Box>
                    <Box display="flex" justifyContent="space-between" my={1}>
                        <Label sx={{ color: "black" }}>{t("RESSELER_NAME")}</Label>
                        <Value>{transaction.reseller.reseller_name}</Value>
                    </Box>
                    <Box display="flex" justifyContent="space-between" my={1}>
                        <Label sx={{ color: "black" }}>{t("TRANSACTION_REASON")}</Label>
                        <Value>{transaction.transaction_reason}</Value>
                    </Box>
                    <Box display="flex" justifyContent="space-between" my={1}>
                        <Label sx={{ color: "black" }}>{t("AMOUNT")}</Label>
                        <Value>
                        {currency_preference_code} {transaction.amount}
                        </Value>
                    </Box>


                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Box>
                            <Label sx={{ color: "black" }}>{t('DATE')}</Label>
                            <Typography variant="body2" color="textSecondary" sx={{ color: "black" }}>
                                {transaction ? format(new Date(transaction.created_at), 'dd-MM-yyyy') : "N/A"}
                            </Typography>
                        </Box>
                        <Box>
                            <img src={transaction?.order?.bundle?.service.company.company_logo} width="32px" height="32px" alt="" />
                        </Box>
                    </Box>
                    <Divider sx={{ my: 2, borderStyle: 'dashed', borderWidth: 1 }} />
                    
                    </>
                )}
                </Box>
            </DialogContent>
        </Box>
      

      <DialogActions>
        <Button variant="contained" color="secondary" onClick={onClose}>
          {t('CLOSE')}
          </Button>
      </DialogActions>
    </StyledDialog>
  );
}
