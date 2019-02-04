import React, { Component, Fragment } from "react";
import { MflCardGeneric } from "../../common";
import ReactTooltip from "react-tooltip";
import { Path, districtsData } from "./components";

class FacilitiesMap extends Component {
  isHiglighted = district => this.props.districts.includes(district);

  _renderFilterMap = () => (
    <g id="Map-Filter" transform="translate(26.000000, 160.000000)">
      <g id="districts" transform="translate(42.000000, 71.000000)">
        {districtsData.map(district => {
          return (
            <Path
              key={district.name}
              district={district}
              districts={this.props.districts}
              onClick={this.props.onClick}
            />
          );
        })}
      </g>
    </g>
  );

  render() {
    const view = (
      <Fragment>
        <svg
          id="svg"
          className="map"
          viewBox="0 0 195 481"
          version="1.1"
          style={{ height: this.props.height - 10 }}
        >
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g
              id="Dashboard"
              transform="translate(-68.000000, -231.000000)"
              fill="#9D9D9D"
            >
              {this._renderFilterMap()}
            </g>
          </g>
        </svg>
        <ReactTooltip id="svgTooltip" />
      </Fragment>
    );
    return <MflCardGeneric heading="Select District" view={view} />;
  }
}

export default FacilitiesMap;
