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
        const chartDefinition =
            <VictoryChart
                padding={30}
                style={{ parent: { maxWidth: "600px" } }}
                theme={VictoryTheme.material}
                height={200}
                innerRadius={30}
            >

                <VictoryStack
                    colorScale={["tomato", "orange", "gold"]}

                >
                    <VictoryBar

                        data={[{ x: "a", y: 2 }, { x: "b", y: 3 }, { x: "c", y: 5 }]}
                    />
                    <VictoryBar
                        data={[{ x: "a", y: 1 }, { x: "b", y: 4 }, { x: "c", y: 5 }]}
                    />
                    <VictoryBar
                        data={[{ x: "a", y: 3 }, { x: "b", y: 2 }, { x: "c", y: 6 }]}
                    />
                </VictoryStack>

            </VictoryChart >

        return (
            <ChartContainer title="Facility Type Comparison" chart={chartDefinition} />
        );
    }
}