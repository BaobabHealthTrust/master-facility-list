import React, { ReactElement } from "react";
import styled from "styled-components";

function MenuItem(props: Props) {
  return <Container active={props.active}>{props.body}</Container>;
}
export default MenuItem;

type Props = {
  body: string | ReactElement;
  active: boolean;
};

const Container = styled<any>("div")`
  border-bottom: ${props => props.active && "3px solid white"};
  background-color: ${props => props.active && "rgba(0,0,0,0.2)"};
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0px 20px;
  cursor: pointer;
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
