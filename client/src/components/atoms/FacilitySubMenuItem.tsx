import React from "react";
import styled from "styled-components";

const Container = styled.div`
  cursor: pointer;
  margin-bottom: 0.5rem;
  border-left: 4px solid #94afd0;
  padding: 1rem !important;
  color: #505050 !important;
  i {
    display: inline-block;
    padding: 0 0.5rem;
    vertical-align: middle;
    font-size: 20px;
  }
`;
export default function MenuItem(props: Props) {
  const { onClickValue, onClick, active, icon, label } = props;
  return (
    <Container
      style={{ background: active ? "#dee9f6" : "white" }}
      onClick={() => onClick(onClickValue)}
      data-test={label.replace(" ", "")}
    >
      <i>{icon}</i>
      {label}
    </Container>
  );
}

type Props = {
  onClick: Function;
  active: boolean;
  label: string;
  onClickValue: any;
  icon: any;
};
