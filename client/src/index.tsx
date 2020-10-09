import React from "react";
import ReactDOM from "react-dom";
import "./App/index.css";
import App from "./App/App";
// @ts-ignore
import { Provider } from "react-redux";
import ReactGA from "react-ga";
import Store from "./services/redux/store";
import { createBrowserHistory } from "history";

const history: any = createBrowserHistory();
const trackingId = "UA-128959156-4"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId, { gaOptions: { siteSpeedSampleRate: 100 } });

// Initialize google analytics page view tracking
history.listen((location: any) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
