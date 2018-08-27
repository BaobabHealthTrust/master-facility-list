//@flow
import React from 'react';
import { MflCardGeneric } from '../../common';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from 'recharts';
import { defaultScheme } from '../../colors'

export default ({ data, keys, width }) => {

  const container = document.getElementById('typeOwnershipContainer');

  const view = (
    <React.Fragment>
      <BarChart width={0.9 * width} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {keys.map((key, index) => (
          <Bar dataKey={key} fill={defaultScheme[index]} />
        ))}
      </BarChart>
    </React.Fragment>
  )

  return <MflCardGeneric heading="facilities by type and ownership" view={view} />
}
