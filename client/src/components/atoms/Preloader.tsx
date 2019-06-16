import React from "react";
import styled from "styled-components";

function Preloader() {
  return (
    <Container>
      <div style={{ textAlign: "center" }}>
        <img src="./static/images/Loading.gif" style={{ margin: "auto" }} />
        <Message>
          SETTING UP YOUR ENVIRONMENT <br />
          THIS COULD TAKE A WHILE...
        </Message>
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
  color: #5a90dc;
  margin-top: 15px;
  @media (max-width: 700px) {
    font-size: 20px;
  }
`;
