import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Tooltip } from "@material-ui/core";

const CustomLink = styled(Link).attrs({
  className: "col m12 s3"
})`
  margin-bottom: 0.5rem;
  border-left: 4px solid #94afd0;
  padding: 1rem !important;
  color: #505050 !important;
  i {
    display: inline-block;
    padding: 0 0.5rem;
    vertical-align: middle;
    font-size: 20px;
  }
`;
export default function MenuItem(props) {
  const { link, active } = props;
  return (
    <CustomLink
      style={{ background: active ? "#dee9f6" : "white" }}
      to={(link.redirect && link.redirect) || ""}
      onClick={() => props.handleClick(link.name, link.clickHandler)}
    >
      <i style={{ paddingRight: "15px" }}>{link.icon}</i>
      <div className="hide-on-small-only" style={{ display: "inline" }}>
        {link.displayName}
      </div>
    </CustomLink>
  );
}
