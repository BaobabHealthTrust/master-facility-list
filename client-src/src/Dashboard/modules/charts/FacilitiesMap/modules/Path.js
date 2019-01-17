import React, { Component } from "react";

export default class Path extends Component {
  render() {
    const { name, boundary } = this.props.district;
    const isHiglighted = district => this.props.districts.includes(district);
    return (
      <path
        data-for="svgTooltip"
        className={isHiglighted(name) ? " mapClick" : ""}
        onClick={this.props.onClick}
        data-tip={name}
        d={boundary}
        title={name}
        xlinkTitle={name}
        id={name}
      />
    );
  }
}
