import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./locales/resources";

const LANGUAGE_STORAGE_KEY = "portfolio-language";
const supportedLanguages = ["en", "ru", "uz"] as const;

type SupportedLanguage = (typeof supportedLanguages)[number];

function getInitialLanguage(): SupportedLanguage {
  if (typeof window === "undefined") {
    return "en";
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (storedLanguage && supportedLanguages.includes(storedLanguage as SupportedLanguage)) {
    return storedLanguage as SupportedLanguage;
  }

  const browserLanguage = window.navigator.language.toLowerCase();
  if (browserLanguage.startsWith("ru")) {
    return "ru";
  }

  if (browserLanguage.startsWith("uz")) {
    return "uz";
  }

  return "en";
}

void i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: "en",
  supportedLngs: [...supportedLanguages],
  interpolation: {
    escapeValue: false,
  },
});

if (typeof window !== "undefined") {
  document.documentElement.lang = i18n.language;

  i18n.on("languageChanged", (language) => {
    document.documentElement.lang = language;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  });
}

export default i18n;
