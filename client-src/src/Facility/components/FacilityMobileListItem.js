import React from "react";
import styled from "styled-components";

function FacilityMobileListItem(props) {
  return (
    <Container onClick={props.onClick}>
      <div style={{ fontWeight: "bold", fontSize: "20px" }}>
        {props.facility.name}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "gray"
        }}
      >
        <div> {props.facility.type}</div>
        <div> {props.facility.district}</div>
      </div>
    </Container>
  );
}

export default FacilityMobileListItem;

const Container = styled.div`
  border: 1px solid #ededed;
  background: white;
  padding: 10px;
  cursor: pointer;
`;
