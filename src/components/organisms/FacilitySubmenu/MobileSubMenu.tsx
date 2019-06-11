import React from "react";
import styled from "styled-components";
import { Tab, Tabs } from "@material-ui/core";

function index(props: Props) {
  const { menu, activePage, onClick } = props;

  const handleChange = (e: any, value: any) => {
    onClick(menu[value].link);
  };

  const value = menu
    .map(v => v.link.toLowerCase())
    .indexOf(activePage.toLowerCase());

  return (
    <Tabs
      value={value < 0 ? 0 : value}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      variant="scrollable"
    >
      {menu.map(item => (
        <Tab key={item.name} label={item.name} icon={item.icon} />
      ))}
    </Tabs>
  );
}

export default index;

type Props = {
  menu: Array<any>;
  activePage: any;
  onClick: Function;
};
const Container = styled.div``;
