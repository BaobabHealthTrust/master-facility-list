import React from "react";
import { Link } from "react-router-dom";

function BaselineMenuItem(props: Props) {
  const { item, setActivePage, active } = props;
  return (
    <Link to={item.link} onClick={() => setActivePage(item.name)}>
      <div style={{ textAlign: "center", color: active ? "#375a8c" : "black" }}>
        <div>{item.icon}</div>
        <div>{item.text}</div>
      </div>
    </Link>
  );
}
type Props = {
  active: boolean;
  item: any;
  setActivePage: Function;
};
export default BaselineMenuItem;
