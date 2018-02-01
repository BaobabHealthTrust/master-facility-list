//@flow
import React, { Component } from 'react';
import ChartContainer from "../common/MflChartContainer";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { map } from "lodash";

type Props = {
    data: Array<{ ownership: string, total: number }>
};

export default class FacilityOwnershipChart extends Component<Props> {
    render() {
        const ticks = map(this.props.data, "ownership");

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
                <VictoryBar data={this.props.data} x="ownership" y="total" />
            </VictoryChart>;

        return (
            <ChartContainer title="Facility Ownership Comparison" chart={chartDefinition} />
        );
    }
}