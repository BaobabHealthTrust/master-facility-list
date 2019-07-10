import React, { Fragment } from "react";
import styled from "styled-components";

const Value = styled.span`
  padding-right: 10px;
  font-size: 14px;
`;
const Label = styled.span`
  font-size: 11px;
  color: #7d7d7d;
`;

const Wrapper = styled.div`
  padding-bottom: 10px;
`;
export default function FacilityDetail(props: Props) {
  return (
    <Wrapper data-test={`detailLabel${props.label.replace(/ /g, "")}`}>
      <Value>{props.text}</Value>
      <Label>{props.label}</Label>
    </Wrapper>
  );
}

type Props = {
  text: string;
  label: string;
};
