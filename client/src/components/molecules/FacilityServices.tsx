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
import { uniq, uniqWith, isEqual } from "lodash";

library.add(faBolt, faFilter, faMobile, faTrash, faCogs);

function FacilityDetails(props: Props) {
  const { services } = props;

  const levelStyles = [
    {
      fontSize: "16px",
      padding: "5px 0"
    },
    {
      borderTop: "1px #f1f1f1 solid",
      marginLeft: "11px",
      padding: "5px 0",
      marginTop: "5px"
    },
    { color: "#7d7d7d", marginLeft: "12px", fontSize: "12px" }
  ];

  const getServiceTypeIcon = (serviceType: string) => {
    switch (serviceType.toUpperCase()) {
      case "Clinical Services".toUpperCase():
        return <FontAwesomeIcon icon={faBolt} />;
      case "Therapeutical Services".toUpperCase():
        return <FontAwesomeIcon icon={faBolt} />;
      case "Prosthetics and Medical Devices Services".toUpperCase():
        return <FontAwesomeIcon icon={faBolt} />;
      case "Nutrition".toUpperCase():
        return <FontAwesomeIcon icon={faBolt} />;
      case "Community Health Services".toUpperCase():
        return <FontAwesomeIcon icon={faBolt} />;
      case "Reproductive and child health Services".toUpperCase():
        return <FontAwesomeIcon icon={faBolt} />;
      case "Vaccination".toUpperCase():
        return <FontAwesomeIcon icon={faBolt} />;
      case "Diagnostics Services".toUpperCase():
        return <FontAwesomeIcon icon={faBolt} />;
      default:
        return <FontAwesomeIcon icon={faBolt} />;
    }
  };

  const getServiceTypes = () =>
    services
      ? uniqWith(services.map((ser: any) => ser.serviceType), isEqual)
      : [];

  const getServicesByType = (type: any, services: any) =>
    services.filter((ser: any) => ser.service.service_type_id === type.id);

  const renderServicesForType = (type: any, services: any) => {
    var data = getServicesByType(type, services);
    return (
      <>
        <SectionTitle
          icon={getServiceTypeIcon(type.service_type)}
          text={type.service_type}
        />
        {data.map((data: any) => (
          <>{renderService(data, levelStyles)}</>
        ))}
      </>
    );
  };

  const renderService = (service: any, levelStyles: any, level = 0) => {
    const style =
      level > levelStyles.length - 1
        ? { ...levelStyles[2], marginLeft: `${level + 12}px` }
        : levelStyles[level];
    if (
      typeof service.children === "undefined" ||
      service.children.length === 0
    ) {
      return (
        <div data-test={`serviceDetail${level}`} style={style}>
          {service.service.service_name}
        </div>
      );
    }
    return (
      <div data-test={`serviceDetail${level}`} style={style}>
        {service.service.service_name}
        {service.children.map((ser: any) =>
          renderService(ser, levelStyles, level + 1)
        )}
      </div>
    );
  };

  const presentTypes = services ? getServiceTypes() : [];

  return (
    <Grid container data-test="servicesContainer">
      {presentTypes.map((type: any) => {
        return (
          <Grid key={type.id} xs={12} sm={6} md={6}>
            {renderServicesForType(type, services)}
          </Grid>
        );
      })}
    </Grid>
  );
}

export default FacilityDetails;

type Props = {
  services: any;
};
