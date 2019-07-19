import React from "react";
import ReactDOM from "react-dom";
import "./App/index.css";
import App from "./App/App";
// @ts-ignore
import { Provider } from "react-redux";
import Store from "./services/redux/store";

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
