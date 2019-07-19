import React from "react";
import styled from "styled-components";

function StatusBadge(props: { color: string; label: string }) {
  const { color, label } = props;
  return <Badge color={color}>{label}</Badge>;
}

export default StatusBadge;

const Badge = styled.div`
  display: inline-block;
  background-color: ${props => props.color};
  padding: 2px 6px;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  font-size: 12px;
  color: white;
`;
