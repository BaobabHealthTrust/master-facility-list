import React from "react";
import Card from "../../atoms/Card";

const Welcome = (props: Props) => {
  const { districts } = props;
  const view = districts.length > 0 ? <>Welcome</> : <>Welcome</>;
  const title =
    districts.length > 0
      ? "Currently showing statistics from :"
      : "Currently showing National level Facilities Statistics";
  return <Card heading={title} view={view} />;
};

export default Welcome;
type Props = {
  districts: Array<any>;
};
