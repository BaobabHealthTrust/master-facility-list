import React from "react";
import styled from "styled-components";
import { Paper } from "@material-ui/core";

export default (props: Props) => {
  const { heading, children, style, bodyStyle } = props;
  return (
    <Paper>
      <CardContainer style={style}>
        {heading && <Title>{heading}</Title>}
        <Body style={bodyStyle}>{children}</Body>
      </CardContainer>
    </Paper>
  );
};

type Props = {
  heading?: any;
  style?: Object;
  children: any;
  bodyStyle?: any;
};

const CardContainer = styled.div`
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
