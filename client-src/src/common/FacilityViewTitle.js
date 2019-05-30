import React from "react";
import styled from "styled-components";

function index(props: Props) {
  const { icon, title } = props;
  return (
    <Container>
      <Icon>{icon}</Icon>
      {title}
    </Container>
  );
}

type Props = {
  title: string,
  icon: any
};

const Container = styled.div`
  display: flex;
  font-size: 26px;
`;
const Icon = styled.div`
  margin-right: 15px;
`;

export default index;
