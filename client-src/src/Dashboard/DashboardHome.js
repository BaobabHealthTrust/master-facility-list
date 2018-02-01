//@flow
import React from "react";
import Card from "../common/MflStatsCard";
import FacilityOwnershipChart from "./FacilityOwnershipChart";
import FacilityOperationalChart from "./FacilityOperationalChart";
import FacilityFilters from "./FacilityFilters";
import { connect } from "react-redux";
import fetchDashboardFacilityServices from "../actions/fetch-dashboard-statistics"
import type { FacilityService } from "../types/model-types";

type Props = {
    fetchDashboardFacilityServices: Function,
    facilityServices: Array<FacilityService>
};

type State = {}

class DashboardHome extends React.Component<Props, State> {
    componentDidMount() {
        this.props.fetchDashboardFacilityServices();
    }

    render() {
        return (
            <div>
                <FacilityFilters />
                <div className="container mfl-dash-container mfl-tm-2">
                    <div className="row">
                        <div className="col m12 l4 xl2">
                            <div className>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/SVG-Koort_Malawi.svg/425px-SVG-Koort_Malawi.svg.png" alt="Malawi Map" />
                            </div>
                        </div>
                        <div className="col m12 l8 xl10">
                            <div className="mfl-graphs-container">
                                <div className="mfl-dash-container">
                                    <div className="row">
                                        <div className="col s12 m6 l3">
                                            <Card icon="local_hospital" stat={12} title="Total Facilities" />
                                        </div>
                                        {/* TODO: Add Components for the other Statistics */}
                                    </div>
                                    <div className="row mfl-tm-2">
                                        <div className="col s12 m6">
                                            <FacilityOwnershipChart />
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
        facilityServices: store.dashboardStatistics.facilityServices
    }
}

export default connect(mapStateToProps, {
    fetchDashboardFacilityServices
})(DashboardHome);