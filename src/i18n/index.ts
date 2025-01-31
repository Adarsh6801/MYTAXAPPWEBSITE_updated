import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./translations/en.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: "en",

    ns: ["translations"],
    defaultNS: "translations",

    react: {
      useSuspense: false,
    },

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

i18n.addResourceBundle("en", "translations", en);

export default i18n;
