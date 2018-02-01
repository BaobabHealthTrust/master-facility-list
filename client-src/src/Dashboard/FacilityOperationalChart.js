//@flow
import React, { Component } from 'react';
import ChartContainer from "../common/MflChartContainer";
import { VictoryPie, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

type Props = {
    data: Array<{ x: string, y: number }>,

};

export default class FacilityOwnershipChart extends Component<Props> {
    render() {
        const data = this.props.data;

        const chartDefinition = <VictoryPie
            data={data}
            padding={20}
            style={{ parent: { maxWidth: "600px" } }}
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