import React from "react";
import styled from "styled-components";

function Notification(props: Props) {
  const message = props.message || "Something went wrong";
  return (
    <Container>
      <MessageContainer>{message}</MessageContainer>
    </Container>
  );
}

export default Notification;

const Container = styled<any>("div")`
  width: 100%;
  height: 60px;
  background: "#d46c6c";
  color: "#4e1b1e";
  margin: -8px 0px -8px -8px;
  padding: 10px 20%;
`;

const MessageContainer = styled.div`
  font-size: 18px;
`;

type Props = {
  message?: string;
};
