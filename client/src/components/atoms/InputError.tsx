import React from "react";
import styled from "styled-components";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InputError(props: Props) {
  return (
    <Container>
      <p>{props.error}</p>
      <FontAwesomeIcon icon={faExclamationTriangle} />
    </Container>
  );
}

export default InputError;
type Props = {
  error: string;
};

const Container = styled.div`
  color: red;
  display: flex;
  justify-content: space-between;
`;
