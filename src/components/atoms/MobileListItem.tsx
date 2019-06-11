import React from "react";
import styled from "styled-components";

function FacilityMobileListItem(props: Props) {
  const { facility, onClick } = props;
  return (
    <Container onClick={e => onClick(facility.id)}>
      <div style={{ fontWeight: "bold", fontSize: "18px" }}>
        {facility.name}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "gray"
        }}
      >
        <div> {facility.type}</div>
        <div> {facility.district}</div>
      </div>
    </Container>
  );
}

export default FacilityMobileListItem;

type Props = {
  facility: any;
  onClick: Function;
};
const Container = styled.div`
  border: 1px solid #ededed;
  background: white;
  padding: 10px;
  cursor: pointer;
`;
