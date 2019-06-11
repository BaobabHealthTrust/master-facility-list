import React from "react";
import Card from "../../atoms/Card";
import FilterTags from "../../molecules/DashboardFilterTags";

const Welcome = (props: Props) => {
  const { districts, onRemoveFilter } = props;

  const view =
    districts.length > 0 ? (
      <FilterTags onRemove={onRemoveFilter} districts={districts} />
    ) : (
      <h1>
        Welcome to the{" "}
        <strong> Master Health Facility Register of Malawi</strong>.
        <span className="hide-on-small-only">
          You may Select any of the districts to your left to filter the charts
          below.
        </span>
      </h1>
    );
  const title =
    districts.length > 0
      ? "Currently showing statistics from :"
      : "Currently showing National level Facilities Statistics";
  return <Card heading={title}>{view}</Card>;
};

export default Welcome;
type Props = {
  districts: Array<any>;
  onRemoveFilter: Function;
};
