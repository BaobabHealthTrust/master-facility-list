import React from "react";
import styled from "styled-components";

function index(props: Props) {
  const { icon, title, options } = props;
  return (
    <Container>
      <TitleContainer>
        <Icon>{icon}</Icon>
        {title && title.toUpperCase()}
      </TitleContainer>
      {options && <div>{options}</div>}
    </Container>
  );
}

type Props = {
  title: string;
  icon: any;
  options?: any;
};

const Container = styled.div`
  display: flex;

  justify-content: space-between;
`;
const Icon = styled.div`
  margin-right: 15px;
`;

const TitleContainer = styled.div`
  font-size: 26px;
  display: flex;
`;

export default index;
