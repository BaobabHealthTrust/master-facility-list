import React from "react";
import styled from "styled-components";
import Notifications from "react-notify-toast";

class Notification extends React.Component {
  render() {
    return <Notifications options={style} />;
  }
}

export default Notification;

const style = {
  position: "absolute",
  width: "100vw",
  top: "0",
  left: "0",
  height: "60px",
  background: "gray"
};
