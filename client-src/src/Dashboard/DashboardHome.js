//@flow
import React from "react";
import Card from "../common/MflStatsCard";
import FacilityOwnershipChart from "./FacilityOwnershipChart";
import FacilityOperationalChart from "./FacilityOperationalChart";
import FacilityRegulatoryStatusChart from "./FacilityRegulatoryStatusChart";
import FacilityTypeChart from "./FacilityTypeChart";
import FacilityFilters from "./FacilityFilters";
import { connect } from "react-redux";
import fetchDashboardFacilityServices from "../actions/fetch-dashboard-statistics"
import fetchServices from "../actions/fetch-services";
import type { FacilityService, Facility, Owner, OperationalStatus, RegulatoryStatus } from "../types/model-types";
import { map, uniq, isEmpty, intersection } from "lodash";
import fetchAllFacilities from "../actions/get-facilities";
import fetchOwners from "../actions/fetch-facility-owners";
import fetchOperationalStatuses from "../actions/fetch-operational-statuses";
import fetchRegulatoryStatuses from "../actions/fetch-regulatory-statuses";

type Props = {
    fetchDashboardFacilityServices: Function,
    fetchServices: Function,
    fetchAllFacilities: Function,
    fetchOwners: Function,
    fetchOperationalStatuses: Function,
    fetchRegulatoryStatuses: Function,
    facilityServices: Array<FacilityService>,
    allFacilities: Array<Facility>,
    owners: Array<Owner>,
    regulatoryStatuses: Array<RegulatoryStatus>,
    operationalStatuses: Array<OperationalStatus>,
    results: number[],
    isSearchValuesEmpty: boolean,
    total: number[],
    dependancyIsLoading: boolean,
    dependancyIsNetworkError: boolean
};

type State = {
    dashboardServices: Array<{ id: number, displayName: string, icon: string }>
}

class DashboardHome extends React.Component<Props, State> {

    state = {
        dashboardServices: [
            {
                id: 4,
                displayName: "OPD",
                icon: "people"
            },
            {
                id: 16,
                displayName: "ANC",
                icon: "pregnant_woman"
            },
            {
                id: 15,
                displayName: "FAM",
                icon: "wc"
            },
            {
                id: 23,
                displayName: "ARI",
                icon: "smoking_rooms"
            }
        ]
    }

    calculateTotalFacilitiesWith = (id: number,
        results: number[] = this.props.results,
        isValuesEmpty: boolean = this.props.isSearchValuesEmpty
    ) => {
        const totalFacilities = this.props.facilityServices ? this.props.facilityServices.filter(fs => {
            return fs.service_id === id
        }) : [{}];

        const uniqueFacilities = isValuesEmpty ? uniq(map(totalFacilities, "facility_id")).length
            : intersection(results, uniq(map(totalFacilities, "facility_id"))).length;

        return uniqueFacilities;
    }

    calculateOwnership = (id: number,
        results: number[] = this.props.results,
        isValuesEmpty: boolean = this.props.isSearchValuesEmpty
    ) => {
        const total = this.props.allFacilities ? this.props.allFacilities.filter(facility => {
            return facility.facility_owner_id === id;
        }) : [];

        const totalOwnership = isValuesEmpty ? total.length : intersection(results, map(total, "id")).length

        return totalOwnership;
    }

    calculateOperationalStatus = (id: number,
        results: number[] = this.props.results,
        isValuesEmpty: boolean = this.props.isSearchValuesEmpty
    ) => {
        const total = this.props.allFacilities ? this.props.allFacilities.filter(facility => {
            return facility.facility_operational_status_id === id;
        }) : [];

        const totalOperationalStatus = isValuesEmpty ? total.length : intersection(results, map(total, "id")).length

        return totalOperationalStatus;
    }

    calculateRegulatoryStatus = (id: number,
        results: number[] = this.props.results,
        isValuesEmpty: boolean = this.props.isSearchValuesEmpty
    ) => {
        const total = this.props.allFacilities ? this.props.allFacilities.filter(facility => {
            return facility.facility_regulatory_status_id === id;
        }) : [];

        const totalRegulatoryStatus = isValuesEmpty ? total.length : intersection(results, map(total, "id")).length

        return totalRegulatoryStatus;
    }

    calculateTotal = (results: number[] = this.props.results,
        isValuesEmpty: boolean = this.props.isSearchValuesEmpty) => {
        const total = this.props.allFacilities ? map(this.props.allFacilities, "id")
            : [];

        const finalTotal = isValuesEmpty ? total.length : intersection(results, total).length;
        return finalTotal;
    }

