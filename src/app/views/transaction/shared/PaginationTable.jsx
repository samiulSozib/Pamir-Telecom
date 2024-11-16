import { useState, useEffect } from "react";
import {
  Box,
  Icon,
  Table,
  styled,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useMediaQuery,
  Typography,
  Avatar,
  CardContent,
  Card,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../../../redux/actions/transactionAction";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import InfoDialog from "./InfoDialog";

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

// STYLED COMPONENT
const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: "pre",
  borderRadius: "8px",
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
  "& thead": {
    backgroundColor: theme.palette.primary.light,
    "& th": {
      color: theme.palette.primary.contrastText,
      fontWeight: "bold",
      fontSize: "0.9rem",
      padding: "12px 16px",
    }
  },
  "& tbody tr:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  "& tbody td": {
    padding: "10px 16px",
    fontSize: "0.875rem",
    borderBottom: "1px solid #e0e0e0",
    color: theme.palette.text.primary,
  },
  "& td:first-of-type": { paddingLeft: "24px !important" },
}));

const TableHeaderCell = styled(TableCell)(() => ({
  background: "linear-gradient(to right, #3f51b5, #5a55ae)",
  color: "#fff",
  fontWeight: "bold",
  textAlign: "center",
}));

export default function PaginationTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const dispatch = useDispatch();
  const { transactionList, total_items } = useSelector((state) => state.transactionListReducer);
  const { user_info } = useSelector((state) => state.auth);

  const { t, i18n } = useTranslation();

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(getTransactions(page + 1, rowsPerPage));
  }, [dispatch, page, rowsPerPage]);

  const isRtl = i18n.language === "ar" || i18n.language === "fa" || i18n.language === "ps";

  const handleOpenDetailsDialog = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenDetailsDialog(true);
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedTransaction(null);
  };

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));


  return (
    <Box width="100%" overflow="auto" dir={isRtl ? "rtl" : "ltr"}>

      {isSmallScreen?(
        <Box width="100%" overflow="auto" dir={isRtl ? "rtl" : "ltr"}>
          <ProductTable sx={{padding: "1px" }}>
            

          <TableBody>
            {transactionList.map((transaction, index) => (
              <Card key={index} sx={{ mb: 1, height: "60px", paddingBottom: "1px", opacity: 0.9 }}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                  
                  {/* Logo Section */}
                  <Box sx={{ 
                    flex:1.5,
                    display: 'flex', 
                    alignItems: 'center', 
                    gap:1
                  }}>
                      {/* Bundle Info Section */}
                      
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 'bold', 
                          textTransform: 'capitalize', 
                          fontSize: '12px'  // 12px only for small screens
                        }}
                      >
                        {transaction.reseller.reseller_name}
                      </Typography>
                      
                  </Box>
                  
                   {/* Date Section */}
                   <Box sx={{ 
                    flex:1,
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    gap: 0.5,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '10px'  }}>
                    {format(new Date(transaction.created_at), 'dd-MM-yyyy')}
                    </Typography>
                  </Box>
                
                  
                  
                  {/* Sell Price Section */}
                  <Box sx={{ 
                    flex:1,
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    gap: 0.5,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    color: transaction.status.toLowerCase() === 'debit' ? 'red' : 'green' 
                  }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '10px'  }}>
                      {t(`${transaction.status}`)}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '10px'  }}>
                    {user_info.currency_preference_code} {transaction.amount}
                    </Typography>
                  </Box>
                  
                 
             
                </CardContent>
              </Card>
            ))}
          </TableBody>




          </ProductTable>
      </Box>
      ):(

     

        <StyledTable sx={{  }}>
          <TableHead>
            <TableRow>
              <TableHeaderCell colSpan={3} align={isRtl ? "right" : "left"}>{t("RESELLER_NAME")}</TableHeaderCell>
              <TableHeaderCell colSpan={2} align="center">{t("DATE")}</TableHeaderCell>
              <TableHeaderCell colSpan={2} align="center">{t("STATUS")}</TableHeaderCell>
              <TableHeaderCell colSpan={2} align="center">{t("AMOUNT")}</TableHeaderCell>
              <TableHeaderCell colSpan={2} align={isRtl ? "center" : "center"}>{t("ACTION")}</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionList.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell colSpan={3} align={isRtl ? "right" : "left"}>{transaction.reseller.reseller_name}</TableCell>
                <TableCell colSpan={2} align="center">
                  {format(new Date(transaction.created_at), 'dd-MM-yyyy')}
                </TableCell>
                <TableCell
                colSpan={2}
                  align="center"
                  style={{ color: transaction.status.toLowerCase() === 'debit' ? 'red' : 'green' }}
                >
                  {transaction.status}
                </TableCell>
                <TableCell
                colSpan={2}
                  align="center"
                  style={{ color: transaction.status.toLowerCase() === 'debit' ? 'red' : 'green' }}
                >
                  {transaction.currency.code} {transaction.amount}
                </TableCell>
                <TableCell colSpan={2} align={isRtl ? "center" : "center"}>
                  <IconButton onClick={() => handleOpenDetailsDialog(transaction)}>
                    <Icon color="primary">info</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      )}
      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={total_items}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[10, 20, 30]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": t("Next Page") }}
        backIconButtonProps={{ "aria-label": t("Previous Page") }}
      />

      {/* Transaction Details Dialog */}
      {/* <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog} dir={isRtl ? "rtl" : "ltr"}>
        <DialogTitle>{t("Transaction Details")}</DialogTitle>
        <DialogContent>
          {selectedTransaction && (
            <>
              <DialogContentText>
                <strong>{t("Reseller Name")}: </strong> {selectedTransaction.reseller.reseller_name}
              </DialogContentText>
              <DialogContentText>
                <strong>{t("Date")}: </strong> {format(new Date(selectedTransaction.created_at), 'dd-MM-yyyy')}
              </DialogContentText>
              <DialogContentText>
                <strong>{t("Status")}: </strong> {selectedTransaction.status}
              </DialogContentText>
              <DialogContentText>
                <strong>{t("Amount")}: </strong> {selectedTransaction.currency.code} {selectedTransaction.amount}
              </DialogContentText>
              <DialogContentText>
                <strong>{t("Transaction ID")}: </strong> {selectedTransaction.id}
              </DialogContentText>
              <DialogContentText>
                <strong>{t("Description")}: </strong> {selectedTransaction.description || t("No description available")}
              </DialogContentText>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailsDialog} color="primary">
            {t("Close")}
          </Button>
        </DialogActions>
      </Dialog> */}
      <InfoDialog 
          open={openDetailsDialog} 
          onClose={handleCloseDetailsDialog} 
          transaction={selectedTransaction}
          currency_preference_code={user_info.currency_preference_code}
        />
    </Box>
  );
}
