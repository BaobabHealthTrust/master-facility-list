//@flow
import React, { Component } from 'react';
import ChartContainer from "../common/MflChartContainer";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { map } from "lodash";

type Props = {
    data: Array<{ regulatoryStatus: string, total: number }>
};

export default class FacilityRegulatoryStatusChart extends Component<Props> {
    render() {
        const ticks = map(this.props.data, "regulatoryStatus");

        const chartDefinition =
            <VictoryChart
                height={200}
                padding={35}
                theme={VictoryTheme.material}
                domainPadding={20}
                style={{ parent: { maxWidth: "600px" } }}
            >
                <VictoryAxis
                    tickFormat={ticks}
                />
                <VictoryAxis
                    dependentAxis
                />
                <VictoryBar horizontal={true} data={this.props.data} x="regulatoryStatus" y="total" />
            </VictoryChart>;

        return (
            <ChartContainer title="Facility License Status Comparison" chart={chartDefinition} />
        );
    }
}