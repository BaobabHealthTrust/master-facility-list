//@flow
import React from "react";
import SecondaryMenu from "../common/SecondaryMenu";
import { connect } from "react-redux";
import type { District, FacilityType, OperationalStatus, FacilityOwner } from "../types/model-types";
import fetchDistricts from "../actions/fetch-districts";
import fetchFacilityTypes from "../actions/fetch-facility-types";
import fetchOperationalStatuses from "../actions/fetch-operational-statuses";
import addSearchValues from "../actions/add-search-values";
import removeSearchValues from "../actions/remove-search-values";
import fetchBasicDetailsResults from "../actions/fetch-basic-details-results";
import FacilityFilterSelector from "../common/FacilityFilterSelector";
import fetchFacilityOwners from "../actions/fetch-facility-owners";

type Props = {
    fetchDistricts: Function,
    isFilteredResults: boolean,
    addSearchValues: Function,
    removeSearchValues: Function,
    districts: Array<District>,
    facilityTypes: Array<FacilityType>,
    facilityOwners: Array<FacilityOwner>,
    operationalStatuses: Array<OperationalStatus>,
    fetchFacilityTypes: Function,
    fetchFacilityOwners: Function,
    fetchOperationalStatuses: Function,
    fetchBasicDetailsResults: Function,
    url: string
};

type State = {
    dataSource: any,
    displayKey: string,
    entity: string,
    actionType: string,
    removeAction: string,
    searchValueKey: string
};

class FacilityFilters extends React.Component<Props, State> {

    state = {
        dataSource: [],
        displayKey: "",
        entity: "",
        actionType: "",
        removeAction: "",
        searchValueKey: ""
    }

    componentDidMount() {
        this.props.fetchDistricts(),
            this.props.fetchFacilityTypes();
        this.props.fetchFacilityOwners();
        this.props.fetchOperationalStatuses();
    }

    resetState = () => {
        this.setState({
            dataSource: [],
            displayKey: "",
            entity: "",
            actionType: "",
            removeAction: "",
            searchValueKey: ""
        })
    }

    render() {
        const links = [
            {
                name: 'district',
                displayName: 'District',
                redirect: this.props.url,
                clickHandler: () => {
                    this.state.entity != "districts" ? (
                        this.setState({
                            dataSource: this.props.districts,
                            displayKey: "district_name",
                            entity: "districts",
                            actionType: "ADD_DISTRICT_VALUES",
                            removeAction: "REMOVE_DISTRICT_VALUES",
                            searchValueKey: "districtValues"
                        })
                    ) : this.resetState()
                }
            },
            {
                name: 'facilityType',
                displayName: 'Facility Type',
                redirect: this.props.url,
                clickHandler: () => {
                    this.state.entity != "facilityTypes" ? (
                        this.setState({
                            dataSource: this.props.facilityTypes,
                            displayKey: "facility_type",
                            entity: "facilityTypes",
                            actionType: "ADD_FACILITY_TYPE_VALUES",
                            removeAction: "REMOVE_FACILITY_TYPE_VALUES",
                            searchValueKey: "facilityTypeValues"
                        })
                    ) : this.resetState()
                }
            },
            {
                name: 'facilityOwnership',
                displayName: 'Facility Ownership',
                redirect: this.props.url,
                clickHandler: () => {
                    this.state.entity != "facilityOwners" ? (
                        this.setState({
                            dataSource: this.props.facilityOwners,
                            displayKey: "facility_owner",
                            entity: "facilityOwners",
                            actionType: "ADD_FACILITY_OWNER_VALUES",
                            removeAction: "REMOVE_FACILITY_OWNER_VALUES",
                            searchValueKey: "facilityOwnerValues"
                        })
                    ) : this.resetState()
                }
            },
            {
                name: 'operationalStatus',
                displayName: 'Operational Status',
                redirect: this.props.url,
                clickHandler: () => {
                    this.state.entity != "operationalStatuses" ? (
                        this.setState({
                            dataSource: this.props.operationalStatuses,
                            displayKey: "facility_operational_status",
                            entity: "operationalStatuses",
                            actionType: "ADD_OPERATIONAL_STATUS_VALUES",
                            removeAction: "REMOVE_OPERATIONAL_STATUS_VALUES",
                            searchValueKey: "operationalStatusValues"
                        })
                    ) : this.resetState()
                }
            }
        ]
        return (
            <div>
                <SecondaryMenu links={links} defaultActivePage={"zone"} />
                {
                    this.state.dataSource.length > 0 && <FacilityFilterSelector
                        data={this.state.dataSource}
                        displayKey={this.state.displayKey}
                        entity={this.state.entity}
                        actionType={this.state.actionType}
                        removeAction={this.state.removeAction}
                        fetchResults={this.props.fetchBasicDetailsResults}
                        addSearchValues={this.props.addSearchValues}
                        searchValueKey={this.state.searchValueKey}
                        removeSearchValues={this.props.removeSearchValues}
                        isFilteredResults={this.props.isFilteredResults}
                    />

                }

            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        districts: store.dependancies.districts,
        facilityTypes: store.dependancies.facilityTypes,
        facilityOwners: store.dependancies.facilityOwners,
        operationalStatuses: store.dependancies.operationalStatuses,
    }
}

export default connect(mapStateToProps, {
    fetchDistricts,
    fetchFacilityTypes,
    fetchFacilityOwners,
    fetchOperationalStatuses,
    addSearchValues,
    fetchBasicDetailsResults,
    removeSearchValues
})(FacilityFilters);
