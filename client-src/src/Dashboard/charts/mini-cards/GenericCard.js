//@flow
import React from 'react';
import { Card, Icon } from 'react-materialize';
import { ribbon, patient, hospital, bloodTest, maternity } from '../../../images';
import styles from 'styled-components';

const DashboardIconContainer = styles.div`
  border-bottom: 1px solid #666;
  margin-top: -10px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const DashboardIconTitle = styles.p`font-size: 1.5em;`
const DashboardIconCount = styles.p`font-size: 2.5em; font-weight: bold;`;
const DashboardIconImg = styles.img`width: 70%;`

export default (props) => {
  const iconMapper = {
    maternity, hospital, bloodTest, ribbon, patient
  }
  return (
    <Card>
      <DashboardIconContainer>
        <DashboardIconImg src={iconMapper[props.icon]} />
      </DashboardIconContainer>
      <DashboardIconCount>{props.count}</DashboardIconCount>
      <DashboardIconTitle>{props.title}</DashboardIconTitle>
    </Card>
  );
}
