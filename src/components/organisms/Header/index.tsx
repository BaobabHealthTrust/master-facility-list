import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { setActivePage } from "../../../services/redux/actions/ui";
// @ts-ignore
import { split } from "lodash";

export class index extends Component<Props> {
  componentDidMount() {
    const urlArr = split(window.location.pathname, "/");
    const page = urlArr[1] ? urlArr[1] : "Home";
    this.props.setActivePage(page);
  }
  render() {
    return <Header activePage={this.props.activePage} />;
  }
}

type Props = {
  activePage: string;
  setActivePage: Function;
};
const mapStateToProps = (state: any) => ({
  activePage: state.ui.activePage
});
export default connect(
  mapStateToProps,
  { setActivePage }
)(index);
