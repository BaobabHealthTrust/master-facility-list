//@flow
import React from 'react'
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
import { connect } from 'react-redux'

class FetchAllDependancies extends React.Component<{}> {
    componentDidMount() {
        this.props.fetchDistricts();
        this.props.fetchOperationalStatuses();
        this.props.fetchFacilityTypes();
        this.props.fetchFacilityOwners();
        this.props.fetchRegulatoryStatuses();
        this.props.fetchResourceTypes();
        this.props.fetchUtilityTypes();
        this.props.fetchServiceTypes();
        this.props.fetchResources();
        this.props.fetchUtilities();
        this.props.fetchServices();
        this.props.fetchFacilities(1);
    }

    render() {
        return <div />
    }
}

export default connect(state => {}, {
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
})(FetchAllDependancies)
