//@flow
import React, { Component } from 'react';
import ChartContainer from "../common/MflChartContainer";
import { VictoryPie, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

type Props = {};

export default class FacilityOwnershipChart extends Component<Props> {
    render() {
        const data = [
            { x: "Functional", y: 28 },
            { x: "Non-Functional", y: 12 },
            { x: "Closed", y: 14 },
        ];

        const chartDefinition = <VictoryPie
            data={data}
            padding={20}
            style={{ parent: { maxWidth: "600px" } }}
            categories={{ x: ["Functional", "Non-Functional", "Closed"] }}
            theme={VictoryTheme.material}
            height={200}
            innerRadius={50}
            labels={(d) => `${d.x}: ${d.y}`}
            animate={{ duration: 300 }}
        />

        return (
            <ChartContainer title="Operational Status Comparison" chart={chartDefinition} />
        );
    }
}