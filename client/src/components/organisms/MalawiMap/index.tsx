import React, { Fragment, useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { Path, districtsData } from "./utils";
import PropTypes from "prop-types";

const MalawiMap = (props: Props) => {
  const { onClick, districtsSelected, fill, height, selectedColor } = props;

  const _renderFilterMap = () => {
    return (
      <g id="Map-Filter" transform="translate(26.000000, 160.000000)">
        <g id="districts" transform="translate(42.000000, 71.000000)">
          {districtsData.map(district => {
            return (
              <Path
                key={district.name}
                district={district}
                selectedDistricts={districtsSelected}
                onClick={() => onClick(district.name)}
                selectedColor={selectedColor}
              />
            );
          })}
        </g>
      </g>
    );
  };

  return (
    <Fragment>
      <svg
        id="svg"
        className="map"
        viewBox="0 0 195 481"
        version="1.1"
        style={{ height }}
      >
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="Malawi Map"
            transform="translate(-68.000000, -231.000000)"
            fill={fill}
          >
            {_renderFilterMap()}
          </g>
        </g>
      </svg>
      <ReactTooltip id="svgTooltip" />
    </Fragment>
  );
};

export default MalawiMap;

type Props = {
  onClick: Function;
  fill: string;
  height: number;
  selectedColor: string;
  districtsSelected: Array<string>;
};
