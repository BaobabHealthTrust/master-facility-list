import React from "react";
import { Switch } from "react-router-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Header, Footer } from "../components/organisms";
import Content from "../components/organisms/Content";
import Dashboard from "../scenes/Dashboard";
import Facilities from "../scenes/Facility";
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
  dispatchDependancyError
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
    fetchFacilities
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
  return (
    <>
      <Header />
      <Content>
        <Router>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/Facilities" component={Facilities} />
          </Switch>
        </Router>
      </Content>
      <Footer />
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
    fetchFacilities
  }
)(App);
