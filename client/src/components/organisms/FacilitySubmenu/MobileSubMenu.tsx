import React from "react";
import styled from "styled-components";
import { Tab, Tabs, withStyles } from "@material-ui/core";

function index(props: Props) {
  const { menu, activePage, onClick } = props;

  const handleChange = (e: any, value: any) => {
    onClick(menu[value].link);
  };

  const value = menu
    .map(v => v.link.toLowerCase())
    .indexOf(activePage.toLowerCase());

  return (
    <StyledTabs
      value={value < 0 ? 0 : value}
      onChange={handleChange}
      variant="scrollable"
    >
      {menu.map(item => (
        <Tab key={item.name} label={item.name} />
      ))}
    </StyledTabs>
  );
}

export default index;

type Props = {
  menu: Array<any>;
  activePage: any;
  onClick: Function;
};

const StyledTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
    backgroundColor: "#5a90dc",
    color: "white"
  },
  indicator: {
    backgroundColor: "#fffe9b",
    color: "white"
  }
})(Tabs);
