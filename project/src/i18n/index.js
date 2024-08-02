import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationsInEng from '../locales/en/translation.json';
import translationsInSlv from '../locales/sl/translation.json';
import translationsInRus from '../locales/ru/translation.json';

// the translations
const resources = {
  en: {
    translation: translationsInEng
  },
  sl: {
    translation: translationsInSlv
  },
  ru: {
    translation: translationsInRus
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources, // resources are important to load translations for the languages.
    lng: "ru", // It acts as default language. When the site loads, content is shown in this language.  
    debug: false,
    fallbackLng: "ru", // use de if selected language is not available
    interpolation: {
      escapeValue: false
    },
    ns: "translation", // namespaces help to divide huge translations into multiple small files.
    defaultNS: "translation"
  });

export default i18n;