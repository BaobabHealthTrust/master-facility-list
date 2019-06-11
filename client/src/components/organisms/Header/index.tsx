import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import {
  setActivePage,
  toggleSearch
} from "../../../services/redux/actions/ui";
import { setQuickSearchValue } from "../../../services/redux/actions/facilities";
import { userLogout } from "../../../services/redux/actions/users";
// @ts-ignore
import { split } from "lodash";
import { withRouter, RouteComponentProps } from "react-router-dom";

export class index extends Component<Props & RouteComponentProps<{}>> {
  componentDidMount() {
    const urlArr = split(window.location.pathname, "/");
    const page = urlArr[1] ? urlArr[1] : "Home";
    this.props.setActivePage(page);
  }

  onClickSearchItem = (facility: any) => {
    this.props.history.push(`/facilities/${facility.id}`);
    this.props.setActivePage("facilities");
    this.props.toggleSearch();
  };

  render() {
    return (
      <Header
        logout={this.props.userLogout}
        auth={this.props.auth}
        activePage={this.props.activePage}
        onClickSearchItem={this.onClickSearchItem}
        onSearchValueChange={this.props.setQuickSearchValue}
        toggleSearch={this.props.toggleSearch}
        searchOpen={this.props.searchOpen}
      />
    );
  }
}

type Props = {
  activePage: string;
  setActivePage: Function;
  userLogout: Function;
  auth: any;
  history: any;
  setQuickSearchValue: Function;
  toggleSearch: Function;
  searchOpen: boolean;
};
const mapStateToProps = (state: any) => ({
  activePage: state.ui.activePage,
  auth: state.users.currentUser,
  searchOpen: state.ui.searchOpen
});
export default withRouter(
  connect(
    mapStateToProps,
    { setActivePage, userLogout, setQuickSearchValue, toggleSearch }
  )(index)
);
