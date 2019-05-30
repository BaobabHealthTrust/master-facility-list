import React from "react";
import { MflCardGeneric } from "../../../common";
import { PieChart, Pie, Legend, Cell } from "recharts";
import randomcolor from "randomcolor";
import { defaultScheme } from "../../../colors";

class FacilitiesByOperationalStatus extends React.Component {
  render() {
    const data = this.props.data;

    const view = (
      <PieChart
        width={this.props.width}
        height={300}
        onMouseEnter={this.onPieEnter}
      >
        <Pie dataKey="value" data={data} outerRadius={100} fill="#8884d8">
          {defaultScheme.map((color, index) => (
            <Cell key={index} fill={color} />
          ))}
        </Pie>
        <Legend verticalAlign="top" height={40} />
      </PieChart>
    );

    return <MflCardGeneric heading={this.props.title} view={view} />;
  }
}

export default FacilitiesByOperationalStatus;
