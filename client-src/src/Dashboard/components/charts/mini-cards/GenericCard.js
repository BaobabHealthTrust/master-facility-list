//@flow
import React from "react";
import { Card, Icon } from "react-materialize";
import {
  tent,
  clinic,
  hospital,
  district,
  normal_hospital
} from "../../../../images";
import { MflRow } from "../../../../common";
import styled, { css } from "styled-components";

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #666;
  padding-bottom: 20px;
`;

const DashboardIconContainer = styled.div`
  margin: auto;
  flex: 1;
`;

const DashboardIconCount = styled.p`
  font-size: 3em;
  font-weight: bold;
  flex: 1;
  text-align: right;
  margin: auto;
  &:first-child {
    color: #0f52ba !important;
  }
`;
const DashboardIconImg = styled.img`
  width: 50px;
`;

const DashboardIconTitle = styled.p`
  font-size: 1.5em;
  &:first-child {
    color: #0f52ba !important;
  }
`;

export default props => {
  const iconMapper = {
    normal_hospital,
    hospital,
    district,
    tent,
    clinic
  };

  return (
    <Card>
      <TopContainer>
        <DashboardIconContainer>
          <DashboardIconImg src={iconMapper[props.icon]} />
        </DashboardIconContainer>
        <DashboardIconCount>{props.count}</DashboardIconCount>
      </TopContainer>
      <DashboardIconTitle>{props.title}</DashboardIconTitle>
    </Card>
  );
};
