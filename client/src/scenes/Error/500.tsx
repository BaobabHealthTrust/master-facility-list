import React from "react";
import styled from "styled-components";
import Button from "../../components/atoms/Button";

function Preloader() {
  const onReload = () => {
    window.location.reload();
  };
  return (
    <Container>
      <div style={{ textAlign: "center" }}>
        <Img src="/static/images/networkError.svg" />
        <Message>
          THERE WAS AN ERROR WHILE FETCHING DATA. <br />
          PLEASE TRY AGAIN.
        </Message>
        <Button onClick={onReload} theme="secondary">
          Try Again
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
