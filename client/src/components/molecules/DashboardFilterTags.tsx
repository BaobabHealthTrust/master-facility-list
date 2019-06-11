import React from "react";
import styled from "styled-components";
import Chip from "@material-ui/core/Chip";

function DashboardFilterTags(props: Props) {
  const { districts, onRemove } = props;
  return (
    <Container>
      {districts.map(district => (
        <Chip
          style={{ margin: "0px 5px" }}
          key={district}
          label={district}
          onDelete={() => onRemove(district)}
        />
      ))}
    </Container>
  );
}

export default DashboardFilterTags;

type Props = {
  districts: Array<string>;
  onRemove: Function;
};
const Container = styled.div`
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;
