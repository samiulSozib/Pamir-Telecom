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
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Card,
  CircularProgress,
  useMediaQuery,
  CardContent
} from "@mui/material";
import { Paragraph } from "app/components/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getSubReseller, getSingleSubReseller } from '../../../redux/actions/subResellerAction';
import { useNavigate } from "react-router-dom";
import ActionMenu from "./ActionMenu";
import { useTranslation } from "react-i18next";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import MoreVert from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import LockIcon from "@mui/icons-material/Lock";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BlockIcon from "@mui/icons-material/Block";


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

const CardHeader = styled(Box)(({ isRtl }) => ({
  display: "flex",
  marginBottom: "12px",
  alignItems: "center",
  justifyContent: "space-between",
  paddingLeft: isRtl ? "5px" : "0",
  paddingRight: isRtl ? "0" : "5px",
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize"
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1)
}));

// STYLED COMPONENT
const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } }
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } }
  }
}));

const CloseButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: "#fff",
  borderRadius: 20,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));

export default function PaginationTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const { subResellerList, total_items, singleSubReseller } = useSelector((state) => state.subResellerListReducer);
  const { user_info } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [searchTag, setSearchTag] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();

  // Determine if the current language is RTL
  const isRtl = i18n.language === "ar" || i18n.language === "fa" || i18n.language === "ps";

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDialog = (resellerId) => {
    setLoading(true);
    dispatch(getSingleSubReseller(resellerId)).finally(() => setLoading(false));
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    dispatch(getSubReseller());
  }, [dispatch, page, rowsPerPage]);

  const handleAdd = () => {
    navigate("/sub-reseller/add");
  };

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box  sx={{marginTop:"-20px"}}>
      <CardHeader isRtl={isRtl}>
        <Title></Title>
        {/* <TextField 
          size="small" 
          placeholder={t('SEARCH')}
          variant="outlined" 
          onChange={(e) => setSearchTag(e.target.value)}
        /> */}
        <StyledButton variant="contained" color="secondary" onClick={handleAdd}>
          {t('ADD_NEW')}
        </StyledButton>
      </CardHeader>
      <Box width="100%" overflow="auto" sx={{ paddingLeft: isRtl ? 2 : 0, paddingRight: isRtl ? 0 : 2 }}>


          {isSmallScreen?(
            <Box width="100%" overflow="auto" dir={isRtl ? "rtl" : "ltr"}>
            <ProductTable sx={{padding: "1px" }}>
              
  
            <TableBody>
              {subResellerList.map((subReseller, index) => (
                <Card key={index} sx={{ mb: 1, height: "60px", paddingBottom: "1px", opacity: 0.9 }}>
                  <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                    
                    {/* Logo Section */}
                    <Box sx={{ 
                      flex:1,
                      display: 'flex', 
                      alignItems: 'center', 
                      gap:1 
                      }}>
                        <Avatar src={subReseller.profile_image_url}/>
                          {/* Bundle Info Section */}
                          <Box sx={{ 
                          
                          display: 'flex', 
                          flexDirection: 'column', 
                          gap: 0.1, 
                          wordWrap: 'break-word',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'normal'
                        }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 'bold', 
                              textTransform: 'capitalize', 
                              fontSize: "10px"  // 12px only for small screens
                            }}
                          >
                            {subReseller.reseller_name}
                          </Typography>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              textTransform: 'capitalize', 
                              fontSize: "10px"
                            }}
                          >
                            {subReseller.phone}
                          </Typography>
                          </Box>
                      </Box>
                    
                     {/* Balance Section */}
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
                      {subReseller.balance} {user_info.currency_preference_code}
                      </Typography>
                    </Box>

                    {/* Details Section */}
                    <Box sx={{ 
                      flex:0.5,
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      gap: 0.5,
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}>
                      <IconButton onClick={() => handleOpenDialog(subReseller.id)}>
                        <Icon>info</Icon>
                      </IconButton>
                    </Box>

                    {/* Action Section */}
                    <Box sx={{ 
                      flex:0.5,
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      gap: 0.5,
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}>
                      <ActionMenu 
                      subReseller={subReseller}
                      options={
                        [ subReseller?.status === 0
                        ? { name: "Deactivate", icon: <BlockIcon style={{ color: "red" }} /> }
                        : { name: "Activate", icon: <LockOpenIcon style={{ color: "green" }} /> },
                          { name: "Delete", icon: <DeleteIcon style={{ color: "red" }} /> },
                          { name: "Set Password", icon: <LockIcon /> },
                          { name: "Change Balance", icon: <AccountBalanceIcon /> }
                        ]
                        }
                      />
                    </Box>
                  
                    
                    
                    
                    
                   
               
                  </CardContent>
                </Card>
              ))}
            </TableBody>
  
  
  
  
            </ProductTable>
        </Box>
          ):(

         
            <StyledTable >
              <TableHead>
                <TableRow>
                  <TableCell align={isRtl ? "right" : "left"} colSpan={4}>{t('SUB_RESELLER')}</TableCell>
                  <TableCell align="center" colSpan={2}>{t('BALANCE')}</TableCell>
                  <TableCell align="center" colSpan={2}>{t('PHONE_NUMBER')}</TableCell>
                  <TableCell align="center" colSpan={2}>{t('VIEW_DETAILS')}</TableCell>
                  <TableCell align="center" colSpan={2}>{t("ACTION")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subResellerList.map((subReseller, index) => (
                  <TableRow key={index}>
                    <TableCell align={isRtl ? "right" : "left"} colSpan={4}>
                      <Box display="flex" alignItems="center" gap={4}>
                        <Avatar src={subReseller.profile_image_url} />
                        <Paragraph>{subReseller.reseller_name}</Paragraph>
                      </Box>
                    </TableCell>
                    <TableCell align="center" colSpan={2}>{subReseller.balance} {user_info.currency_preference_code}</TableCell>
                    <TableCell align="center" colSpan={2}>{subReseller.phone}</TableCell>
                    <TableCell align="center" colSpan={2}>
                      <IconButton onClick={() => handleOpenDialog(subReseller.id)}>
                        <Icon>info</Icon>
                      </IconButton>
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      <ActionMenu 
                      subReseller={subReseller}
                      options={
                        [ subReseller?.status === 0
                        ? { name: "Deactivate", icon: <BlockIcon style={{ color: "red" }} /> }
                        : { name: "Activate", icon: <LockOpenIcon style={{ color: "green" }} /> },
                          { name: "Delete", icon: <DeleteIcon style={{ color: "red" }} /> },
                          { name: "Set Password", icon: <LockIcon /> },
                          { name: "Change Balance", icon: <AccountBalanceIcon /> }
                        ]
                        }
                      />
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
          nextIconButtonProps={{ "aria-label": "Next Page" }}
          backIconButtonProps={{ "aria-label": "Previous Page" }}
        />
      </Box>

      {/* Dialog for Sub-Reseller Details */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>{t('DETAILS')}</DialogTitle>
      <DialogContent>
      {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="150px">
              <CircularProgress />
            </Box>
          ) : (
        singleSubReseller && (
          <Grid container spacing={2}>
            {/* Today Order */}
            <Grid item xs={6} sm={4}>
              <Card sx={{ padding: 2,  textAlign: 'center' }}>
                <Typography variant="subtitle1">Today Order</Typography>
                <Typography variant="h6">{singleSubReseller.reseller.today_orders}</Typography>
              </Card>
            </Grid>

            {/* Total Order */}
            <Grid item xs={6} sm={4}>
              <Card sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="subtitle1">Total Order</Typography>
                <Typography variant="h6">{singleSubReseller.reseller.total_orders}</Typography>
              </Card>
            </Grid>

            {/* Today Sale */}
            <Grid item xs={6} sm={4}>
              <Card sx={{ padding: 2,  textAlign: 'center' }}>
                <Typography variant="subtitle1">{t('TODAY_SALE')}</Typography>
                <Typography variant="h6">{singleSubReseller.today_sale}</Typography>
              </Card>
            </Grid>

            {/* Total Sales */}
            <Grid item xs={6} sm={4}>
              <Card sx={{ padding: 2,  textAlign: 'center' }}>
                <Typography variant="subtitle1">{t('TOTAL_SALE')}</Typography>
                <Typography variant="h6">{singleSubReseller.total_sale}</Typography>
              </Card>
            </Grid>

            {/* Today Profit */}
            <Grid item xs={6} sm={4}>
              <Card sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="subtitle1">{t('TODAY_PROFIT')}</Typography>
                <Typography variant="h6">{singleSubReseller.today_profit}</Typography>
              </Card>
            </Grid>

            {/* Total Profit */}
            <Grid item xs={6} sm={4}>
              <Card sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="subtitle1">{t('TOTAL_PROFIT')}</Typography>
                <Typography variant="h6">{singleSubReseller.total_profit}</Typography>
              </Card>
            </Grid>
          </Grid>
        ))}
      </DialogContent>
      <DialogActions>
        <CloseButton onClick={handleCloseDialog} color="primary">{t('CLOSE')}</CloseButton>
      </DialogActions>
    </Dialog>
    </Box>
  );
}
