//@flow
import React from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from "recharts";
import { MflCardGeneric } from "../../../common";
import { defaultScheme } from "../../../colors";

type Props = {
  data: Array<{ name: string, count: number }>,
  width: number,
  colorIndex: number,
  title: string
};

export default (props: Props) => {
  const { data, width, colorIndex, title } = props;
  const view = (
    <BarChart width={width * 0.9} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill={defaultScheme[colorIndex]} />
    </BarChart>
  );
  return <MflCardGeneric heading={title} view={view} />;
};
