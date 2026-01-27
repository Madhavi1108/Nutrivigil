import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import hi from "./locales/hi/translation.json";
import es from "./locales/es/translation.json";
import fr from "./locales/fr/translation.json";
import de from "./locales/de/translation.json";
import ar from "./locales/ar/translation.json";
import zh from "./locales/zh/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      es: { translation: es },
      fr: { translation: fr },
      de: { translation: de },
      ar: { translation: ar },
      zh: { translation: zh }
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

  i18n.on("languageChanged", (lng) => {
  const rtlLanguages = ["ar"];
  document.documentElement.dir = rtlLanguages.includes(lng) ? "rtl" : "ltr";
});


export default i18n;
