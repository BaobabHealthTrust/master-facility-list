import React from "react";
import styled from "styled-components";

function SectionSubHeading(props: Props) {
  return <Container>{props.children}</Container>;
}

export default SectionSubHeading;

type Props = {
  children: any;
};

const Container = styled.div`
  margin: 8px 0px;
  color: #5a90dc;
  font-size: 22px;
  font-weight: bold;
`;
