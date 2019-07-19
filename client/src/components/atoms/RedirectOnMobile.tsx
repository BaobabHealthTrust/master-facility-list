import React from "react";
import { Redirect } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function RedirectOnMobile() {
  const matches = useMediaQuery("(max-width:960px)");
  return <div>{matches && <Redirect to="/notFound" />}</div>;
}

export default RedirectOnMobile;
