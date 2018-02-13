import React, { Component } from "react";
import "./App.css";
import Navbar from "./Navbar";
import FacilitiesHome from "./Facility/FacilitiesHome";
import { Route, Switch } from "react-router-dom";
import FacilityDetails from "./Facility/FacilityDetails";
import Dashboard from "./Dashboard/DashboardHome";
import MflAbout from "./common/MflAbout";
import Footer from "./common/Footer";
import MflLogin from "./common/MflLogin";

class App extends Component {
    render() {
        return (
            <div className="mfl-page-wrap">
                <Navbar />
                <Switch>
                    <Route
                        exact
                        path="/facilities"
                        component={FacilitiesHome}
                    />
                    <Route path="/facilities/:id" component={FacilityDetails} />
                    <Route
                        exact
                        path="/"
                        component={Dashboard}
                    />
                    <Route
                        exact
                        path="/about"
                        component={MflAbout}
                    />
                    <Route
                        exact
                        path="/login"
                        component={MflLogin}
                    />
                </Switch>

                <Footer />
            </div >
        );
    }
}

export default App;
