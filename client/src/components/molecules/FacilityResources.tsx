import React from "react";
import { Grid } from "@material-ui/core";
import SectionTitle from "../atoms/FacilityViewSectionTitle";
import FacilityDetail from "../atoms/FacilityDetail";
import { connect } from "react-redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faBed,
  faHome,
  faLaptop,
  faHospital,
  faPowerOff
} from "@fortawesome/free-solid-svg-icons";
// @ts-ignore
import { uniq, chunk } from "lodash";

library.add(faBus, faBed, faHome, faLaptop, faHospital, faPowerOff);

function FacilityDetails(props: Props) {
  const { resources, resourceTypes } = props;

  const getResourceTypeIcon = (resourceType: string) => {
    switch (resourceType.toUpperCase()) {
      case "TRANSPORT":
        return <FontAwesomeIcon icon={faBus} />;
      case "BEDS":
        return <FontAwesomeIcon icon={faBed} />;
      case "GENERATORS":
        return <FontAwesomeIcon icon={faPowerOff} />;
      case "COMPUTERS":
        return <FontAwesomeIcon icon={faLaptop} />;
      case "HOUSING":
        return <FontAwesomeIcon icon={faHome} />;
      default:
        return <FontAwesomeIcon icon={faHospital} />;
    }
  };

  const getPresentTypes = (
    resources: Array<any>,
    resourceTypes: Array<any> = []
  ) =>
    resourceTypes.filter(res =>
      uniq(resources.map(res => res.resource.resource_type_id)).includes(res.id)
    );

  const getResourcesByType = (type: any, resources: any) =>
    resources
      .filter((res: any) => res.resource.resource_type_id === type.id)
      .map((res: any) => [res.resource.resource_name, String(res.quantity)]);

  const renderResourcesForType = (type: any, resources: any) => {
    var data = getResourcesByType(type, resources);
    return (
      <>
        <SectionTitle
          icon={getResourceTypeIcon(type.resource_type)}
          text={type.resource_type}
        />
        {data.map((data: any) => (
          <FacilityDetail key={data[0]} label={data[0]} text={data[1]} />
        ))}
      </>
    );
  };

  const presentTypes = resources
    ? getPresentTypes(resources, resourceTypes)
    : [];

  const typeChunks = chunk(presentTypes, 3);

  return (
    <Grid container>
      {typeChunks.map((chunk: any) => {
        return (
          <>
            {chunk.map((type: any) => (
              <Grid key={type} xs={12} sm={6} md={4}>
                {renderResourcesForType(type, resources)}
              </Grid>
            ))}
          </>
        );
      })}
    </Grid>
  );
}

const mapStateToProps = (state: any) => ({
  resourceTypes: state.dependancies.resources.types
});

export default connect(mapStateToProps)(FacilityDetails);

type Props = {
  resources: any;
  resourceTypes?: Array<any>;
};
