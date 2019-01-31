import React, { Component } from "react";
import { GenericCard } from "../components";

export default class FacilitySummaryCard extends Component {
  render() {
    const { count, title, icon } = this.props;
    return (
      <div className="col s12 l3 col-5">
        <GenericCard count={count} title={title} icon={icon} />
      </div>
    );
  }
}
