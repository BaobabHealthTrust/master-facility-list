import React from "react";
import { Grid } from "@material-ui/core";
import SectionTitle from "../atoms/FacilityViewSectionTitle";
import FacilityDetail from "../atoms/FacilityDetail";
import { connect } from "react-redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faFilter,
  faMobile,
  faTrash,
  faCogs
} from "@fortawesome/free-solid-svg-icons";
// @ts-ignore
import { uniq, chunk } from "lodash";

library.add(faBolt, faFilter, faMobile, faTrash, faCogs);

function FacilityDetails(props: Props) {
  const { utilities, utilityTypes } = props;

  const getUtilityTypeIcon = (utilityType: any) => {
    switch (utilityType.toUpperCase()) {
      case "ENERGY PROOVIDER":
        return <FontAwesomeIcon icon={faBolt} />;
      case "WATER PROVIDER":
        return <FontAwesomeIcon icon={faFilter} />;
      case "WASTE DISPOSAL":
        return <FontAwesomeIcon icon={faTrash} />;
      case "NETWORK PROVIDER":
        return <FontAwesomeIcon icon={faMobile} />;
      default:
        return <FontAwesomeIcon icon={faCogs} />;
    }
  };

  const getPresentTypes = (
    utilities: Array<any>,
    utilityTypes: Array<any> = []
  ) =>
    utilityTypes.filter(res =>
      uniq(utilities.map(res => res.utility.utility_type_id)).includes(res.id)
    );

  const getUtilitiesByType = (type: any, utilities: any) =>
    utilities
      .filter((res: any) => res.utility.utility_type_id === type.id)
      .map((res: any) => [res.utility.utility_name]);

  const renderUtilitiesForType = (type: any, utilities: any) => {
    var data = getUtilitiesByType(type, utilities);
    return (
      <>
        <SectionTitle
          icon={getUtilityTypeIcon(type.utility_type)}
          text={type.utility_type}
        />
        {data.map((data: any) => (
          <FacilityDetail key={data[0]} label={""} text={data[0]} />
        ))}
      </>
    );
  };

  const presentTypes = utilities
    ? getPresentTypes(utilities, utilityTypes)
    : [];

  const typeChunks = chunk(presentTypes, 3);

  return (
    <Grid container>
      {typeChunks.map((chunk: any) => {
        return (
          <>
            {chunk.map((type: any) => (
              <Grid key={type} xs={12} sm={6} md={4}>
                {renderUtilitiesForType(type, utilities)}
              </Grid>
            ))}
          </>
        );
      })}
    </Grid>
  );
}

const mapStateToProps = (state: any) => ({
  utilityTypes: state.dependancies.utilities.types
});

export default connect(mapStateToProps)(FacilityDetails);

type Props = {
  utilities: any;
  utilityTypes?: Array<any>;
};
