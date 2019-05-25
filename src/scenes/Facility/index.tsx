import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleFacilityFilter } from "../../services/redux/actions/ui";
import Facility from "./Facility";

export class index extends Component<Props> {
  render() {
    const { drawerOpen, toggleFacilityFilter, facilities } = this.props;
    return (
      <Facility
        drawerOpen={drawerOpen}
        onToggleDrawer={toggleFacilityFilter}
        facilities={facilities}
      />
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    drawerOpen: state.ui.advancedSearchOpen,
    facilities: state.facilities.list
  };
};

type Props = {
  drawerOpen: boolean;
  toggleFacilityFilter: Function;
  facilities: Array<any>;
};
export default connect(
  mapStateToProps,
  { toggleFacilityFilter }
)(index);
