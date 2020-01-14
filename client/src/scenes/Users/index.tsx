import React from "react";
import UsersRedux from "./Users/Users.redux";

function index(props: any) {
  return <UsersRedux {...props}></UsersRedux>;
}

export default index;
