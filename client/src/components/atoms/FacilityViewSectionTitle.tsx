import React from "react";
import styled from "styled-components";

function FacilityViewSectionTitle(props: Props) {
  const { icon, text } = props;
  return (
    <Container>
      <div>
        <Icon>{icon}</Icon>
        <b>{text}</b>
      </div>
    </Container>
  );
}

type Props = {
  icon: any;
  text: string;
};
export default FacilityViewSectionTitle;

const Container = styled.div`
  padding-bottom: 10px;
  margin-bottom: 10px;
  div {
    border-bottom: 1px solid gray;
    margin: 4px;
  }
`;

const Icon = styled.i`
  margin-right: 10px;
`;
