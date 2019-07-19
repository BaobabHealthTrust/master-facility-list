import React, { Fragment } from "react";
import styled from "styled-components";

const Value = styled.span`
  font-size: 14px;
`;
const Label = styled.span`
  font-size: 11px;
  color: #7d7d7d;
  padding-right: 10px;
`;

const Wrapper = styled.div`
  padding-bottom: 10px;
`;
export default function FacilityDetail(props: Props) {
  return (
    <Wrapper data-test={`detailLabel${props.label.replace(/ /g, "")}`}>
      {props.label.length > 0 && <Label>{props.label}</Label>}
      <Value>{props.text}</Value>
    </Wrapper>
  );
}

type Props = {
  text: string;
  label: string;
};
