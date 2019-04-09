import React, { Component } from "react";
import "./App.css";
import Navbar from "./Navbar";
import FacilitiesPage from "./Facility";
import { Route, Switch } from "react-router-dom";
import ShowFacility from "./Facility/Show";
import Dashboard from "./Dashboard";
import MflAbout from "./common/MflAbout";
import Footer from "./common/Footer";
import LoginPage from "./Login";
import MfLFeedback from "./Feedback";
import Users from "./User";
import CreateFacility from "./Facility/Create";
import SearchModal from "./Facility/Search";
import { FetchAllDependancies } from "./common";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Loader } from "./common";
import styled from "styled-components";
import { timingSafeEqual } from "crypto";

class App extends Component {
  state = {
    widthFlag: false,
    minHeight: 0
  };

  isLoading = dependancyStatuses => {
    for (let dependancyStateId in dependancyStatuses) {
      if (dependancyStatuses[dependancyStateId] === true) return true;
    }
    return false;
  };

  checkWindowWidith = () =>
    window.innerWidth <= 480
      ? this.setState({ widthFlag: true })
      : this.setState({ widthFlag: false });

  isRouteVisible = () =>
    !this.state.widthFlag && sessionStorage.getItem("token");

  componentDidMount() {
    window.addEventListener("resize", this.checkWindowWidith);
    this.setState({ minHeight: window.innerHeight - 156 });
    this.checkWindowWidith();
    this.isRouteVisible();
  }

  render() {
    return (
      <React.Fragment>
        <FetchAllDependancies />
        {this.props.loading && this.isLoading(this.props.loading) && <Loader />}
        {this.props.loading &&
          !this.isLoading(this.props.loading) && (
            <Router>
              <div className="mfl-page-wrap">
                <Navbar />
                <div
                  className="content"
                  style={{ minHeight: this.state.minHeight }}
                >
                  <Switch>
                    <Route
                      exact
                      path="/facilities"
                      component={FacilitiesPage}
                    />
                    <Route
                      exact
                      path="/facilities/add"
                      component={CreateFacility}
                    />
                    <Route
                      exact
                      path="/facilities/search"
                      component={SearchModal}
                    />
                    <Route
                      path="/facilities/:id/:sections"
                      component={ShowFacility}
                    />
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/about" component={MflAbout} />
                    <Route exact path="/feedback" component={MfLFeedback} />
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/login" component={LoginPage} />
                  </Switch>
                </div>
                <Footer />
              </div>
            </Router>
          )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => {
  return {
    loading: store.dependancies.isLoading,
    networkError: store.dependancies.isNetworkError
  };
};

export default connect(
  mapStateToProps,
  {}
)(App);
