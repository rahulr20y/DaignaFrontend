import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import Backend from "i18next-http-backend";
import eng from "./assets/translations/en.json";
import hin from "./assets/translations/hi.json";
import guj from "./assets/translations/gj.json";
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
//console.log(eng);

const resources = {
  en: {
    translation: eng,
  },
  hi: {
    translation: hin,
  },
  gj: {
    translation: guj,
  },
};

i18n
  //.use(HttpApi)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    fallbackLng: "en", //when specified language translations not present then fallbacklang translations loaded.
    debug: true,
    // backend: {
    //   loadPath: "./assets/translations/{{lng}}.json",
    // },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

/*i18n.use(Backend).init({
  backend: {
    // for all available options read the backend's repository readme file
    loadPath: "./assets/translations/{{lng}}.json",
  },
});*/

export default i18n;
