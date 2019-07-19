import React from "react";
import styled from "styled-components";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormHelperText } from "@material-ui/core";

function InputError(props: Props) {
  return (
    <FormHelperText data-test={`fieldError${props.for}`}>
      <Container>
        <p>{props.error}</p>
        <FontAwesomeIcon icon={faExclamationTriangle} />
      </Container>
    </FormHelperText>
  );
}

export default InputError;
type Props = {
  error: string;
  for: string;
};

const Container = styled.div`
  color: red;
  display: flex;
  justify-content: space-between;
`;
