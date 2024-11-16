import { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  styled,
  Avatar,
  Hidden,
  useTheme,
  MenuItem,
  IconButton,
  useMediaQuery,
  Select,
  FormControl,
  InputLabel
} from "@mui/material";

import useSettings from "app/hooks/useSettings";
import { H3, Span } from "app/components/Typography";
import { MatxMenu } from "app/components";
import { themeShadows } from "app/components/MatxTheme/themeColors";
import { topBarHeight } from "app/utils/constant";
import { Home, Menu, Person, PowerSettingsNew } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../../redux/actions/authAction';
import {getLanguages} from '../../../redux/actions/locationAction'
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import Swal from "sweetalert2";

// STYLED COMPONENTS
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary
}));

const TopbarRoot = styled("div")({
  top: 0,
  zIndex: 96,
  height: topBarHeight,
  boxShadow: themeShadows[8],
  transition: "all 0.3s ease"
});

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: "8px",
  paddingLeft: 18,
  paddingRight: 20,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: { paddingLeft: 16, paddingRight: 16 },
  [theme.breakpoints.down("xs")]: { paddingLeft: 14, paddingRight: 16 }
}));

const UserMenu = styled(Box)({
  padding: 4,
  display: "flex",
  borderRadius: 24,
  cursor: "pointer",
  alignItems: "center",
  "& span": { margin: "0 8px" }
});

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 185,
  "& a": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none"
  },
  "& span": { marginRight: "10px", color: theme.palette.text.primary }
}));

const Layout1Topbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const { user_info } = useSelector((state) => state.auth);
  const {languages}=useSelector((state)=>state.locationReducer)
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({ layout1Settings: { leftSidebar: { ...sidebarSettings } } });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    updateSidebarMode({ mode });
  };

  const handleLogout = () => {
    
    Swal.fire({
      title: t('DO_YOU_WANT_TO_LOGOUT'),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t('YES'),
      cancelButtonText: t('CANCEL'),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
      }
    });
  };

  const handleProfile = () => {
    navigate("/profile/default");
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage)
    // Additional logic for changing language can be added here
  };

  useEffect(()=>{
    dispatch(getLanguages())
  },[dispatch])

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            <Menu />
          </StyledIconButton>
        </Box>

        <Box display="flex" alignItems="center">
          <MatxMenu
            menuButton={
              <UserMenu>
                <Hidden xsDown>
                  <Span>
                    <strong>{user_info.name}</strong>
                  </Span>
                </Hidden>
                <Avatar src="/assets/images/avatars/001-man.svg" sx={{ cursor: "pointer" }} />
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to="/">
                <Home sx={{ color: "green" }}/>
                <Span>{t('HOME')}</Span>
              </Link>
            </StyledItem>

            <StyledItem onClick={handleProfile}>
              <Person sx={{ color: "blue" }}/>
              <Span>{t('PROFILE')}</Span>
            </StyledItem>

            <StyledItem>
              <FormControl fullWidth>
                <InputLabel>{t('CHANGE_LANGUAGE')}</InputLabel>
                <Select
                  value={language}
                  label="Language"
                  onChange={handleLanguageChange}
                >
                  {languages.map((language,index)=>(
                <MenuItem key={index} value={language.language_code}>
                  
                  {language.language_name}</MenuItem>
              ))}
                </Select>
              </FormControl>
            </StyledItem>

            <StyledItem onClick={handleLogout}>
              <PowerSettingsNew sx={{ color: "red" }}/>
              <Span>{t('LOG_OUT')}</Span>
            </StyledItem>
          </MatxMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default memo(Layout1Topbar);
