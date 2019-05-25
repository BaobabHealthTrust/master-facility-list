import React from "react";
import styled from "styled-components";
import Card from "../atoms/Card";

const StatCard = (props: Props) => {
  const { count, title, icon, onClick } = props;
  const view = (
    <Container onClick={() => onClick()}>
      <TopContainer>
        <DashboardIconContainer>
          <DashboardIconImg src={`/static/images/${icon}`} />
        </DashboardIconContainer>
        <DashboardIconCount>{count}</DashboardIconCount>
      </TopContainer>
      <DashboardIconTitle>{title}</DashboardIconTitle>
    </Container>
  );
  return <Card>{view}</Card>;
};

export default StatCard;

type Props = {
  count: number;
  title: string;
  icon: any;
  onClick: Function;
};

const Container = styled.div`
  cursor: pointer;
  padding: 15px;
  min-height: 140px;
`;
const TopContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #666;
  align-items: center;
  padding-bottom: 15px;
`;

const DashboardIconContainer = styled.div`
  margin: auto;
  flex: 1;
`;

const DashboardIconCount = styled.p`
  font-size: 2em;
  font-weight: bold;
  flex: 1;
  text-align: right;
  margin: auto;
  color: #a2a2a2;
`;
const DashboardIconImg = styled.img`
  width: 46px;
`;

const DashboardIconTitle = styled<any>("p")`
  padding-top: 10px;
  font-size: 20px;
  color: ${({ highlight }) => highlight && "#0f52ba !important"};
`;
