import React, { Component } from "react";
import "./App.css";
import Navbar from "./Navbar";
import FacilitiesHome from "./Facility/FacilitiesHome";
import { Route, Switch } from "react-router-dom";
import FacilityDetails from "./Facility/FacilityDetails";
import Dashboard from "./Dashboard/DashboardHome";

class App extends Component {
    render() {
        return (
            <div>
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
                </Switch>
            </div>
        );
    }
}

export default App;
