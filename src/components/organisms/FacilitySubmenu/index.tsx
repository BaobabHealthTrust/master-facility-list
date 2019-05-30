import React from "react";
import styled from "styled-components";
import MenuItem from "../../atoms/FacilitySubMenuItem";

function index(props: Props) {
  const { menu, activePage, onClick } = props;
  return (
    <Container>
      {menu.map(item => (
        <MenuItem
          active={item.link == activePage}
          label={item.name}
          onClickValue={item.link}
          onClick={onClick}
          icon={item.icon}
        />
      ))}
    </Container>
  );
}

export default index;

type Props = {
  menu: Array<any>;
  activePage: any;
  onClick: Function;
};
const Container = styled.div`
  width: 100%;
  margin: 2% -2%;
  min-height: 70vh;
  white-space: nowrap;
  @media (max-width: 390px) {
    min-height: 0px;
  }
`;
