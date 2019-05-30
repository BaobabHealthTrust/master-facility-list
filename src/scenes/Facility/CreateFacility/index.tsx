import React, { Component } from "react";
import { connect } from "react-redux";
import CreateFacility from "./CreateFacility";
import { fetchOwners } from "../../../services/redux/actions/dependancies";
export class index extends Component<Props> {
  formSections = [
    "Basic Details",
    "Contacts & Location",
    "Resources",
    "Utilities",
    "Services"
  ];

  componentDidMount() {
    if (this.props.dependancies.owners.list.length == 0) {
      this.props.fetchOwners();
    }
  }
  onSubmit = () => {
    alert("submitted");
  };

  render() {
    return (
      <CreateFacility
        sections={this.formSections}
        active="Basic Details"
        onSubmit={this.onSubmit}
        dependancies={this.props.dependancies}
      />
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    drawerOpen: state.ui.advancedSearchOpen,
    facilities: state.facilities.list,
    dependancies: state.dependancies
  };
};

type Props = {
  drawerOpen: boolean;
  toggleFacilityFilter: Function;
  facilities: Array<any>;
  dependancies: any;
  fetchOwners: Function;
};
export default connect(
  mapStateToProps,
  { fetchOwners }
)(index);
