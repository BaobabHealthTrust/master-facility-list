import React from "react";
import styled from "styled-components";
import Chip from "@material-ui/core/Chip";

function DashboardFilterTags(props: Props) {
  const { filterOptions, onRemove } = props;
  return (
    <Container>
      {filterOptions.map(option => (
        <Chip
          data-test={(option.label as string).replace(/ /gi, "_")}
          style={{ margin: "0px 5px" }}
          key={JSON.stringify(option)}
          label={option.label}
          onDelete={() => onRemove(option)}
        />
      ))}
    </Container>
  );
}

export default DashboardFilterTags;

type Props = {
  filterOptions: Array<any>;
  onRemove: Function;
};
const Container = styled.div`
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;
