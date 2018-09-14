//@flow
import React from 'react';
import { Card, Icon } from 'react-materialize';
import { tent, clinic, hospital, district, normal_hospital } from '../../../images';
import styled, { css } from 'styled-components';

const DashboardIconContainer = styled.div`
  border-bottom: 1px solid #666;
  margin-top: -10px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const DashboardIconCount = styled.p`
  font-size: 2.5em;
  font-weight: bold;
  ${({ highlight }) => highlight && css`color: #0F52ba !important;`}
`;
const DashboardIconImg = styled.img`width: 70%;`
const DashboardIconTitle = styled.p`
  font-size: 1.5em;
  ${({ highlight }) => highlight && css`color: #0F52ba !important;`}
`

export default (props) => {
  const iconMapper = {
    normal_hospital, hospital, district, tent, clinic
  }

  const highlight = props.icon == 'hospital'
  const background = highlight ? "#eff5ff" : "#fff"

  return (
    <Card style={{ background }}>
      <DashboardIconContainer>
        <DashboardIconImg src={iconMapper[props.icon]} />
      </DashboardIconContainer>
      <DashboardIconCount highlight={highlight}>{props.count}</DashboardIconCount>
      <DashboardIconTitle highlight={highlight}>{props.title}</DashboardIconTitle>
    </Card >
  );
}
