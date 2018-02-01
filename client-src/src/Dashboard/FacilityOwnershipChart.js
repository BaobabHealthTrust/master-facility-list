//@flow
import React, { Component } from 'react';
import ChartContainer from "../common/MflChartContainer";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

type Props = {};

export default class FacilityOwnershipChart extends Component<Props> {
    render() {
        const data = [
            { ownership: "Private", total: 28 },
            { ownership: "Cham", total: 12 },
            { ownership: "Public", total: 14 },
            { ownership: "Military", total: 51 },
            { ownership: "Parastatal", total: 7 },
        ];

        const chartDefinition =
            <VictoryChart
                height={200}
                padding={30}
                theme={VictoryTheme.material}
                domainPadding={20}
                style={{ parent: { maxWidth: "600px" } }}
            >
                <VictoryAxis
                    tickFormat={["Private", "Cham", "Public", "Military", "Parastatal"]}
                />
                <VictoryAxis
                    dependentAxis
                />
                <VictoryBar data={data} x="ownership" y="total" />
            </VictoryChart>;

        return (
            <ChartContainer title="Facility Ownership Comparison" chart={chartDefinition} />
        );
    }
}