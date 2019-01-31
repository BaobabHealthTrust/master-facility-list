import React, { Component } from "react";

export default class DistrictTag extends Component {
  render() {
    const { district, onClick } = this.props;
    return (
      <div className="chip">
        {district}
        <i onClick={onClick} className="mfl-close material-icons" id={district}>
          close
        </i>
      </div>
    );
  }
}
