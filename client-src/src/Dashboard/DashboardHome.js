//@flow
import React from "react";
import Card from "../common/MflStatsCard";
import FacilityOwnershipChart from "./FacilityOwnershipChart";
import FacilityOperationalChart from "./FacilityOperationalChart";
import FacilityFilters from "./FacilityFilters";
import { connect } from "react-redux";
import fetchDashboardFacilityServices from "../actions/fetch-dashboard-statistics"
import fetchServices from "../actions/fetch-services";
import type { FacilityService, Facility, Owner } from "../types/model-types";
import { map, uniq } from "lodash";
import fetchAllFacilities from "../actions/get-facilities";
import fetchOwners from "../actions/fetch-facility-owners";

type Props = {
    fetchDashboardFacilityServices: Function,
    fetchServices: Function,
    fetchAllFacilities: Function,
    fetchOwners: Function,
    facilityServices: Array<FacilityService>,
    allFacilities: Array<Facility>,
    owners: Array<Owner>
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
                icon: "directions_walk"
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
                icon: "airline_seat_recline_normal"
            }
        ]
    }

    calculateFacilitiesWith = (id: number) => {
        const totalFacilities = this.props.facilityServices ? this.props.facilityServices.filter(fs => {
            return fs.service_id === id
        }) : [{}];

        const uniqueFacilities = (uniq(map(totalFacilities, "facility_id"))).length;

        return uniqueFacilities;
    }

    calculateOwnership = (id: number) => {
        const total = this.props.allFacilities ? this.props.allFacilities.filter(facility => {
            return facility.facility_owner_id === id;
        }).length : 0;

        return total;
    }

    async componentDidMount() {
        await this.props.fetchAllFacilities()
        await this.props.fetchOwners();
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

        return (
            <div>
                <FacilityFilters />
                <div className="container mfl-dash-container mfl-tm-2">
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
                                        <div className="col s12 m6 l2">
                                            <Card icon="local_hospital" stat={this.props.allFacilities.length} title="Total Facilities" />
                                        </div>
                                        {this.state.dashboardServices.map(services => <div className="col s12 m6 l2">
                                            <Card icon={services.icon} stat={this.calculateFacilitiesWith(services.id)} title={`Facilities with ${services.displayName}`} />
                                        </div>)}
                                        {/* TODO: Add Components for the other Statistics */}
                                    </div>
                                    <div className="row mfl-tm-2">
                                        <div className="col s12 m6">
                                            <FacilityOwnershipChart data={ownershipData} />
                                        </div>
                                        <div className="col s12 m6">
                                            <FacilityOperationalChart />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
    }
}

export default connect(mapStateToProps, {
    fetchDashboardFacilityServices,
    fetchServices,
    fetchAllFacilities,
    fetchOwners
})(DashboardHome);