import React from "react";
import styled from "styled-components";
import Card from "../atoms/Card";

const StatCard = (props: Props) => {
  const { count, title, icon, onClick, highlight } = props;
  const view = (
    <Container highlight={highlight} onClick={() => onClick()}>
      <TopContainer>
        <DashboardIconContainer>
          <DashboardIconImg src={`/static/images/${icon}`} />
        </DashboardIconContainer>
        <DashboardIconCount highlight={highlight}>{count}</DashboardIconCount>
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
  highlight?: boolean;
};

const Container = styled<any>("div")`
  cursor: pointer;
  padding: 15px;
  height: 160px;
  overflow: hidden;
  color: ${props => (props.highlight ? "#0f52ba" : "inherit")};
`;
const TopContainer = styled<any>("div")`
  display: flex;
  border-bottom: 1px solid #666;
  align-items: center;
  padding-bottom: 15px;
`;

const DashboardIconContainer = styled.div`
  margin: auto;
  flex: 1;
`;

const DashboardIconCount = styled<any>("p")`
  font-size: 2.5em;
  font-weight: bold;
  flex: 1;
  text-align: right;
  margin: auto;
  color: ${props => (props.highlight ? "#0f52ba" : "#a2a2a2")};
`;
const DashboardIconImg = styled.img`
  width: 46px;
`;

const DashboardIconTitle = styled<any>("p")`
  padding-top: 10px;
  font-size: 20px;
  color: ${({ highlight }) => highlight && "#0f52ba !important"};
`;
