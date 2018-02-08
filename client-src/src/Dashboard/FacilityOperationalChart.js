//@flow
import React, { Component } from 'react';
import ChartContainer from "../common/MflChartContainer";
import { VictoryPie, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { map } from "lodash";

type Props = {
    data: Array<{ x: string, y: number }>,
};

export default class FacilityOperationalStatusChart extends Component<Props> {
    render() {
        const data = this.props.data;

        const chartDefinition = <VictoryPie
            data={data}
            colorScale={["#3b5586", "#5170aa", "#6289d1", "#5f7399", "#747b88"]}
            padding={0}
            style={pieStyle}
            theme={VictoryTheme.material}
            height={200}
            labelRadius={50}
            labels={(d) => {
                return `${d.y}`
            }}
            animate={{ duration: 300 }}
            events={[{
                target: "data",
                eventHandlers: {
                    onMouseEnter: () => {
                        return [
                            {
                                target: "labels",
                                mutation: (props) => {
                                    return { text: `${props.data[props.index].x.split("(")[0]}\n${props.data[props.index].x.split("(")[1] ? props.data[props.index].x.split("(")[1].replace(")", "") : ""}\n${props.data[props.index].y}` };
                                }
                            }
                        ]
                    },
                    onMouseLeave: () => {
                        return [
                            {
                                target: "labels",
                                mutation: (props) => {
                                    return {
                                        text: (d) => {
                                            return `${d.y}`
                                        }
                                    };
                                }
                            }
                        ]
                    }
                }
            }]}
        />

        return (
            <ChartContainer title="Operational Status Comparison" chart={chartDefinition} />
        );
    }
}

const pieStyle = {
    parent: { maxWidth: "600px" },
    labels: { fill: "#041128", fontSize: 10, fontWeight: "bold", textAlign: "center" }
}

