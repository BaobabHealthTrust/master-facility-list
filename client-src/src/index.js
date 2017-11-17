import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
ReactDOM.render(
	
		<Router>
			<App />
		</Router>,
	document.getElementById("root")
);
registerServiceWorker();
