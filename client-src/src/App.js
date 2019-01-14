import React, { Component } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Facilities from "./Facility";
import { Route, Switch } from "react-router-dom";
import ShowFacility from "./Facility/Show";
import Dashboard from "./Dashboard/DashboardHome";
import MflAbout from "./common/MflAbout";
import Footer from "./common/Footer";
import MflLogin from "./common/MflLogin";
import MfLFeedback from "./common/MfLFeedback";
import Users from "./User";
import CreateFacility from "./Facility/Create";
import SearchModal from "./Facility/Search";
import { FetchAllDependancies } from "./common";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Loader } from "./common";

class App extends Component {
  state = {
    widthFlag: false
  };

  checkWindowWidith = () =>
    window.innerWidth <= 480
      ? this.setState({ widthFlag: true })
      : this.setState({ widthFlag: false });

  isRouteVisible = () =>
    !this.state.widthFlag && sessionStorage.getItem("token");

  componentDidMount() {
    window.addEventListener("resize", this.checkWindowWidith);
    this.checkWindowWidith();
    this.isRouteVisible();
  }

  render() {
    return (
      <React.Fragment>
        <FetchAllDependancies />
        {this.props.loading && <Loader />}
        {!this.props.loading && (
          <Router>
            <div className="mfl-page-wrap">
              <Navbar />
              <div className="content">
                <Switch>
                  <Route exact path="/facilities" component={Facilities} />
                  {this.isRouteVisible() && (
                    <Route
                      exact
                      path="/facilities/add"
                      component={CreateFacility}
                    />
                  )}
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
                  <Route exact path="/login" component={MflLogin} />
                  <Route exact path="/users" component={Users} />
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
