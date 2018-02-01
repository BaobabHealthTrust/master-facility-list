//@flow
import * as React from "react";

type Props = {
    title: string,
    chart: React.Element<any>
}

export default class MflChartContainer extends React.Component<Props> {
    render() {
        return (
            <div className="mfl-shadow">
                <div className="mfl-card-title blue">{this.props.title}</div>
                <div className="mfl-p-2 mfl-chart-container">
                    {this.props.chart}
                </div>
            </div>
        );
    }
}