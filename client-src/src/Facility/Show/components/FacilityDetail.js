import React, { Fragment } from "react";
import styled from "styled-components";

const Value = styled.span`
  padding-right: 10px;
  font-size: 16px;
`;
const Label = styled.span`
  font-size: 12px;
  color: #7d7d7d;
`;

const Wrapper = styled.div`
  padding-bottom: 10px;
`;
export default function FacilityDetail(props) {
  return (
    <Wrapper>
      <Value>{props.text}</Value>
      <Label>{props.label}</Label>
    </Wrapper>
  );
}
