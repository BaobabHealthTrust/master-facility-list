import React from "react";
import styled from "styled-components";

const Container = (props: Props) => {
  return (
    <StyledContainer style={props.style}>{props.children}</StyledContainer>
  );
};

export default Container;

type Props = {
  style?: Object;
  children: any;
};

const StyledContainer = styled.div`
  width: 100%;
  padding: 0px 10%;
  @media (max-width: 992) {
    padding: 0px 5%;
  }
`;
