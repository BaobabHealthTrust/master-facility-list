import React, { ReactElement } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setActivePage } from "../../services/redux/actions/ui";
import DropDownMenu from "../atoms/DropdownMenu";

function MenuItem(props: Props) {
  const { item, active, body, setActivePage, dropdown } = props;

  return dropdown ? (
    <DropDownMenu
      active={active}
      options={item.options}
      menu={body}
      onClickOption={() => {
        setActivePage(item.name);
      }}
    />
  ) : (
    <Link
      style={{ height: "100%" }}
      to={item.link && item.link}
      onClick={() => {
        if (item.link) {
          setActivePage(item.name);
          item.onClick && item.onClick();
        }
      }}
    >
      <Container active={active}>{body}</Container>
    </Link>
  );
}

export default connect(
  null,
  { setActivePage }
)(MenuItem);

type Props = {
  body: string | ReactElement;
  active: boolean;
  item: any;
  setActivePage: Function;
  dropdown?: boolean;
};

const Container = styled<any>("div")`
  border-bottom: ${props => props.active && "3px solid white"};
  background-color: ${props => props.active && "rgba(0,0,0,0.2)"};
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0px 20px;
  cursor: pointer;
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
