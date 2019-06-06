import React from "react";
import styled from "styled-components";

function EmptyState(props) {
  return (
    <Container>
      <div style={{ textAlign: "center", width: "100%" }}>
        <Img style={{ margin: "auto" }} src="/static/error.png" />

        <TextContainer>{`Looks like there are no ${
          props.resource
        } for this facility`}</TextContainer>
      </div>
    </Container>
  );
}

export default EmptyState;

const Container = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  height: 100%;
`;
const Img = styled.img`
  width: 100px;
`;

const TextContainer = styled.div`
  padding: 20px;
  font-size: 18px;
`;
