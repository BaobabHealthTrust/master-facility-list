import React from "react";
import styled from "styled-components";
import Button from "../../components/atoms/Button";

function Preloader() {
  const onReload = () => {
    window.location.replace("/");
  };
  return (
    <Container>
      <div style={{ textAlign: "center" }}>
        <Img src="./static/images/networkError.svg" />
        <Code>404</Code>
        <Message>Page Not Found</Message>
        <Button onClick={onReload} theme="secondary">
          Go Home
        </Button>
      </div>
    </Container>
  );
}

export default Preloader;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 2000;
`;

const Message = styled.div`
  font-size: 28px;
  color: #222222;
  margin-top: 15px;
  @media (max-width: 700px) {
    font-size: 20px;
  }
`;
const Img = styled.img`
  margin: auto;
  width: 200px;
  @media (max-width: 700px) {
    width: 100px;
  }
`;
const Code = styled.div`
  margin: auto;
  width: 200px;
  @media (max-width: 700px) {
    width: 100px;
  }
`;
