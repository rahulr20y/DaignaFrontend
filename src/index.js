import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable";
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import WebPage from "./routes/Router";
import { Provider } from "react-redux";
import store from "./redux/store";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

// import i18n (needs to be bundled ;))
import "./i18n";

// CSS
import("bootstrap-icons/font/bootstrap-icons.css");
import("dropify/dist/css/dropify.min.css");
import("./scss/app.scss");

// SCRIPTS
import("dropify/dist/js/dropify.js");
import("node-waves/dist/waves.min.js").then(() => {
  window.Waves.init();
});

let persistor = persistStore(store);
window.debounceTimer = null;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <WebPage />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
