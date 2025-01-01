import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import * as serviceWorker from "./serviceWorker";
import App from "./app/App";
import { Provider } from 'react-redux'
import store from './app/redux/store'

// third party style
import "perfect-scrollbar/css/perfect-scrollbar.css";
import i18next from 'i18next'
import {initReactI18next} from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

const languageDirectionMap = {
  ar: 'rtl',
  fa: 'rtl',
  ps: 'rtl',
  en: 'ltr', // Default direction
  bn: 'ltr',
  tr: 'ltr',
  ge: 'ltr',
  hi: 'ltr',
};

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'ar','fa','bn','tr','ps','ge','hi'],
    fallbackLng: 'en',
    debug: false,
    // Options for language detector
    detection: {
      order: ['path', 'cookie', 'htmlTag'],
      caches: ['cookie'],
    },
    backend: {
      // Use your API endpoint to load the language translations
      loadPath: 'https://app-pn-api-v1-2024.pamirnet.com/api/locale/{{lng}}',
      parse: (data) => {
        const parsedData = JSON.parse(data);
        //console.log(parsedData.language_data)
        // If the API returns 'language_data' nested under 'language_data', return that
        return parsedData.language_data || parsedData;
      },
    },
  });

  i18next.on('languageChanged', (lng) => {
    const direction = languageDirectionMap[lng] || 'ltr';
    document.documentElement.setAttribute('dir', direction);
  });

const initialDirection = languageDirectionMap[i18next.language] || 'ltr';
document.documentElement.setAttribute('dir', initialDirection);

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  
);


