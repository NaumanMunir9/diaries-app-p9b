// libraires
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// App
import App from "./app/App";

// styles
import "./index.css";

// redux store
import store from "./store";

// service worker
import * as serviceWorker from "./serviceWorker";

// mirage/server
import { setupServer } from "./services/mirage/server";

if (process.env.NODE_ENV === "development") {
  setupServer();
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
