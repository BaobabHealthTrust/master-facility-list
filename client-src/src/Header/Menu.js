import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { resetUserDetails } from "../actions";
import { Dropdown, NavItem, Button, Icon, Divider } from "react-materialize";
import { Redirect } from "react-router-dom";

class Menu extends Component {
  state = {
    activePage: "",
    redirect: false
  };

  logout = async e => {
    e.preventDefault();
    await sessionStorage.removeItem("token");
    await sessionStorage.removeItem("firstname");
    await sessionStorage.removeItem("user");
    this.props.resetUserDetails();
    this.setState({ redirect: true });
  };

  setClassName = (page: string) => {
    const windowLocation = window.location.href.split("/")[3];
    const url = windowLocation || "home";
    return this.state.activePage == page || url == page ? "active" : "";
  };

  navigateTo = (activePage: string) =>
    this.setState({ activePage, redirect: false });

  renderMenuItem = (page: string, url: string) => (
    <li className={this.setClassName(page)}>
      <Link to={url} onClick={() => this.navigateTo(page)}>
        {page.toUpperCase()}
      </Link>
    </li>
  );

  renderLogout = () => {
    const username = this.props.userDetails
      ? this.props.userDetails.firstname
      : "";
    return (
      <Dropdown
        style={{ marginTop: 65 }}
        trigger={
          <li>
            <a className="flex" style={{ alignItems: "center" }}>
              <Icon className="mr-2">account_circle</Icon>
              {username}
              <Icon className="mr-2">arrow_drop_down</Icon>
            </a>
          </li>
        }
      >
        <NavItem onClick={this.logout}>Logout</NavItem>
      </Dropdown>
    );
  };

  renderMore = () => {
    let className =
      this.setClassName("feedback") == "active" ||
      this.setClassName("help") == "active" ||
      this.setClassName("about") == "active"
        ? "active"
        : "";
    return (
      <Dropdown
        style={{ marginTop: 65 }}
        trigger={
          <li className={className}>
            <a className="flex" style={{ alignItems: "center" }}>
              MORE
              <Icon className="mr-2">arrow_drop_down</Icon>
            </a>
          </li>
        }
      >
        <li>
          <Link to="/about" onClick={() => this.navigateTo("about")}>
            About
          </Link>
        </li>
        <li>
          <Link to="/feedback" onClick={() => this.navigateTo("feedback")}>
            Feedback
          </Link>
        </li>
        <li>
          <Link to="/help" onClick={() => this.navigateTo("help")}>
            Help
          </Link>
        </li>
      </Dropdown>
    );
  };

  isAdminUser = () => this.props.userDetails.token;
  isLoggedIn = () => this.props.userDetails.token;

  renderMenu = () => (
    <React.Fragment>
      {this.renderMenuItem("home", "/")}
      {this.renderMenuItem("facilities", "/facilities")}
      {this.isAdminUser() && this.renderMenuItem("users", "/users")}
      {this.renderMore()}
      {this.isLoggedIn()
        ? this.renderLogout()
        : this.renderMenuItem("login", "/login")}
    </React.Fragment>
  );

  redirect = () => {
    this.navigateTo("home");
    return <Redirect to="/" />;
  };
  // TODO: Menu Active States should read from url
  render() {
    return (
      <React.Fragment>
        {this.state.redirect && this.redirect()}
        <div>
          <ul id="nav-mobile" className="right mfl-pr-10  hide-on-med-and-down">
            {this.renderMenu()}
          </ul>
          <ul className="side-nav" id="mobile-demo">
            {this.renderMenu()}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userDetails: state.users.loggedInUser
  };
};

export default connect(
  mapStateToProps,
  { resetUserDetails }
)(Menu);
