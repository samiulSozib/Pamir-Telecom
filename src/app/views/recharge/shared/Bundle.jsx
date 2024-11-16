import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Card,
  Table,
  Select,
  Avatar,
  styled,
  TableRow,
  useTheme,
  TableCell,
  MenuItem,
  TableBody,
  TableHead,
  IconButton,
  TablePagination,
  TextField,
  Grid,
  Breadcrumbs,
  Link,
  Typography,
  Modal,
  Button,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  InputAdornment,
  CircularProgress,
  FormHelperText,
  Paper,
  useMediaQuery,
  CardContent
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import DialpadIcon from '@mui/icons-material/Dialpad';
import { Instagram, SportsBasketball, Twitter } from "@mui/icons-material";
import { useMemo } from "react";
import { H1, H3, H6, Paragraph, Span } from "app/components/Typography";
import { useLocation } from "react-router-dom";
import {getServices} from '../../../redux/actions/serviceAction'
import {getBundles} from '../../../redux/actions/bundleAction'
import {placeOrder,confirmPin,clearMessages} from '../../../redux/actions/rechargeAction'
import {getCountries} from '../../../redux/actions/locationAction'
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";


// STYLED COMPONENTS
const CardHeader = styled(Box)(() => ({
  display: "flex",
  width:"100%",
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

const ProductTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& small": {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)"
  },
  "& td": { borderBottom: "none" },
  "& td:first-of-type": { paddingLeft: "16px !important" }
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



const ImageListContainer = styled(Box)(() => ({
  cursor:"pointer",
  display: "flex",
  gap: "8px", // spacing between each image card
  
  "& img": {
    borderRadius: "4px",
  },
  
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: 180,
  height: 150,
  marginRight: 16,
  display: "flex", // Enable flexbox
  alignItems: "center", // Center items vertically
  justifyContent: "center", // Center items horizontally
  borderRadius: "10px",
  overflow: "hidden",
}));





export default function Bundle() {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar" || i18n.language === "fa" || i18n.language === "ps";
  const [errorMessage,setErrorMessage]=useState("")


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const countryId = queryParams.get('countryId');
  const categoryId = queryParams.get('categoryId');

  //console.log('Country ID:', countryId);
  //console.log('Category ID:', categoryId);

  const dispatch=useDispatch()
  const {serviceList}=useSelector((state)=>state.serviceListReducer)
  const {bundleList,total_items}=useSelector((state)=>state.bundleListReducer)
  const {user_info}=useSelector((state)=>state.auth)
  const [visibleRows, setVisibleRows] = useState({});
  const [validity, setValidity] = useState("");
  const [companyId,setCompanyId]=useState("")
  const [searchTag,setSearchTag]=useState("")
  const [number,setNumber]=useState("")
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [pin,setPin]=useState("")
  const [phoneNumberLength,setPhoneNumberLength]=useState("")
  const { message,error,loading, pinConfirmed, orderPlaced } = useSelector((state) => state.rechargeReducer);
  const {countries}=useSelector((state)=>state.locationReducer)



  // const getCompanyIdByPrefix = (prefix) => {
  //   const service = serviceList.find((service) =>
  //     service.company.companycodes.some((code) => prefix.startsWith(code.reserved_digit))
  //   );
  //   return service ? service.company.id : null;
  // };

  // const handlePrefixMatch = (prefix) => {
  //   const matchedCompanyId = getCompanyIdByPrefix(prefix);
  //   setCompanyId(matchedCompanyId || "");
  // };

  useEffect(()=>{
    dispatch(getServices(categoryId,countryId))
    dispatch(getBundles(page+1,rowsPerPage,countryId,validity,companyId,categoryId,searchTag))
    dispatch(getCountries())
  },[dispatch,validity,companyId,searchTag,page,rowsPerPage])


  useEffect(() => {
    if (number.length >= 3) { 
      const matchedService = serviceList.find((service) =>
        service.company.companycodes.some((code) => 
          number.startsWith(code.reserved_digit)
        )
      );
  
      if (matchedService) {
        setCompanyId(matchedService.company.id);
      } else {
        setCompanyId("");
      }
    }else if(number.length<3 && number.length>0){
      setCompanyId("")
    }
  }, [number, serviceList]);

  const filteredServiceList = useMemo(() => {
    if ((number.length<3 && number.length>=0)) return serviceList; // Return all services if no companyId is set
    return serviceList.filter(service => service.company.id === companyId);
  }, [companyId, serviceList]);

  const handleVisibilityToggle = (index) => {
    setVisibleRows((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleBundleSelect = (bundle) => {
    if(number.length===0){
      toast.error(t('ENTER_YOUR_NUMBER'))
    }
    
    if (number.length >= 3) {
      
      const prefix = number.substring(0, 3);
      const matchedService = serviceList.find(service =>
        service.company.companycodes.some(code => prefix.startsWith(code.reserved_digit))
      );
  
      if (!matchedService) {
        toast.error(t('INVALID_PHONE'))
        return;
      }
    }

    if (number.length === parseInt(phoneNumberLength)) {
      setSelectedBundle(bundle);
      setModalOpen(true);
    }
  };

  useEffect(() => {
    const selectedCountry = countries.find(country => country.id === parseInt(countryId));
    
    if (selectedCountry) {
      
      setPhoneNumberLength(selectedCountry.phone_number_length)
    }

}, [ dispatch,countries,phoneNumberLength,countryId]);



  //const handleCloseModal = () => setModalOpen(false);
  const handleCloseModal=()=>{
    setModalOpen(false)
    setErrorMessage("")
  }

  const checkPIN=()=>{
    dispatch(confirmPin(pin,selectedBundle,number))
  }

  useEffect(()=>{
    if(message || error){
    if(orderPlaced){
      Swal.fire({
        title: "Good job!",
        text: message,
        icon: "success"
      });
      setNumber('')
      dispatch(clearMessages())
      handleCloseModal()
    }
    if(error){
      setErrorMessage(error)
      dispatch(clearMessages())
    }
    }
  },[dispatch,orderPlaced,error,message])



  const handleNumberChange = (e) => {
    const value = e.target.value;
    setNumber(value);
    console.log(value.length)
  
    if (value.length === 0) {
      setPhoneNumberError("");  // Clear error if input is empty
    } else if (value.length < phoneNumberLength) {
      setPhoneNumberError(`Number should be ${phoneNumberLength} digits.`);
    } else if (value.length === phoneNumberLength) {
      setPhoneNumberError("");  // Clear error if length is correct
    }

    if (value.length >= 3) {
      
      const prefix = value.substring(0, 3);
      const matchedService = serviceList.find(service =>
        service.company.companycodes.some(code => prefix.startsWith(code.reserved_digit))
      );
  
      if (!matchedService) {
        setPhoneNumberError(t('INVALID_PHONE'));
      } else {
        setPhoneNumberError("");
        setCompanyId(matchedService.company.id);
      }
    } else {
      setCompanyId("");
    }
  };

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  

  return (
   
    <Card sx={{  mb: 3 }} dir={isRtl?'rtl':'ltr'} >
      {/* <CardHeader>
      
        <Title>{t('RECHARGE')}</Title>
        
      </CardHeader> */}

      <Paper elevation={5}>
        <Card  sx={{ pt: "10px", mb: 3}}>
          <CardHeader>
            <Grid container spacing={1} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <ImageListContainer
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    overflowX: { xs: 'auto', sm: 'auto', lg: 'unset' },
                    '&::-webkit-scrollbar': { display: 'none' },
                    justifyContent: 'center',
                    flexWrap: { lg: 'wrap', xl: 'wrap' }
                    
                  }}
                >
                  {filteredServiceList.map((service, index) => (
                    <Box>
                      <Box sx={{ display: { xs: 'block', sm: 'none' } }} onClick={() => setCompanyId(service.company.id)}> 
                        <Avatar
                          src={service.company.company_logo}
                          alt={service.company.company_name}
                          sx={{
                            width: 45, // Smaller size for Avatar on small screens
                            height: 45,
                          }}
                        />
                    </Box>

                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', justifyContent: 'center' }}>
                      <Card
                        elevation={5}
                        key={index}
                        sx={{
                          minWidth: "90px",
                          minHeight: "90px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: 'transform 0.3s',
                          '&:hover': { transform: 'scale(1.07)' },
                        }}
                        onClick={() => setCompanyId(service.company.id)}
                      >
                        <img
                          src={service.company.company_logo}
                          alt={service.company.company_name}
                          style={{ width: "90px", height: "70px", objectFit: "contain", padding: "2px" }}
                        />
                      </Card>
                    </Box>

                    </Box>
                  ))}
                </ImageListContainer>
                

              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                <TextField
                  margin="dense"
                  label={t('SEARCH')}
                  size="small"
                  variant="outlined"
                  fullWidth // Use fullWidth to ensure it takes up the entire grid space
                  onChange={(e) => setSearchTag(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                <TextField
                  type="number"
                  margin="dense"
                  label={t('ENTER_YOUR_NUMBER')}
                  size="small"
                  variant="outlined"
                  fullWidth // Also use fullWidth for this TextField
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= phoneNumberLength) { // Limit to phoneNumberLength
                      handleNumberChange(e); // Call the original onChange handler
                    }
                  }}                  
                  value={number}
                  error={Boolean(phoneNumberError)}
                  helperText={phoneNumberError} 
                  required
                  inputProps={{
                    min: 0,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DialpadIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& input[type=number]': {
                      // Hides the spinner in Chrome, Safari, Edge, and other WebKit browsers
                      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                        WebkitAppearance: 'none',
                        margin: 0,
                      },
                      // Hides the spinner in Firefox
                      MozAppearance: 'textfield',
                    },
                  }}
                />
                
              </Grid>

              <Box
                sx={{
                  marginTop: 1,
                  display: 'flex',
                  overflowX: 'auto',  // Enables horizontal scrolling if needed
                  gap: 1, // Space between items
                  alignItems: 'center', // Centers items vertically
                }}
              >
                {[
                  { value: '', label: t('ALL') },
                  { value: 'unlimited', label: t('UNLIMITED') },
                  { value: 'monthly', label: t('MONTHLY') },
                  { value: 'weekly', label: t('WEEKLY') },
                  { value: 'daily', label: t('DAILY') },
                  { value: 'hourly', label: t('HOURLY') },
                  { value: 'nightly', label: t('NIGHTLY') },
                ].map((item) => (
                  <Button
                    key={item.value}
                    sx={{
                      padding: '6px 12px', // Button padding
                      borderRadius: '20px', // Rounded button
                      backgroundColor: validity === item.value ? 'primary.main' : 'transparent',
                      color: validity === item.value ? 'white' : 'text.primary',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                      },
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }, // Smaller font for small screens
                      borderRight: item.value !== 'nightly' ? '1px solid #ccc' : 'none', // Vertical line between buttons
                    }}
                    onClick={() => setValidity(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>

              
            </Grid>
            
          </CardHeader>
        </Card>
        
      </Paper>


      {/* <CardHeader>
  <Box
    sx={{
      display: 'flex',
      overflowX: 'auto',  // Enables horizontal scrolling if needed
      gap: 2, // Space between items
      alignItems: 'center', // Centers items vertically
    }}
  >
    {[
      { value: '', label: t('ALL') },
      { value: 'unlimited', label: t('UNLIMITED') },
      { value: 'monthly', label: t('MONTHLY') },
      { value: 'weekly', label: t('WEEKLY') },
      { value: 'daily', label: t('DAILY') },
      { value: 'hourly', label: t('HOURLY') },
      { value: 'nightly', label: t('NIGHTLY') },
    ].map((item) => (
      <Button
        key={item.value}
        sx={{
          padding: '6px 12px', // Button padding
          borderRadius: '20px', // Rounded button
          backgroundColor: validity === item.value ? 'primary.main' : 'transparent',
          color: validity === item.value ? 'white' : 'text.primary',
          '&:hover': {
            backgroundColor: 'primary.light',
          },
        }}
        onClick={() => setValidity(item.value)}
      >
        {item.label}
      </Button>
    ))}
  </Box>

</CardHeader> */}



      

      
      <Box overflow="auto" dir={isRtl?'rtl':'ltr'}>
     

          {isSmallScreen?(
            <ProductTable sx={{ padding: "1px" }}>
              <TableBody>
                {bundleList.map((bundle, index) => (
                  <Card key={index} sx={{cursor:"pointer", mb: 1,height:"70px",paddingBottom:"1px", opacity: 0.9}} onClick={() => handleBundleSelect(bundle.id)} >
                    <CardContent sx={{ display: 'flex',justifyContent:'space-between', alignItems: 'center', gap: 1 }}>
                      
                      {/* Logo Section */}
                      <Box sx={{flex:2.5,  display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={bundle.service.company.company_logo} />
                        {/* Bundle Info Section */}
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          gap: 0.1, 
                          wordWrap: 'break-word', // Ensures text wraps to next line if too long
                          overflow: 'hidden', // Prevents overflow
                          textOverflow: 'ellipsis', // Adds ellipsis if content is too long
                          whiteSpace: 'normal', // Allows wrapping of text
                        }}
                      >
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 'bold', 
                            textTransform: 'capitalize', 
                            fontSize: '10px' // Set font size to 12px
                          }}
                        >
                          {bundle.bundle_title}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            textTransform: 'capitalize', 
                            fontSize: '10px' // Set font size to 12px
                          }}
                        >
                          {bundle.validity_type.charAt(0).toUpperCase() + bundle.validity_type.slice(1)}
                        </Typography>
                      </Box>
                      </Box>
                      
                      
                      
                      {/* Sell Price Section */}
                      <Box 
                        sx={{
                          flex:1,
                          display: 'flex', 
                          flexDirection: 'column', 
                          alignItems: 'center', 
                          gap: 0.5,
                          textOverflow: 'ellipsis', // Ensures that long text will be truncated with ellipsis
                          overflow: 'hidden', // Prevents text overflow
                          whiteSpace: 'nowrap', // Prevents wrapping of text
                        }}
                      >
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            fontWeight: 'bold', 
                            fontSize: '10px' // Set font size to 12px
                          }}
                        >
                          {t('SELL')}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            fontWeight: 'bold', 
                            fontSize: '10px' // Set font size to 12px
                          }}
                        >
                          {bundle.selling_price} {user_info.currency_preference_code}
                        </Typography>
                      </Box>
                      
                      {/* Buy Price Section */}
                      <Box 
                        sx={{ 
                          flex:1,
                          display: 'flex', 
                          flexDirection: 'column', 
                          alignItems: 'center', 
                          gap: 0.5,
                          textOverflow: 'ellipsis', // Adds ellipsis for overflow
                          overflow: 'hidden', // Hides overflow content
                          whiteSpace: 'nowrap', // Prevents wrapping of text
                        }}
                      >
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            fontWeight: 'bold', 
                            fontSize: '10px' // Set font size to 12px
                          }}
                        >
                          {t('BUY')}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            fontWeight: 'bold', 
                            fontSize: '10px' // Set font size to 12px
                          }}
                        >
                          {visibleRows[index] ? `${bundle.buying_price} ${user_info.currency_preference_code}` : "****"}
                        </Typography>
                      </Box>
                      
                      {/* Visibility Toggle Button */}
                      <IconButton onClick={() => handleVisibilityToggle(index)}>
                        {visibleRows[index] ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </CardContent>
                  </Card>
                
                
                
                
                ))}
              </TableBody>
            </ProductTable>
          

            ):(
              <Grid container spacing={2} dir={isRtl?'rtl':'ltr'}>
              {bundleList.map((bundle, index) => (
                <Grid key={index} item xs={12} md={6} lg={3} xl={3} sx={{ mt:"2px", transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                  <Paper elevation={3}>
                    <Card 
                      sx={{ 
                        cursor:"pointer",
                        maxHeight:"250px",
                        textAlign: "center", 
                        padding: 2, 
                        m: "2px", 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center' ,
                      }}
                      onClick={() => handleBundleSelect(bundle.id)} 
                    >
                      <ImageContainer>
                        <img 
                          src={bundle.service.company.company_logo} 
                          alt="Company Logo" 
                          style={{
                            borderRadius: '10px',
                            maxWidth: "90%",
                            maxHeight: "90%",
                            objectFit: "contain",
                            display: "block",
                          }} 
                        />
                      </ImageContainer>
    
                      <Box marginTop={2} width="100%" dir={isRtl ? 'rtl' : 'ltr'}>
                        <Grid container spacing={2} justifyContent="center">
                          <Grid item xs={12} textAlign={isRtl ? 'right' : 'center'}>
                            <H3 style={{ marginTop: "16px" }}>
                              {bundle.bundle_title}
                              <span 
                                style={{
                                  marginRight: isRtl ? '8px' : '0', 
                                  marginLeft: isRtl ? '0' : '8px', 
                                  fontWeight: "normal", 
                                  marginTop: isRtl ? '0' : '0', 
                                  marginBottom: '8px' // Add margin to create space
                                }}
                              >
                                {/* {bundle.validity_type.charAt(0).toUpperCase() + bundle.validity_type.slice(1)} */}
                                {t(`${(bundle.validity_type).toUpperCase()}`)}
                              </span>
                            </H3>
                          </Grid>
                        </Grid>
    
                        <Grid container spacing={2} marginTop={2}>
                          <Grid item xs={6} textAlign={isRtl ? 'right' : 'left'}>
                            <H6 style={{color:'green'}}>
                              <strong>{t('SELL')} :</strong> {bundle.selling_price} {user_info.currency_preference_code}
                            </H6>
                          </Grid>
                          <Grid item xs={6} textAlign={isRtl ? 'left' : 'right'}>
                            <H6 style={{color:'red'}}>
                              <strong>{t('BUY')} :</strong> {bundle.buying_price} {user_info.currency_preference_code}
                            </H6>
                          </Grid>
                        </Grid>
                      </Box>
    
    
    
                    </Card>
                  </Paper>
                  
    
                </Grid>
              ))}
            </Grid>
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
     

      {/* Modal for PIN */}
      <Modal open={isModalOpen} onClose={handleCloseModal} dir={isRtl?'rtl':'ltr'}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>{t('CONFIRM_YOUR_PIN')}</Typography>
          

          {/* Input Box */}
          <TextField
            fullWidth
            label={t('ENTER_YOUR_PIN')}
            variant="outlined"
            sx={{ mt: 2 }}
            onChange={(e)=>setPin(e.target.value)}
            inputProps={{
              maxLength: 4,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DialpadIcon />
                </InputAdornment>
              ),
            }}
          />

        {errorMessage && (
          <Typography variant="body2" color="error" sx={{ mt: 1,mb:1 }}>
            {t('INCORRECT_PIN')}
          </Typography>
        )}
          {/* Buttons */}
          {loading? (
            <Box 
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%", // or a fixed height if needed
              mt: 3
            }}
            >
            <CircularProgress />
          </Box>
          ):(
            <Box
            sx={{ 
              display: "flex", 
              justifyContent: isRtl ? "space-between" : "space-between", // Adjusted based on direction
              mt: 3,
              flexDirection: isRtl ? "row-reverse" : "row" // Reverse the order of buttons in RTL
            }}
            dir={isRtl ? "rtl" : "ltr"}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCloseModal}
            >
              {t('CANCEL')}
            </Button>
          
            <Button
              variant="contained"
              color="primary"
              onClick={checkPIN}
            >
              {t('VERIFY')}
            </Button>
          </Box>
          )}
          
        </Box>
      </Modal>
      <ToastContainer/>
    </Card>
  
  );
}

