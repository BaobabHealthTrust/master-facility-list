import React from "react";
import styled from "styled-components";
import { PieChart as Chart, Pie, Legend, Cell } from "recharts";

const PieChar = (props: Props) => {
  const { width, height, onPieEnter, data } = props;
  let scheme = props.scheme
    ? props.scheme
    : [
        "#26a69a",
        "#e5b415",
        "#ba4e4c",
        "#6593f5",
        "#46516d",
        "#008081",
        "#588baa",
        "#3fe0d0"
      ];
  return (
    <Container>
      <Chart
        width={width || 300}
        height={height || 300}
        onMouseEnter={onPieEnter}
      >
        <Pie dataKey="value" data={data} outerRadius={120} fill="#8884d8">
          {scheme.map((color, index) => (
            <Cell key={index} fill={color} />
          ))}
        </Pie>
        <Legend verticalAlign="top" height={40} />
      </Chart>
    </Container>
  );
};

export default PieChar;

type Props = {
  width?: number;
  height?: number;
  onPieEnter?: any;
  data: Array<any>;
  scheme?: Array<string>;
};
const Container = styled.div`
  display: flex;
  justify-content: center;
`;
