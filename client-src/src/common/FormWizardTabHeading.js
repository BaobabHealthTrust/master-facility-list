import React from 'react';

export default (props) => {
  return (
    <div className={props.active == props.title ? "mfl-active-form-wizard" : ""}>
      <span>{props.index}</span> {props.title}
    </div>
  )
}
