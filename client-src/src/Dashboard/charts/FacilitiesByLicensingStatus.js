import React from 'react';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from 'recharts';
import { MflCardGeneric } from '../../common';
import { defaultScheme } from '../../colors'

class FacilitiesByLicensingStatus extends React.Component {
  render() {
    const data = [];
    const view = (
      <BarChart width={this.props.width * 0.9} height={300} data={this.props.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill={defaultScheme[0]} />
      </BarChart>
    )
    return (
      <MflCardGeneric heading="facilities by licensing status" view={view} />
    );
  }
}
export default FacilitiesByLicensingStatus;
