import React, { Component } from "react";
import { MflCardGeneric } from "../../../../common";
import ReactTooltip from "react-tooltip";
import { Path, districtsData } from "./modules";

class FacilitiesMap extends Component {
  isHiglighted = district => this.props.districts.includes(district);
  render() {
    const view = (
      <div>
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
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <g
              id="Dashboard"
              transform="translate(-68.000000, -231.000000)"
              fill="#9D9D9D"
            >
              <g id="Map-Filter" transform="translate(26.000000, 160.000000)">
                <g id="districts" transform="translate(42.000000, 71.000000)">
                  {districtsData.map(district => {
                    return (
                      <Path
                        district={district}
                        districts={this.props.districts}
                        onClick={this.props.onClick}
                      />
                    );
                  })}
                </g>
              </g>
            </g>
          </g>
        </svg>
        <ReactTooltip id="svgTooltip" />
      </div>
    );

    return <MflCardGeneric heading="Select District" view={view} />;
  }
}

export default FacilitiesMap;
