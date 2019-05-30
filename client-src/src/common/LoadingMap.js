import React from "react";
import styled from "styled-components";

function LoadingMap(props) {
  return <Container style={props.style}>Loading Map...</Container>;
}

export default LoadingMap;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 2.5rem;
  padding-left: 10px;
`;
