import React from "react";
import { Paper, CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Progress } from "../../../common/Progress";

const CardContent = styled.div.attrs({
  className: "row"
})`
  padding: 30px 30px;
  padding-bottom: 60px;
  height: 300px;
  overflow: scroll;
  @media (max-width: 370px) {
    padding: 30px 0px;
    padding-bottom: 5px;
    height: auto;
  }
`;

const CardTitle = styled.div.attrs({
  className: "mfl-card-title  bg-blue"
})``;

export function DetailsCard(props) {
  return (
    <Paper
      style={{
        position: "relative",
        zIndex: "1"
      }}
    >
      <CardTitle>
        <div style={{ display: "flex" }}>
          <div>{props.title}</div>
          {props.isLoggedIn && (
            <div className="ml-auto">
              <Button
                margin
                text={props.btnText}
                icon="edit"
                className="ml-auto"
                color="#5a90dc"
                onClick={() => {
                  props.onEditBtnClick();
                }}
              />
            </div>
          )}
        </div>
      </CardTitle>
      <CardContent>
        {props.isLoading ? <Progress /> : props.children}
      </CardContent>
    </Paper>
  );
}

export default DetailsCard;

function Button(props) {
  const { color, icon, text } = props;
  const buttonClass = props.margin
    ? `waves-effect btn`
    : `mr-3 waves-effect btn`;
  return props.link ? (
    <Link
      className={buttonClass}
      to={props.link}
      style={{ backgroundColor: color }}
    >
      <i className="material-icons left">{icon}</i>
      {text}
    </Link>
  ) : (
    <Link
      className={buttonClass}
      style={{ backgroundColor: color }}
      to="#"
      onClick={() => props.onClick()}
    >
      <i className="material-icons left">{icon}</i>
      {text}
    </Link>
  );
}
