import { Fragment, useEffect, useState } from "react";
import { Card, Grid, styled, useTheme, Avatar, Typography, Fab, Icon, LinearProgress, Box, Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions, InputAdornment, IconButton } from "@mui/material";
import { dashboardData,changePIN } from '../../redux/actions/dashboardAction';
import { useDispatch, useSelector } from "react-redux";
import InformationCard from "./shared/InformationCard";
import { Breadcrumb } from "app/components";
import { useTranslation } from "react-i18next";
import DialpadIcon from '@mui/icons-material/Dialpad';
import { useNavigate } from "react-router-dom";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import DashboardCard from "../dashboard/shared/DashboardCard";


// STYLED COMPONENTS
const ContentBox = styled("div")(({ theme }) => ({
  padding: "10px 10px 10px 10px",
  [theme.breakpoints.down("sm")]: { margin: "8px" },
}));

const ParentCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  boxShadow: theme.shadows[5],
  borderRadius: '12px',
  maxWidth: '1200px',
  margin: 'auto',
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  borderRadius: '12px',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const ProfileDetails = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(1),
  width: '100%',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1rem',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(0.5),
}));

const InfoText = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const PageTitle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    fontSize: '1.5rem',
    fontWeight: 'bold',
  }));

  const StyledIconButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: "50%",
    padding: theme.spacing(1),
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
      transform: "scale(1.1)",
    },
    "&:active": {
      transform: "scale(0.95)",
      boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.2)",
    },
  }));

export default function Profile() {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const { information } = useSelector((state) => state.dashboardReducer);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar" || i18n.language === "fa" || i18n.language === "ps"; 


  const [openDialog, setOpenDialog] = useState(false);
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [validationError, setValidationError] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    dispatch(dashboardData());
  }, [dispatch]);

  // Check if information is available before rendering
  if (!information || !information.user_info) {
    return (
      <ContentBox sx={{justifyContent:"" ,alignItems:"center"}}>
        <Typography variant="h6" align="center" color="text.secondary">
          Loading profile information...
          <LinearProgress/>
        </Typography>
      </ContentBox>
    );
  }

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentPin("");
    setNewPin("") 
    setValidationError(null)
  };



  const handlePinSubmit = () => {
    if(currentPin=="" || newPin==""){
      setValidationError(t('ENTER_YOUR_PIN'))
      return;
    }
    setValidationError(null)
    dispatch(changePIN(currentPin,newPin))
    handleCloseDialog();
  };


  const handleBack = () => {
    navigate(-1);  // Go back to the previous page
  };



  return (
    <Fragment >
      <ContentBox>
      <Box className="breadcrumb" display="flex" alignItems="center">
      <IconButton onClick={handleBack} color="primary">
            {isRtl?<ArrowForward/>:<ArrowBack/>}
        </IconButton>
        <Breadcrumb routeSegments={[ { name: t('PROFILE') }]} />
      </Box>
        <ParentCard>
        <PageTitle>{t('PERSONAL_INFO')}</PageTitle>
          <Grid container spacing={3} >
            <Grid item lg={4} md={4} sm={12} xs={12} dir={isRtl?'rtl':'ltr'}>
              <ProfileCard sx={{marginTop:"-20px"}}>
                <Avatar
                  alt={information.user_info.reseller_name}
                  src={information.user_info.profile_image_url}
                  sx={{ width: 100, height: 100, border: `3px solid ${palette.primary.main}`, marginBottom: 2 }}
                />
                <ProfileDetails>
                  <Title>Reseller Name :</Title>
                  <InfoText>{information.user_info.reseller_name}</InfoText>
                  <Title>{t('CONTACT_NAME')} :</Title>
                  <InfoText>{information.user_info.contact_name}</InfoText>
                  <Title>{t('PHONE')} :</Title>
                  <InfoText>{information.user_info.phone}</InfoText>
                  <Title>{t('EMAIL')} :</Title>
                  <InfoText>{information.user_info.email}</InfoText>
                </ProfileDetails>
                <Fab variant="extended" sx={{ marginTop: 2 }} onClick={handleOpenDialog}>
                  <Icon sx={{ mr: 1 }}>edit</Icon>
                  {t('CHANGE_PIN')}
                </Fab>
              </ProfileCard>
            </Grid>

            <Grid item lg={8} md={8} sm={12} xs={12}>
              <InformationCard />
              {/* <DashboardCard/> */}
            </Grid>
          </Grid>
        </ParentCard>

        {/* Change PIN Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} dir={isRtl?'rtl':'ltr'}>
          <DialogTitle>{t('CHANGE_PIN')}</DialogTitle>
          <DialogContent>
            <Box>
              <TextField
                label={t('ENTER_YOUR_OLD_PIN')}
                type="password"
                fullWidth
                margin="dense"
                variant="outlined"
                value={currentPin}
                onChange={(e)=>setCurrentPin(e.target.value)}
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
              <TextField
                label={t('ENTER_YOUR_NEW_PIN')}
                type="password"
                fullWidth
                margin="dense"
                variant="outlined"
                value={newPin}
                onChange={(e)=>setNewPin(e.target.value)}
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
            </Box>
            {validationError && (
            <p style={{ color: "red" }}>{validationError}</p>
          )}
          </DialogContent>
          <DialogActions sx={{ justifyContent: isRtl ? 'flex-start' : 'flex-end' }}>
            <Button sx={{marginLeft: isRtl ? '16px' : '0',
              marginRight: isRtl ? '0' : '16px'}} onClick={handleCloseDialog} variant="contained" color="secondary">
              {t('CANCEL')} 
            </Button>
            <Button onClick={handlePinSubmit} variant="contained" color="primary">
              {t('SUBMIT')}
            </Button>
          </DialogActions>
        </Dialog>
      </ContentBox>
    </Fragment>
  );
}
