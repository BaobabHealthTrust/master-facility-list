import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Dropdown, NavItem, Button, Icon } from "react-materialize";
import { Redirect } from 'react-router-dom';

class Menu extends Component {

  state = {
    activePage: "home",
    isLoggenIn: true,
  }

  logout = async (e) => {
    e.preventDefault()
    await sessionStorage.removeItem('token');
    this.setState({ isLoggenIn: false })
  }

  setClassName = (page: string) => this.state.activePage == page ? "active" : ""

  navigateTo = (activePage: string) => this.setState({ activePage })

  renderMenuItem = (page: string, url: string) => (
    <li className={this.setClassName(page)}>
      <Link to={url} onClick={() => this.navigateTo(page)}>
        {page.toUpperCase()}
      </Link>
    </li>
  )

  renderLogout = () => {
    const username = sessionStorage.getItem('firstname')
    console.log(username)
    return (
      <Dropdown style={{ marginTop: 65 }} trigger={
        <li>
          <a className="flex">
            <Icon className="mr-2">account_circle</Icon>
            {username}
          </a>
        </li>
      }>
        <NavItem onClick={this.logout}>Logout</NavItem>
      </Dropdown>
    )
  }

  isAdminUser = () => sessionStorage.getItem("token")

  renderMenu = () => (
    <React.Fragment>
      {this.renderMenuItem("home", "/")}
      {this.renderMenuItem("about", "/about")}
      {this.renderMenuItem("facilities", "/facilities")}
      {this.isAdminUser() && this.renderMenuItem("users", "/users")}
      {this.renderMenuItem("feedback", "/feedback")}
      {
        this.isAdminUser()
          ? this.renderLogout()
          : this.renderMenuItem("login", "/login")
      }
    </React.Fragment>
  )

  // TODO: Menu Active States should read from url
  render() {
    if (!this.state.isLoggenIn) return <Redirect to="/" />
    else return (
      <div>
        <ul id="nav-mobile" className="right mfl-pr-10 hide-on-med-and-down">
          {this.renderMenu()}
        </ul>
        <ul class="side-nav" id="mobile-demo">
          {this.renderMenu()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userDetails: state.authReducer.userDetails
  };
};

export default connect(mapStateToProps, {})(Menu);
