import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleFacilityFilter } from "../../services/redux/actions/ui";
import { fetchOwners } from "../../services/redux/actions/dependancies";
import Facility from "./Facility";

export class index extends Component<Props> {
  handleFacilityClick = (facilityId: number) => {
    this.props.history.push(`facilities/${facilityId}`);
  };
  componentDidMount() {
    if (this.props.owners.length == 0) {
      this.props.fetchOwners();
    }
  }
  render() {
    const { drawerOpen, toggleFacilityFilter, facilities } = this.props;
    return (
      <Facility
        onFacilityClicked={(facilityId: number) =>
          this.handleFacilityClick(facilityId)
        }
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
    facilities: state.facilities.list,
    owners: state.dependancies.owners.list
  };
};

type Props = {
  drawerOpen: boolean;
  toggleFacilityFilter: Function;
  facilities: Array<any>;
  owners: Array<any>;
  fetchOwners: Function;
  history?: any;
};
export default connect(
  mapStateToProps,
  { toggleFacilityFilter, fetchOwners }
)(index);
