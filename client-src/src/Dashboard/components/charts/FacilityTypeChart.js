//@flow
import React, { Component } from "react";
import ChartContainer from "../../../common/MflChartContainer";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryStack,
  VictoryGroup
} from "victory";
import { map } from "lodash";

type Props = {
  data: Array<{ facilityType: string, total: number }>
};

export default class FacilityTypeChart extends Component<Props> {
  render() {
    console.log(this.props.data);
    const chartDefinition = (
      <VictoryChart
        height={190}
        width={900}
        theme={VictoryTheme.material}
        domainPadding={{ x: 50, y: 50 }}
      >
        <VictoryGroup
          offset={25}
          colorScale={["tomato", "orange", "gold", "blue"]}
        >
          <VictoryBar
            data={[
              { x: "District hospital", y: 100 },
              { x: "Hospital", y: 30 },
              { x: "Despensary", y: 89 },
              { x: "Clinic", y: 89 }
            ]}
          />
          <VictoryBar
            data={[
              { x: "District hospital", y: 60 },
              { x: "Hospital", y: 70 },
              { x: "Despensary", y: 45 },
              { x: "Clinic", y: 26 }
            ]}
          />
          <VictoryBar
            data={[
              { x: "District hospital", y: 40 },
              { x: "Hospital", y: 50 },
              { x: "Despensary", y: 29 },
              { x: "Clinic", y: 49 }
            ]}
          />
          <VictoryBar
            data={[
              { x: "District hospital", y: 20 },
              { x: "Hospital", y: 65 },
              { x: "Despensary", y: 39 },
              { x: "Clinic", y: 53 }
            ]}
          />
        </VictoryGroup>
      </VictoryChart>
    );

    return <ChartContainer title="Type Comparison" chart={chartDefinition} />;
  }
}
