//@flow
import React, { Component } from 'react';
import ChartContainer from "../common/MflChartContainer";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLegend, VictoryLabel } from "victory";
import { map } from "lodash";

type Props = {
    data: Array<{ regulatoryStatus: string, total: number }>
};

export default class FacilityRegulatoryStatusChart extends Component<Props> {
    render() {
        const ticks = map(this.props.data, "regulatoryStatus");
        const legendData = ticks.length > 0 ? ticks.map(tick => {
            return { name: `${tick.split("(")[0]}\n${tick.split("(")[1] ? tick.split("(")[1].replace(")", "") : ""}` }
        }) : [{ name: "one" }];

        const colorScale = ["#3b5586", "#5170aa", "#6289d1", "#5f7399", "#747b88"];

        const barData = colorScale.map((cs, i) => {
            return Object.assign({}, { fill: cs }, this.props.data[i]);
        })

        const chartDefinition =
            <VictoryChart
                height={200}
                padding={40}
                theme={VictoryTheme.material}
                domainPadding={10}
                style={{ parent: { maxWidth: "600px" } }}
            >
                <VictoryAxis
                    label="Number of Facilities"
                    axisLabelComponent={<VictoryLabel dy={20} />}
                />
                <VictoryAxis
                    dependentAxis
                    label="Registration Status"
                    style={{ tickLabels: { fill: "none" } }}
                    axisLabelComponent={<VictoryLabel dy={-10} />}
                />
                <VictoryBar
                    horizontal={true}
                    data={barData}
                    x="regulatoryStatus"
                    y="total"
                    style={{
                        data: { width: 20 },
                        labels: { fill: "#fff" }
                    }}
                    labels={(d) => `${d.x}: ${d.y}`}
                    colorScale={colorScale}
                    labelComponent={<VictoryLabel dx={-240} />}
                />
            </VictoryChart>;

        return (
            <ChartContainer title="License Comparison" chart={chartDefinition} />
        );
    }
}