import { useRoutes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import { MatxTheme } from "./components";
// ALL CONTEXTS
import { AuthProvider } from "./contexts/JWTAuthContext";
import SettingsProvider from "./contexts/SettingsContext";

// ROUTES
import routes from "./routes";
// FAKE SERVER
import "../fake-db";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";



export default function App() {
  const content = useRoutes(routes);
  const { i18n } = useTranslation();

  useEffect(() => {
    const direction = i18n.language === "ar" || i18n.language === "fa" || i18n.language === "ps" ? "rtl" : "ltr";
    document.documentElement.dir = direction;

    // You may also set this as a data attribute on the body for further customization
    document.body.setAttribute("dir", direction);
  }, [i18n.language]);

  return (
          <SettingsProvider>
          <MatxTheme>
            <CssBaseline />
            {content}
          </MatxTheme>
        </SettingsProvider>
     
     
  );
}
