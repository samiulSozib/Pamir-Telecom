import React, { useState, useEffect } from "react";
import {
  Box,
  TablePagination,
  useTheme,
  Card,
  Typography,
  CardContent,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../redux/actions/orderAction";
import { format } from "date-fns";
import InfoModal from "./InfoModal";
import { useTranslation } from "react-i18next";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";


export default function PaginationTable() {
  const { palette } = useTheme();
  const bgPrimary = palette.primary.main;
  const bgError=palette.error.main
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterStatus, setFilterStatus] = useState("");
  const dispatch = useDispatch();
  const { orderList, total_items } = useSelector((state) => state.orderListReducer);
  const { user_info } = useSelector((state) => state.auth);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { t, i18n } = useTranslation();

  const isRtl = i18n.language === "ar" || i18n.language === "fa" || i18n.language === "ps";

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  useEffect(() => {
    dispatch(getOrders(page + 1, rowsPerPage, filterStatus));
  }, [dispatch, page, rowsPerPage, filterStatus]);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const getStatusInfo = (status) => {
    switch (status) { 
      case 0:
        return { label: t("PENDING"), color: "orange", icon: <HourglassEmptyIcon fontSize="small" color="action" /> };
      case 1:
        return { label: t("CONFIRMED"), color: "green", icon: <CheckCircleIcon fontSize="small" color="success" /> };
      case 2:
        return { label: t("REJECTED"), color: "red", icon: <ErrorOutlineIcon fontSize="small" color="error" /> };
      default:
        return { label: t("PENDING"), color: "orange", icon: <HourglassEmptyIcon fontSize="small" color="action" /> };
    }
  };

  

  return (
    <Box elevation={3} dir={isRtl ? "rtl" : "ltr"} sx={{ p:"10px",marginTop:"-20px"}}>
      <Box display="flex" justifyContent="flex-end" mb={1}>
        <FormControl size="small" sx={{ minWidth: 120, mr: "2px" }}>
          <InputLabel>{t("STATUS")}</InputLabel>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            label={t("STATUS")}
          >
            <MenuItem value="">{t("ALL")}</MenuItem>
            <MenuItem value="0">{t("PENDING")}</MenuItem>
            <MenuItem value="1">{t("CONFIRMED")}</MenuItem>
            <MenuItem value="2">{t("REJECTED")}</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box overflow="auto" dir={isRtl ? "rtl" : "ltr"}>
        <Grid container spacing={2}>
          {orderList.map((order, index) => {
            const { label, color, icon } = getStatusInfo(order.status);
            return (
            <Grid
              key={index}
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              xl={3}
              sx={{
                cursor: "pointer",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.03)" },
              }}
              onClick={() => handleClickOpen(order)}
            >
              <Paper elevation={6} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                {/* Card Header */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  bgcolor="rgba(238, 130, 238, 0.2)"
                  p={1}
                >
                  <Typography
                    sx={{
                      backgroundColor: "white",
                      color: "black",
                      padding: "3px 4px",
                      borderRadius: "6px",
                      fontWeight: "bold",
                      fontSize: isSmallScreen ? '12px' : 'inherit', // Font size adjustment
                    }}
                  >
                    {format(new Date(order.created_at), "dd MMM yyyy")}
                  </Typography>
                  <Typography
                    color="black"
                    fontWeight="bold"
                    fontSize={isSmallScreen ? '12px' : 'inherit'} // Font size adjustment
                  >
                    {t("ORDER_ID")} #{order.id}
                  </Typography>
                </Box>

                {/* Card Content */}
                <CardContent sx={{ p: 2 }}>
                  <Box display="flex" justifyContent="space-between">
                    <Box display="flex" flexDirection="column" alignItems="start" mb={1}>
                      <Typography fontWeight="bold" fontSize={isSmallScreen ? '10px' : 'inherit'}>
                        {t("RECHARGEABLE_ACCOUNT")}
                      </Typography>
                      <Typography color="textSecondary" fontSize={isSmallScreen ? '10px' : 'inherit'}>
                        {order.rechargeble_account}
                      </Typography>
                    </Box>
                    <Box display="flex">
                      <Typography color="textSecondary" fontSize={isSmallScreen ? '10px' : 'inherit'}>
                        {label}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Divider */}
                  <Box mt={1} mb={1} borderBottom="1px solid lightgrey" />

                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium" fontSize={isSmallScreen ? '10px' : 'inherit'}>
                        {t("TITLE")}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" fontSize={isSmallScreen ? '10px' : 'inherit'}>
                        {order.bundle.bundle_title}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium" fontSize={isSmallScreen ? '10px' : 'inherit'}>
                        {t("SALE")}
                      </Typography>
                      <Typography color="textSecondary" fontSize={isSmallScreen ? '10px' : 'inherit'}>
                        {order.bundle.selling_price} {user_info.currency.code}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium" fontSize={isSmallScreen ? '10px' : 'inherit'}>
                        {t("BUY")}
                      </Typography>
                      <Typography color="textSecondary" fontSize={isSmallScreen ? '10px' : 'inherit'}>
                        {order.bundle.buying_price} {user_info.currency.code}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" color="textSecondary" fontSize={isSmallScreen ? '10px' : 'inherit'}>
                      {t(`${order.bundle.validity_type.toUpperCase()}`)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
              </Paper>
            </Grid>
            );
            })}
        </Grid>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total_items}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      {/* Modal */}
      <InfoModal
        open={modalOpen}
        onClose={handleClose}
        orderDetails={selectedOrder}
        currency_preference_code={user_info.currency.code}
      />
    </Box>
  );
}
