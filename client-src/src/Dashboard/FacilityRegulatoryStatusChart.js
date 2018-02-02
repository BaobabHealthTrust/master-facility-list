//@flow
import React, { Component } from 'react';
import ChartContainer from "../common/MflChartContainer";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLegend } from "victory";
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
                padding={35}
                theme={VictoryTheme.material}
                domainPadding={20}
                style={{ parent: { maxWidth: "600px" } }}
            >
                <VictoryAxis />
                <VictoryLegend
                    orientation="vertical"
                    style={{ labels: { fontSize: 8 } }}
                    data={legendData}
                    gutter={0}
                    colorScale={colorScale}
                    animate={{ duration: 2000, onLoad: { duration: 1000 } }}
                />
                <VictoryBar
                    horizontal={true}
                    data={barData}
                    x="regulatoryStatus"
                    y="total"
                    labels={(d) => d.total}
                    colorScale={colorScale}
                />
            </VictoryChart>;

        return (
            <ChartContainer title="Facility License Status Comparison" chart={chartDefinition} />
        );
    }
}