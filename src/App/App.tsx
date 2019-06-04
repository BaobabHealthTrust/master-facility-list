import React from "react";
import { Switch } from "react-router-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Header, Footer } from "../components/organisms";
import Content from "../components/organisms/Content";
import Dashboard from "../scenes/Dashboard";
import Facilities from "../scenes/Facility";
import AddFacility from "../scenes/Facility/CreateFacility";
import ViewFacility from "../scenes/Facility/ViewFacility";
import UpdateFacility from "../scenes/Facility/UpdateFacility";
import UserLogin from "../scenes/Login";
import Users from "../scenes/Users";
import { connect } from "react-redux";
import {
  fetchUtilities,
  fetchUtilityTypes,
  fetchServiceTypes,
  fetchServices,
  fetchResources,
  fetchResourceTypes,
  fetchRegulatoryStatuses,
  fetchDistricts,
  fetchOperationalStatuses,
  dispatchDependancyError,
  fetchFacilityTypes
} from "../services/redux/actions/dependancies";
import { fetchFacilities } from "../services/redux/actions/facilities";

const App: React.FC = (props: any) => {
  const {
    fetchUtilities,
    fetchUtilityTypes,
    fetchServiceTypes,
    fetchServices,
    fetchResources,
    fetchResourceTypes,
    fetchRegulatoryStatuses,
    fetchDistricts,
    fetchOperationalStatuses,
    dispatchDependancyError,
    fetchFacilities,
    fetchFacilityTypes
  } = props;

  fetchUtilities().catch(() => {
    dispatchDependancyError();
  });

  fetchUtilityTypes().catch(() => {
    dispatchDependancyError();
  });

  fetchServices().catch(() => {
    dispatchDependancyError();
  });

  fetchServiceTypes().catch(() => {
    dispatchDependancyError();
  });

  fetchResources().catch(() => {
    dispatchDependancyError();
  });

  fetchResourceTypes().catch(() => {
    dispatchDependancyError();
  });

  fetchRegulatoryStatuses().catch(() => {
    dispatchDependancyError();
  });

  fetchOperationalStatuses().catch(() => {
    dispatchDependancyError();
  });

  fetchDistricts().catch(() => {
    dispatchDependancyError();
  });

  fetchFacilities().catch(() => {});

  fetchFacilityTypes().catch(() => {});

  return (
    <>
      <Router>
        <Header />
        <Content>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/Facilities" component={Facilities} />
            <Route exact path="/Facilities/add" component={AddFacility} />
            <Route exact path="/Facilities/:id" component={ViewFacility} />
            <Route
              exact
              path="/Facilities/:id/:page"
              component={ViewFacility}
            />
            <Route
              exact
              path="/Facilities/:id/:page/edit"
              component={UpdateFacility}
            />
            <Route exact path="/login" component={UserLogin} />
            <Route exact path="/users" component={Users} />
          </Switch>
        </Content>
        <Footer />
      </Router>
    </>
  );
};

export default connect(
  null,
  {
    fetchUtilities,
    fetchUtilityTypes,
    fetchServiceTypes,
    fetchServices,
    fetchResources,
    fetchResourceTypes,
    fetchRegulatoryStatuses,
    fetchDistricts,
    fetchOperationalStatuses,
    dispatchDependancyError,
    fetchFacilities,
    fetchFacilityTypes
  }
)(App);
