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
import SendIcon from '@mui/icons-material/Send';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DialpadIcon from '@mui/icons-material/Dialpad';
import { Instagram, SportsBasketball, Twitter } from "@mui/icons-material";
import { useMemo } from "react";
import { H1, H3, H6, Paragraph, Span } from "app/components/Typography";
import { useLocation } from "react-router-dom";
import {getServices} from '../../../redux/actions/serviceAction'
import {getBundles} from '../../../redux/actions/bundleAction'
import {placeOrder,confirmPin,clearMessages, customRecharge} from '../../../redux/actions/rechargeAction'
import {getCountries} from '../../../redux/actions/locationAction'
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import PaginationTable from "./PaginationTable";


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





export default function Recharge() {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar" || i18n.language === "fa" || i18n.language === "ps";
  const [errorMessage,setErrorMessage]=useState("")


  


  const dispatch=useDispatch()
  const {serviceList}=useSelector((state)=>state.serviceListReducer)
  const [amount,setAmount]=useState("")
  const [countryId,setCountryId]=useState("9")
  const [number,setNumber]=useState("")
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [phoneNumberLength,setPhoneNumberLength]=useState("10")
  const { message,error, orderPlaced } = useSelector((state) => state.rechargeReducer);
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
    
    dispatch(getCountries())
  },[dispatch])




  

  useEffect(() => {
    const selectedCountry = countries.find(country => country.id === 9);
    
    if (selectedCountry) {
      
      setPhoneNumberLength(selectedCountry.phone_number_length)
    }

}, [ dispatch,countries,phoneNumberLength,countryId]);


  const handleNumberChange = (e) => {
    const value = e.target.value;
    setNumber(value);
    //console.log(value.length)
  
    if (value.length === 0) {
      setPhoneNumberError("");  // Clear error if input is empty
    } else if (value.length < parseInt(phoneNumberLength)) {
      setPhoneNumberError(`Number should be ${phoneNumberLength} digits.`);
    } else if (value.length === parseInt(phoneNumberLength)) {
      setPhoneNumberError("");  // Clear error if length is correct
    }

    // if (value.length >= 3) {
      
    //   const prefix = value.substring(0, 3);
    //   const matchedService = serviceList.find(service =>
    //     service.company.companycodes.some(code => prefix.startsWith(code.reserved_digit))
    //   );
  
    //   if (!matchedService) {
    //     setPhoneNumberError(t('INVALID_PHONE'));
    //   } else {
    //     setPhoneNumberError("");
    //     setCompanyId(matchedService.company.id);
    //   }
    // } else {
    //   setCompanyId("");
    // }
  };

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleRecharge=()=>{
    if (!number || !amount) {
      toast.error('Number and amount are required!');
      return;
    }
    Swal.fire({
          title: t('Confirm Recharge'),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: t('YES'),
          cancelButtonText: t('CANCEL'),
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(customRecharge(9,number,amount));
          }
        });
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
      }
      if(error){
        Swal.fire({
          title: "Failed!",
          text: message,
          icon: "fail"
        });
        dispatch(clearMessages())
        setErrorMessage(error)
        dispatch(clearMessages())
      }
      }
    },[dispatch,orderPlaced,error,message])

  

  return (
   
    <Card sx={{  mb: 3 }} dir={isRtl?'rtl':'ltr'} >
      {/* <CardHeader>
      
        <Title>{t('RECHARGE')}</Title>
        
      </CardHeader> */}

      <Paper elevation={5}>
        <Card  sx={{ pt: "10px", mb: 3}}>
          <CardHeader>
            <Grid container spacing={1} direction="row" justifyContent="space-between" alignItems="center" >
            {/* <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
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
                  {countries.map((country, index) => (
                    <Box sx={{
                      backgroundColor: countryId === country.id ? 'lightblue' : 'transparent', // Highlight selected
                      borderRadius: '10px',
                      padding: '2px',
                      transition: 'background-color 0.3s',
                    }}>
                      <Box sx={{ display: { xs: 'block', sm: 'none' } }} onClick={() => setCountryId(country.id)}> 
                      
                        <Avatar
                          src={country.country_flag_image_url}
                          alt={country.country_name}
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
                        onClick={() => setCountryId(country.id)}
                      >
                        <img
                          src={country.country_flag_image_url}
                          alt={country.country_name}
                          style={{ width: "70px", height: "70px", borderRadius:'50px',  padding: "2px" }}
                        />
                      </Card>
                    </Box>

                    </Box>
                  ))}
                </ImageListContainer>
                

              </Grid> */}
              
              <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
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
              <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                <TextField
                  margin="dense"
                  label={t('AMOUNT')}
                  size="small"
                  variant="outlined"
                  fullWidth // Use fullWidth to ensure it takes up the entire grid space
                  onChange={(e) => setAmount(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MonetizationOnIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                <Button
                  onClick={handleRecharge}
                  variant="contained"
                  endIcon={isRtl ? null : <SendIcon />} // Show icon at the end for LTR
                  startIcon={isRtl ? <SendIcon /> : null} // Show icon at the start for RTL
                  sx={{
                    textAlign: isRtl ? 'right' : 'left', // Adjust text alignment
                    direction: isRtl ? 'rtl' : 'ltr', // Set direction explicitly
                    gap: 1.5,
                  }}
                >
                  {t('RECHARGE')}
                </Button>
              </Grid>

              
            </Grid>
            
          </CardHeader>
        </Card>
        
      </Paper>


  
      
      <Box overflow="auto" dir={isRtl?'rtl':'ltr'}>
            <PaginationTable/>
      </Box>
     

    
      <ToastContainer/>
    </Card>
  
  );
}

