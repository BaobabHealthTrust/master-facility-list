import React from "react";
import styled from "styled-components";

function Preloader(props: { style?: any }) {
  return (
    <Container style={props.style}>
      <div style={{ textAlign: "center" }}>
        <Img src="/static/images/rolling.gif" />
      </div>
    </Container>
  );
}

export default Preloader;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const Img = styled.img`
  margin: auto;
  width: 60px;
  @media (max-width: 700px) {
    width: 50px;
  }
`;
