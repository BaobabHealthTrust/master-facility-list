import React from "react";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export function Progress() {
  return (
    <Container>
      <CircularProgress
        style={{ height: "60px", width: "60px", color: "#5a90dc" }}
      />
    </Container>
  );
}

export default Progress;
