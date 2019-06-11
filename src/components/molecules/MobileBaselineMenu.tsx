import React from "react";
import styled from "styled-components";
import MenuItem from "../atoms/BaselineMenuItem";
import { setActivePage } from "../../services/redux/actions/ui";
import { connect } from "react-redux";
import { Paper } from "@material-ui/core";

function MobileBaselineMenu(props: Props) {
  const { items, setActivePage } = props;
  return (
    <Container>
      <Paper>
        <MenuContainer>
          {items.map(item => (
            <MenuItem
              item={item}
              active={item.active}
              setActivePage={setActivePage}
            />
          ))}
        </MenuContainer>
      </Paper>
    </Container>
  );
}

export default connect(
  null,
  { setActivePage }
)(MobileBaselineMenu);

const Container = styled.div.attrs({
  className: "hide-on-large-only"
})``;

const MenuContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10px 20px;
  background: #fff;
  color: black;
  font-size: 12px;
`;

type Props = {
  items: Array<{
    text: string;
    active: boolean;
    icon?: React.ReactElement;
    link?: string;
    name: string;
    options?: Array<any>;
  }>;
  setActivePage: Function;
};
