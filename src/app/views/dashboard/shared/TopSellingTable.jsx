import { Edit, Visibility } from "@mui/icons-material";
import {
  Box,
  Card,
  Table,
  Select,
  Avatar,
  styled,
  TableRow,
  useTheme,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  TablePagination,
  CardContent,
  Typography,
  useMediaQuery
} from "@mui/material";
import { Paragraph } from "app/components/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from '../../../redux/actions/orderAction';
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import InfoModal from "app/views/order/shared/InfoModal";
import { useTranslation } from "react-i18next";

// STYLED COMPONENTS
const CardHeader = styled(Box)(() => ({
  display: "flex",
  paddingLeft: "24px",
  paddingRight: "24px",
  marginBottom: "12px",
  alignItems: "center",
  justifyContent: "space-between"
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize"
}));

const ProductTable = styled(Table)(({ theme }) => ({
  borderRadius: "8px",
 
  backgroundColor: theme.palette.background.paper,
  "& thead": {
    backgroundColor: theme.palette.primary.light,
    "& th": {
      color: theme.palette.primary.contrastText,
    }
  },
  "& tbody tr:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  "& tbody td": {
    color: theme.palette.text.primary,
  },
  "& td:first-of-type": { paddingLeft: "24px !important" },
}));

const TableHeaderCell = styled(TableCell)(() => ({
  background: "linear-gradient(to right, #3f51b5, #5a55ae)",
  color: "#fff",
}));

const Small = styled("small")(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: "#fff",
  padding: "2px 8px",
  borderRadius: "4px",
  overflow: "hidden",
  background: bgcolor,
  boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)"
}));

export default function TopSellingTable() {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
    dispatch(getOrders(page + 1, rowsPerPage));
  }, [dispatch, page, rowsPerPage]);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));


  return (
    <Card elevation={3} sx={{ pt: "10px",width:isSmallScreen?"100%":"auto"}}>
      <CardHeader>
        <Title>{t('ORDERS')}</Title>
      </CardHeader>
      <Box mt={1} mb={1} borderBottom="1px solid lightgrey" />
      <Box width="100%" overflow="auto" dir={isRtl ? "rtl" : "ltr"}>
        <ProductTable sx={{padding: "1px" }}>
          

        <TableBody>
  {orderList.map((order, index) => (
    <Card
      key={index}
      sx={{ mb: 1, height: "70px", paddingBottom: "1px", opacity: 0.9 }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
        onClick={() => handleClickOpen(order)}
      >
        {/* Logo Section */}
        <Box
          sx={{
            flex: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar src={order.bundle.service.company.company_logo} />
          {/* Bundle Info Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.1,
              wordWrap: "break-word",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                textTransform: "capitalize",
                fontSize: { xs: "10px", sm: "12px" }, // Responsive font sizes
              }}
            >
              {order.bundle.bundle_title}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                textTransform: "capitalize",
                fontSize: { xs: "10px", sm: "12px" }, // Responsive font sizes
              }}
            >
              {order.rechargeble_account}
            </Typography>
          </Box>
        </Box>

        {/* Sell Price Section */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            color: "green",
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontWeight: "bold", fontSize: { xs: "10px", sm: "12px" } }}
          >
            {t("SELL")}
          </Typography>
          <Typography
            variant="caption"
            sx={{ fontWeight: "bold", fontSize: { xs: "10px", sm: "12px" } }}
          >
            {order.bundle.selling_price} {user_info.currency.code}
          </Typography>
        </Box>

        {/* Buy Price Section */}
        {!isSmallScreen && (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.5,
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              color: "red",
            }}
          >
            <Typography
              variant="caption"
              sx={{ fontWeight: "bold", fontSize: { xs: "10px", sm: "12px" } }}
            >
              {t("BUY")}
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontWeight: "bold", fontSize: { xs: "10px", sm: "12px" } }}
            >
              {order.bundle.buying_price} {user_info.currency.code}
            </Typography>
          </Box>
        )}

        {/* Validity Section */}
        {!isSmallScreen && (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.5,
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            <Typography
              variant="caption"
              sx={{ fontWeight: "bold", fontSize: { xs: "10px", sm: "12px" } }}
            >
              {t("VALIDITY")}
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontWeight: "bold", fontSize: { xs: "10px", sm: "12px" } }}
            >
              {t(`${order.bundle.validity_type.toUpperCase()}`)}
            </Typography>
          </Box>
        )}

        {/* Status Section */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontWeight: "bold", fontSize: { xs: "10px", sm: "12px" } }}
          >
            {order.status === 0
              ? t("PENDING")
              : order.status === 1
              ? t("CONFIRMED")
              : t("REJECTED")}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  ))}
</TableBody>





        </ProductTable>

        
        
        <TablePagination
          sx={{ px: 2 }}
          page={page}
          component="div"
          rowsPerPage={rowsPerPage}
          count={total_items}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[10, 20, 30]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ "aria-label": "Next Page" }}
          backIconButtonProps={{ "aria-label": "Previous Page" }}
        />

        <InfoModal 
          open={modalOpen} 
          onClose={handleClose} 
          orderDetails={selectedOrder}
          currency_preference_code={user_info.currency.code}
        />
      </Box>
    </Card>
  );
}
