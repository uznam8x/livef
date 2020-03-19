import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/app.scss";
import App from "./views/App";
//import reducer from "./store";
import * as serviceWorker from "./serviceWorker";
//import { createStore } from "redux";
//import { Provider } from "react-redux";
ReactDOM.render(
  <App />,
  document.getElementById("root")
);
serviceWorker.unregister();