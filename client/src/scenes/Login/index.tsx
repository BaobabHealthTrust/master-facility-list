import React from "react";
import LoginRedux from "./Login.redux";

function Login(props: Props) {
  return <LoginRedux {...(props as any)} />;
}
type Props = {
  history: any;
};

export default Login;
