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
import MfLFeedback from "./common/MfLFeedback";
import { UsersHome } from './users';
import { AddFacilityHome } from "./Facility/AddFacility";
import SearchModal from "./Facility/SearchModal";
import { FetchAllDependancies } from "./common";
import { connect } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import { Loader } from './common'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <FetchAllDependancies />
        {this.props.loading && (<Loader />)}
        {
          !this.props.loading && (
            <Router>
              <div className="mfl-page-wrap">
                <Navbar />
                <div className="content">
                  <Switch>
                    <Route
                      exact
                      path="/facilities"
                      component={FacilitiesHome}
                    />
                    {
                      sessionStorage.getItem('token') && (
                        <Route
                          exact
                          path='/facilities/add'
                          component={AddFacilityHome}
                        />
                      )
                    }
                    <Route
                      exact
                      path='/facilities/search'
                      component={SearchModal}
                    />
                    <Route path="/facilities/:id/:sections" component={FacilityDetails} />
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
                      path="/feedback"
                      component={MfLFeedback}
                    />
                    <Route
                      exact
                      path="/login"
                      component={MflLogin}
                    />
                    <Route
                      exact
                      path="/users"
                      component={UsersHome}
                    />
                  </Switch>
                </div>
                <Footer />
              </div >
            </Router>
          )
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => {
  return {
    loading: store.dependancies.isLoading,
    networkError: store.dependancies.isNetworkError,
  };
};

export default connect(mapStateToProps, {})(App);
