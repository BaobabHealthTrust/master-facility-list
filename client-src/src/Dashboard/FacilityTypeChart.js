//@flow
import React, { Component } from 'react';
import ChartContainer from "../common/MflChartContainer";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryGroup } from "victory";
import { map } from "lodash";

type Props = {
    data: Array<{ ownership: string, total: number }>
};

export default class FacilityTypeChart extends Component<Props> {
    render() {
        const chartDefinition =
            <VictoryChart
                height={200}
                padding={40}
                theme={VictoryTheme.material}
                domainPadding={40}
                style={{ parent: { maxWidth: "600px" } }}
            >
                <VictoryGroup offset={20}
                    colorScale={"qualitative"}
                >
                    <VictoryBar
                        data={[{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 5 }]}
                    />
                    <VictoryBar
                        data={[{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 7 }]}
                    />
                    <VictoryBar
                        data={[{ x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 9 }]}
                    />
                    <VictoryBar
                        data={[{ x: 1, y: 4 }, { x: 2, y: 3 }, { x: 3, y: 11 }]}
                    />
                </VictoryGroup>
            </VictoryChart>

        return (
            <ChartContainer title="Type Comparison" chart={chartDefinition} />
        );
    }
}