    async componentDidMount() {
        await this.props.fetchAllFacilities()
        await this.props.fetchOwners();
        await this.props.fetchOperationalStatuses();
        await this.props.fetchRegulatoryStatuses();
        await this.props.fetchDashboardFacilityServices(
            map(this.state.dashboardServices, "id")
        );
    }

    render() {

        const ownershipData = this.props.owners.map(owner => {
            return {
                ownership: owner.facility_owner,
                total: this.calculateOwnership(owner.id)
            }
        })

        const regulatoryStatusData = this.props.regulatoryStatuses.map(regulatoryStatus => {
            return {
                regulatoryStatus: regulatoryStatus.facility_regulatory_status,
                total: this.calculateOwnership(regulatoryStatus.id)
            }
        })

        const operationalStatusData = this.props.operationalStatuses.map(operationalStatus => {
            return {
                x: operationalStatus.facility_operational_status,
                y: this.calculateOperationalStatus(operationalStatus.id)
            }
        })

        return (
            <div>
                <FacilityFilters url="" isFilteredResults={false} />
                <div className="container mfl-container mfl-dash-container mfl-tm-2">
                    <br />
                    {this.props.dependancyIsLoading ? (
                        <div class="progress">
                            <div class="indeterminate" />
                        </div>
                    ) : this.props.dependancyIsNetworkError ? (
                        <blockquote>
                            <h4>
                                "Sorry, we cannot connect to the Server. Please
                            check your Network"
                        </h4>
                        </blockquote>
                    ) : (
                                <div className="row">
                                    {/* <div className="col m12 l4 xl2">
                            <div className>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/SVG-Koort_Malawi.svg/425px-SVG-Koort_Malawi.svg.png" alt="Malawi Map" />
                            </div>
                        </div> */}
                                    <div className="col s12">
                                        <div className="mfl-graphs-container">
                                            <div className="mfl-dash-container">
                                                <div className="row">
                                                    <div className="col s12 m6 l4 xl2">
                                                        <div className="mfl-tm-5"></div>
                                                        <Card icon="local_hospital" stat={this.calculateTotal()} title="Total Facilities" />
                                                    </div>
                                                    {this.state.dashboardServices.map(services => <div className="col s12 m6 l4 xl2">
                                                        <div className="mfl-tm-5"></div>
                                                        <Card icon={services.icon} stat={this.calculateTotalFacilitiesWith(services.id)} title={`Facilities with ${services.displayName}`} />
                                                    </div>)}
                                                    {/* TODO: Add Components for the other Statistics */}
                                                </div>
                                                <div className="row mfl-tm-2">
                                                    <div className="col s12 m6 l4 xl3">
                                                        <div className="mfl-tm-5"></div>
                                                        <FacilityOwnershipChart data={ownershipData} />
                                                    </div>
                                                    <div className="col s12 m6 l4 xl3">
                                                        <div className="mfl-tm-5"></div>
                                                        <FacilityTypeChart />
                                                    </div>
                                                    <div className="col s12 m6 l4 xl3">
                                                        <div className="mfl-tm-5"></div>
                                                        <FacilityOperationalChart data={operationalStatusData} />
                                                    </div>
                                                    <div className="col s12 m6 l4 xl3">
                                                        <div className="mfl-tm-5"></div>
                                                        <FacilityRegulatoryStatusChart data={regulatoryStatusData} />
                                                    </div>
                                                </div>
                                                <div className="row mfl-tm-2">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        facilityServices: store.dashboardStatistics.facilityServices,
        services: store.dependancies.services,
        allFacilities: store.facilities.all,
        owners: store.dependancies.facilityOwners,
        operationalStatuses: store.dependancies.operationalStatuses,
        regulatoryStatuses: store.dependancies.regulatoryStatuses,
        isSearchValuesEmpty: isEmpty(map({
            districtValues: store.advancedSearchValues.districtValues,
            operationalStatusValues: store.advancedSearchValues.operationalStatusValues,
            facilityTypeValues: store.advancedSearchValues.facilityTypeValues,
            facilityOwnerValues: store.advancedSearchValues.facilityOwnerValues,
            regulatoryStatusValues: store.advancedSearchValues.regulatoryStatusValues,
        }).filter(arr => arr.length > 0)),
        results: store.searchResults.advancedSearchFacilities.basicDetailsFacilities,
        dependancyIsLoading: store.dependancies.isLoading,
        dependancyIsNetworkError: store.dependancies.isNetworkError
    }
}

export default connect(mapStateToProps, {
    fetchDashboardFacilityServices,
    fetchServices,
    fetchAllFacilities,
    fetchOwners,
    fetchOperationalStatuses,
    fetchRegulatoryStatuses,
})(DashboardHome);