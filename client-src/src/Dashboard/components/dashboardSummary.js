import React from "react";
import { MflCardGeneric } from "../../common";
import { DistrictTag } from "./";

export default props => {
  const districtTags = (
    <div>
      {props.districts.map((district, index) => {
        return (
          <DistrictTag
            key={index}
            district={district}
            onClick={props.closeTag}
          />
        );
      })}
    </div>
  );

  const content = (
    <h5>
      Welcome to the <strong> Master Health Facility Register of Malawi</strong>.
      <span className="hide-on-small-only">
        You may Select any of the districts to your left to filter the charts
        below.
      </span>
    </h5>
  );

  const heading = props.districts.length
    ? "Currently showing statistics from : "
    : "Currently showing National level Facilities Statistics";
  const view = props.districts.length ? districtTags : content;

  return <MflCardGeneric heading={heading} view={view} />;
};
