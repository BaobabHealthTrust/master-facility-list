import React from "react";
import styled from "styled-components";

export default ({ heading, children, style }: Props) => {
  return (
    <CardContainer style={style}>
      {heading && <Title>{heading}</Title>}
      <Body>{children}</Body>
    </CardContainer>
  );
};

type Props = {
  heading?: any;
  style?: Object;
  children: any;
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
