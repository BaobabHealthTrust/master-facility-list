import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleFacilityFilter } from "../../../services/redux/actions/ui";
import { fetchOwners } from "../../../services/redux/actions/dependancies";
import {
  addFilterValue,
  removeFilterValue,
  basicAdvancedFilter,
  resourcesAdvancedFilter,
  utilitiesAdvancedFilter,
  servicesAdvancedFilter,
  fetchFilteredFacilities
} from "../../../services/redux/actions/facilities";
import FacilityContainer from "./Facility.container";

export class FacilityRedux extends Component<Props> {
  render() {
    return <FacilityContainer {...(this.props as any)} />;
  }
}

type Props = {
  drawerOpen: boolean;
  toggleFacilityFilter: Function;
  filterOptions: Array<any>;
  filterResults: any;
  facilities: Array<any>;
  filteredFacilities: Array<any>;
  owners: Array<any>;
  fetchOwners: Function;
  history?: any;
  addFilterValue: Function;
  removeFilterValue: Function;
  basicAdvancedFilter: Function;
  resourcesAdvancedFilter: Function;
  utilitiesAdvancedFilter: Function;
  servicesAdvancedFilter: Function;
  fetchFilteredFacilities: Function;
  loading: any;
};

const mapStateToProps = (state: any) => {
  return {
    drawerOpen: state.ui.advancedSearchOpen,
    filterOptions: state.facilities.advancedFilter.filterValues,
    filterResults: state.facilities.advancedFilter.filterResults,
    facilities: state.facilities.list,
    filteredFacilities: state.facilities.filteredList,
    owners: state.dependancies.owners.list,
    loading: state.status
  };
};

export default connect(
  mapStateToProps,
  {
    toggleFacilityFilter,
    fetchOwners,
    addFilterValue,
    removeFilterValue,
    basicAdvancedFilter,
    resourcesAdvancedFilter,
    utilitiesAdvancedFilter,
    servicesAdvancedFilter,
    fetchFilteredFacilities
  }
)(FacilityRedux);
