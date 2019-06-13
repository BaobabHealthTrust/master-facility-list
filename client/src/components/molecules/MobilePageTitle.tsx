import React from "react";
import styled from "styled-components";

function MobilePageTitle(props: Props) {
  return <Container>{props.children}</Container>;
}

export default MobilePageTitle;

type Props = {
  children: any;
};
const Container = styled.div`
  background-color: rgb(13, 71, 161);
  padding: 5px 0px;
  z-index: 1100;
  position: fixed;
  display: flex;
  width: 100%;
  color: white;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.12);
  font-size: 22px;
`;
