//@flow
import React, { Component } from 'react';
import ChartContainer from "../common/MflChartContainer";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from "victory";
import { map } from "lodash";

type Props = {
    data: Array<{ ownership: string, total: number }>
};

export default class FacilityTypeChart extends Component<Props> {
    render() {

        const data2012 = [
            { quarter: 1, earnings: 13000 }

        ];

        const data2013 = [
            { quarter: 1, earnings: 15000 }

        ];

        const data2014 = [
            { quarter: 1, earnings: 11500 }

        ];

        const data2015 = [
            { quarter: 1, earnings: 18000 }

        ];

        const chartDefinition =
            <VictoryChart
                padding={30}
                style={{ parent: { maxWidth: "600px" } }}
                theme={VictoryTheme.material}
                height={200}
                innerRadius={80}
            >
                <VictoryAxis

                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => (`$${x / 1000}k`)}
                />
                <VictoryStack
                    height={400}
                    width={800}
                    horizontal="true"

                >
                    <VictoryBar
                        horizontal={true}
                        data={data2012}
                        x="quarter"
                        y="earnings"
                    />
                    <VictoryBar
                        height={400}
                        data={data2013}
                        x="quarter"
                        y="earnings"
                    />
                    <VictoryBar
                        data={data2014}
                        height={400}
                        x="quarter"
                        y="earnings"
                    />
                    <VictoryBar
                        data={data2015}
                        x="quarter"
                        y="earnings"
                    />
                </VictoryStack>

            </VictoryChart >

        return (
            <ChartContainer title="Facility Type Comparison" chart={chartDefinition} />
        );
    }
}