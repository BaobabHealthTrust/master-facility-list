import React from "react";
import styled from "styled-components";

function Notification(props: Props) {
  const error = props.error;
  const title = props.title || (error ? "Wooops" : "Success");
  const message =
    props.message || (error ? "Something went wrong" : "Operation Successful");
  return (
    <Container error={error}>
      <Icon
        src={error ? "/static/images/error.svg" : "/static/images/success.svg"}
      />
      <MessageContainer>
        <div>{title}</div>
        <div>{message}</div>
      </MessageContainer>
    </Container>
  );
}

export default Notification;

const Container = styled<any>("div")`
  width: calc(100% + 16px);
  height: 80px;
  background: ${props => (props.error ? "#d46c6c" : "#79d46c")};
  color: ${props => (props.error ? "#4e1b1e" : "#547a29")};
  margin: -8px 0px -8px -8px;
  padding: 10px 20%;
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 50px;
  margin-right: 20px;
`;

const MessageContainer = styled.div`
  & :first-child {
    font-size: 22px;
    font-weight: bold;
  }
  font-size: 18px;
`;

type Props = {
  error?: boolean;
  message?: string;
  title?: string;
};
