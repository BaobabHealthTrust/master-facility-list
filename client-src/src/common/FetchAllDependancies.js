//@flow
import React from "react";
import {
  fetchDistricts,
  fetchFacilityTypes,
  fetchFacilityOwners,
  fetchUtilityTypes,
  fetchResourceTypes,
  fetchServiceTypes,
  fetchRegulatoryStatuses,
  fetchOperationalStatuses,
  fetchFacilities,
  fetchResources,
  fetchUtilities,
  fetchServices
} from "../actions";
import { connect } from "react-redux";
import store from "../Store"

class FetchAllDependancies extends React.Component<{}> {
  dispatchError=()=>{
    store.dispatch({
      type: 'DEPENDANCY_ERROR',
      payload:""
  })}

  componentWillMount() {
    this.props.fetchDistricts().catch(()=>{this.dispatchError()});
    this.props.fetchOperationalStatuses().catch(()=>{this.dispatchError()});
    this.props.fetchFacilityTypes().catch(()=>{this.dispatchError()});
    this.props.fetchFacilityOwners().catch(()=>{this.dispatchError()});
    this.props.fetchRegulatoryStatuses().catch(()=>{this.dispatchError()});
    this.props.fetchResourceTypes().catch(()=>{this.dispatchError()});
    this.props.fetchUtilityTypes().catch(()=>{this.dispatchError()});
    this.props.fetchServiceTypes().catch(()=>{this.dispatchError()});
    this.props.fetchResources().catch(()=>{this.dispatchError()});
    this.props.fetchUtilities().catch(()=>{this.dispatchError()});
    this.props.fetchServices().catch(()=>{this.dispatchError()});
    this.props.fetchFacilities().catch(()=>{this.dispatchError()});
  }

  render() {
    return <div />;
  }
}

export default connect(
  state => ({}),
  {
    fetchDistricts,
    fetchFacilityTypes,
    fetchFacilityOwners,
    fetchUtilityTypes,
    fetchResourceTypes,
    fetchServiceTypes,
    fetchRegulatoryStatuses,
    fetchOperationalStatuses,
    fetchFacilities,
    fetchResources,
    fetchUtilities,
    fetchServices
  }
)(FetchAllDependancies);
