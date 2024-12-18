import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

import { Span } from "./Typography";
import { MatxLogo } from "app/components";
import useSettings from "app/hooks/useSettings";
import { useTranslation } from "react-i18next";

// STYLED COMPONENTS
const BrandRoot = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px 18px 20px 29px"
}));

const StyledSpan = styled(Span)(({ mode }) => ({
  fontSize: 18,
  marginLeft: ".5rem",
  display: mode === "compact" ? "none" : "block",
}));

export default function Brand({ children }) {
  const { settings } = useSettings();
  const leftSidebar = settings.layout1Settings.leftSidebar;
  const { mode } = leftSidebar;
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar" || i18n.language === "fa" || i18n.language === "ps"; // Check RTL


  return (
    <BrandRoot>
      <Box display="flex" alignItems="center">
        {/* <MatxLogo /> */}
        <img src="/assets/images/telecom/pamir_telecom.jpeg" alt="My Logo" style={{ height: "40px" }} />
        <Link to="/dashboard/default" style={{ textDecoration: "none" }}>
          <StyledSpan mode={mode} className="sidenavHoverShow" sx={{ mr: isRtl ? "0.5rem" : "0", ml: isRtl ? "0" : "0.5rem" }}>
          Pamir Net
          </StyledSpan>
        </Link>
      </Box>

      {/* <Box className="sidenavHoverShow" sx={{ display: mode === "compact" ? "none" : "block" }}>
        {children || null}
      </Box> */}
    </BrandRoot>
  );
}
