//@flow
import React from "react";

type Props = {};
type State = {};

export default class DashboardHome extends React.Component<Props, State> {

    render() {
        return (
            <div className="mfl-dash-container">
                <div className="mfl-map-container">Map Here</div>
                <div className="mfl-graphs-container">
                    <div className="mfl-stats-container">
                        <div>
                            <div className="mfl-stats-icon"><i className="material-icons medium">local_hospital</i></div>
                            <div className="mfl-stats-number">12</div>
                        </div>
                        <div className="mfl-stats-title">
                            Total Facilities
                        </div>
                    </div>
                    <div className="mfl-stats-container">
                        <div>
                            <div className="mfl-stats-icon"><i className="material-icons medium">local_hospital</i></div>
                            <div className="mfl-stats-number">12</div>
                        </div>
                        <div className="mfl-stats-title">
                            Total Facilities
                        </div>
                    </div>
                    <div className="mfl-stats-container">
                        <div>
                            <div className="mfl-stats-icon"><i className="material-icons medium">local_hospital</i></div>
                            <div className="mfl-stats-number">12</div>
                        </div>
                        <div className="mfl-stats-title">
                            Total Facilities
                        </div>
                    </div>
                    <div className="mfl-stats-container">
                        <div>
                            <div className="mfl-stats-icon"><i className="material-icons medium">local_hospital</i></div>
                            <div className="mfl-stats-number">12</div>
                        </div>
                        <div className="mfl-stats-title">
                            Total Facilities
                        </div>
                    </div>
                    <div className="mfl-stats-container">
                        <div>
                            <div className="mfl-stats-icon"><i className="material-icons medium">local_hospital</i></div>
                            <div className="mfl-stats-number">12</div>
                        </div>
                        <div className="mfl-stats-title">
                            Total Facilities
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}