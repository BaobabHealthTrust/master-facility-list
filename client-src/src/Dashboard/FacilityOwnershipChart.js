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
        const owners = map(this.props.data, "ownership");
        const shortOwners = owners.map(own => own.slice(0, 3).toUpperCase());

        const chartDefinition =
            <VictoryChart
                height={200}
                padding={35}
                theme={VictoryTheme.material}
                domainPadding={20}
                style={{ parent: { maxWidth: "600px" } }}
            >
                <VictoryAxis
                    tickFormat={shortOwners}
                />
                <VictoryAxis
                    dependentAxis
                />
                <VictoryBar
                    data={this.props.data}
                    x="ownership"
                    y="total"
                    events={[{
                        target: "data",
                        eventHandlers: {
                            onMouseEnter: () => {
                                return [
                                    {
                                        target: "labels",
                                        mutation: (props) => {
                                            return { text: props.data[props.index].x };
                                        }
                                    }
                                ]
                            },
                            onMouseLeave: () => {
                                return [
                                    {
                                        target: "labels",
                                        mutation: (props) => {
                                            return { text: "" };
                                        }
                                    }
                                ]
                            }
                        }
                    }]}
                />
            </VictoryChart>;

        return (
            <ChartContainer title="Ownership Comparison" chart={chartDefinition} />
        );
    }
}