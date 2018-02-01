//@flow
import React from "react";

type Props = {
    icon: string,
    stat: number,
    title: string
};

export default class MflStatsCard extends React.Component<Props> {
    render() {
        return (
            <div className="mfl-stats-container mfl-shadow">
                <div>
                    <div className="mfl-stats-icon"><i className="material-icons medium">{this.props.icon}</i></div>
                    <div className="mfl-stats-number">{this.props.stat}</div>
                </div>
                <div className="mfl-stats-title">
                    {this.props.title}
                </div>
            </div>
        )
    }
}