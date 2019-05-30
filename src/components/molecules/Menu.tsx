import React from "react";
import styled from "styled-components";
import MenuItem from "../atoms/MenuItem";

function Menu(props: Props) {
  const { items } = props;
  return (
    <Container className="hide-on-med-and-down">
      {items.map((item, index) => (
        <MenuItem
          key={index}
          body={item.text}
          active={item.active}
          item={item}
          dropdown={item.options ? true : false}
        />
      ))}
    </Container>
  );
}

export default Menu;

type Props = {
  items: Array<{
    text: string;
    active: boolean;
    icon?: React.ReactElement;
    link?: string;
    name: string;
    options?: Array<any>;
  }>;
};

const Container = styled.div`
  display: flex;
  text-align: right;
  justify-content: right;
  height: 100%;
  align-items: center;
`;
