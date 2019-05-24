import React from "react";
import styled from "styled-components";

export default ({ heading, view, style }: Props) => {
  return (
    <CardContainer style={style}>
      {heading && <Title>{heading}</Title>}
      <Body>{view}</Body>
    </CardContainer>
  );
};

type Props = {
  heading?: any;
  view: any;
  style?: Object;
};

const CardContainer = styled.div.attrs({ className: "z-depth-2" })`
  width: 100%;
  background: white;
`;

const Title = styled.div`
  padding: 15px;
  color: white;
  font-size: 18px;
  text-transform: uppercase;
  background-color: #375a8c;
`;
const Body = styled.div`
  margin-bottom: 1%;
  padding: 2%;
`;
