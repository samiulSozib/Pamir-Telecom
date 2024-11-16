import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  styled,
  Typography
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { getCountries, getDistricts, getProvinces } from '../../../redux/actions/locationAction'
import { addSubReseller,clearMessages } from '../../../redux/actions/subResellerAction'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DialpadIcon from '@mui/icons-material/Dialpad';
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";


const TextField = styled(TextValidator)(({ isRtl }) => ({
  width: "100%",
  marginBottom: "16px",
  ...(isRtl && {
    textAlign: "right",  // Align text to the right for RTL
    "& .MuiInputLabel-root": {
      textAlign: "right",  // Position label on the right for RTL
      transformOrigin: "right center", // Adjust the label position on focus
    },
    "& .MuiInput-root": {
      direction: "rtl", // Set text direction for input field
    },
  }),
}));

const AddForm = () => {
  const dispatch = useDispatch()
  const { countries, districts, provinces } = useSelector((state) => state.locationReducer)
  const {error,message,loading} =useSelector((state)=>state.subResellerListReducer)
  const { user_info } = useSelector((state) => state.auth)
  const [state, setState] = useState({ currency_preference_id: user_info.currency_preference_id });
  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null)
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [errorMessage,setErrorMessage]=useState("")

  const isRtl = i18n.language === "ar" || i18n.language === "fa" || i18n.language === "ps"; // Check RTL

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("reseller_name", state.reseller_name)
    formData.append("contact_name", state.contact_name)
    formData.append("email", state.email)
    formData.append("phone", state.phone)
    formData.append("country_id", state.country_id)
    formData.append("province_id", state.province_id)
    formData.append("districts_id", state.districts_id)
    formData.append("currency_preference_id", state.currency_preference_id)

    if (imageFile) {
      formData.append("profile_image_url", imageFile);
    }

    dispatch(addSubReseller(formData))
  };

  useEffect(() => {
    if ( message|| error) {
      console.log(message)
      console.log(error)
      if(message){
        Swal.fire({
          title: "Good job!",
          text: message,
          icon: "success"
        });
        dispatch(clearMessages())
        setState({
              reseller_name: "",
              contact_name: "",
              email: "",
              phone: "",
              country_id: "",
              province_id: "",
              districts_id: "",
              currency_preference_id: user_info.currency_preference_id,
            });
        
            setProfileImage(null);
            setImageFile(null);
            navigate("/sub-reseller/default")
      }
      if(error){
        setErrorMessage(error)
        dispatch(clearMessages())
      }
    }
  }, [message, error, dispatch,navigate,user_info.currency_preference_id]);





  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setImageFile(file)
    }
  };

  const {
    reseller_name,
    contact_name,
    email,
    phone,
    country_id,
    province_id,
    districts_id,
    currency_preference_id
  } = state;

  useEffect(() => {
    dispatch(getCountries())
    dispatch(getDistricts())
    dispatch(getProvinces())
  }, [dispatch])

  return (
    <div >
      <ValidatorForm onSubmit={handleSubmit} onError={() => null} dir={isRtl?'rtl':'ltr'}>
        <Grid container justifyContent="center" sx={{ mb: 4 }}>
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile Preview"
              style={{ width: 100, height: 100, borderRadius: "50%" }}
            />
          ) : (
            <Button
              variant="outlined"
              component="label"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <Avatar
                  src={profileImage}
                  alt="Profile Preview"
                  sx={{ width: 100, height: 100 }}
                />
                {!profileImage && (
                  <Icon
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontSize: 24,
                      color: "primary.main",
                    }}
                  >
                    add
                  </Icon>
                )}
              </Box>
              <input
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </Button>
          )}
        </Grid>

        <Grid container spacing={6} dir={isRtl?'rtl':'ltr'}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
            
              isRtl={isRtl} // Pass the isRtl value to TextField
              type="text"
              name="reseller_name"
              id="standard-basic"
              value={reseller_name || ""}
              onChange={handleChange}
              errorMessages={["this field is required"]}
              label={t('SUB_RESELLER')}
              validators={["required", "minStringLength: 4"]}
            />

            <TextField
              isRtl={isRtl}
              type="text"
              name="contact_name"
              label={t('CONTACT_NAME')}
              onChange={handleChange}
              value={contact_name || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            <TextField
              isRtl={isRtl}
              type="email"
              name="email"
              label={t('EMAIL')}
              value={email || ""}
              onChange={handleChange}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
            />

            <TextField
              isRtl={isRtl}
              sx={{ mb: 4 }}
              type="number"
              name="phone"
              label={t('PHONE_NUMBER')}
              onChange={handleChange}
              value={phone || ""}
              errorMessages={["this field is required"]}
              validators={["required"]}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DialpadIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              isRtl={isRtl}
              select
              label={t('COUNTRY')}
              name="country_id"
              value={country_id || ""}
              onChange={handleChange}
              displayEmpty
              fullWidth
              sx={{ mb: "16px" }}
            >
              <MenuItem value="">Select Country</MenuItem>
              {countries.map((country, index) => (
                <MenuItem key={index} value={country.id}>
                  <img
                    src={country.country_flag_image_url}
                    alt={`${country.country_name} flag`}
                    style={{ width: 24, height: 16, marginRight: 8, objectFit: "cover" }}
                  />
                  {country.country_name}</MenuItem>
              ))}
            </TextField>

            <TextField
              isRtl={isRtl}
              select
              label={t('PROVINCE')}
              name="province_id"
              value={province_id || ""}
              onChange={handleChange}
              fullWidth
              sx={{ mb: "16px" }}
            >
              <MenuItem value="">
                <em>Select Province</em>
              </MenuItem>
              {provinces.map((province, index) => (
                <MenuItem key={index} value={province.id}>
                  {province.province_name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              isRtl={isRtl}
              select
              label={t('DISTRICT')}
              name="districts_id"
              value={districts_id || ""}
              onChange={handleChange}
              displayEmpty
              fullWidth
              sx={{ mb: "16px" }}
            >
              <MenuItem value="">Select District</MenuItem>
              {districts.map((district, index) => (
                <MenuItem key={index} value={district.id}>{district.district_name}</MenuItem>
              ))}
            </TextField>

            <TextField
              isRtl={isRtl}
              select
              label={t('CURRENCY_PREFERENCE')}
              name="currency_preference_id"
              value={currency_preference_id || user_info.currency_preference_id}
              onChange={handleChange}
              displayEmpty
              fullWidth
              sx={{ mb: "16px" }}
            >
              <MenuItem value={user_info.currency_preference_id}>{user_info.currency_preference_code}</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {errorMessage && (
          <Typography variant="body2" color="error" sx={{ mt: 1,mb:1 }}>
            {errorMessage}
          </Typography>
        )}

        <Button color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>{t('ADD_NOW')}</Span>
        </Button>
        
      </ValidatorForm>
      
    </div>
  );
};

export default AddForm;
