import React from "react";
import styled from "styled-components";

function EmptyState(props: Props) {
  return (
    <Container>
      <div style={{ textAlign: "center", width: "100%" }}>
        <Img style={{ margin: "auto" }} src="/static/images/empty.png" />

        <TextContainer>{`Looks like there are no ${props.resource} for this facility`}</TextContainer>
      </div>
    </Container>
  );
}

export default EmptyState;

type Props = {
  resource: string;
};

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
