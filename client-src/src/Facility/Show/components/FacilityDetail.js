import React, { Fragment } from "react";

export default function FacilityDetail(props) {
  return (
    <div>
      <Fragment>
        <p className="mfl-summary-header">{props.title}</p>
        <p className="mfl-summary-text">
          <i className="material-icons mfl-icon left">{props.icon}</i>
          {props.label}
        </p>
        <br />
      </Fragment>
    </div>
  );
}
