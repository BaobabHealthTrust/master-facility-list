import React from "react";
import { Chip } from "@material-ui/core";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  overflow: scroll;
  padding: 20px 5px;
  border-top: 1px solid #ededed;
  white-space: nowrap;
  div {
    margin: 2px;
  }
`;
export default function SearchChipsContainer(props) {
  return (
    <Container>
      {props.filterOptions.map(option => (
        <Chip
          key={option.label}
          label={option.label}
          onDelete={() => {
            props.onRemoveFilter(option);
          }}
        />
      ))}
    </Container>
  );
}
