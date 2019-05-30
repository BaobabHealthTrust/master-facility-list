import React from "react";
import { Col, Card } from "react-materialize";
import styled from "styled-components";

export function ServicesContainer(props) {
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

  const getResourceTypeIcon = serviceType => {
    switch (serviceType.toUpperCase()) {
      case "Clinical Services".toUpperCase():
        return "directions_bus";
      case "Therapeutical Services".toUpperCase():
        return "airline_seat_individual_suite";
      case "Prosthetics and Medical Devices Services".toUpperCase():
        return "flash_off";
      case "Nutrition".toUpperCase():
        return "computer";
      case "Community Health Services".toUpperCase():
        return "home";
      case "Reproductive and child health Services".toUpperCase():
        return "home";
      case "Vaccination".toUpperCase():
        return "home";
      case "Diagnostics Services".toUpperCase():
        return "home";
      default:
        return "all_inclusive";
    }
  };

  const renderService = (service, levelStyles, level = 0) => {
    if (
      typeof service.children === "undefined" ||
      service.children.length === 0
    ) {
      return (
        <div style={levelStyles[level]}>{service.service.service_name}</div>
      );
    }
    return (
      <div style={levelStyles[level]}>
        {service.service.service_name}
        {service.children.map(ser =>
          renderService(ser, levelStyles, level + 1)
        )}
      </div>
    );
  };

  return (
    <div>
      <SectionTitle
        icon={getResourceTypeIcon(props.serviceHierachy.service_type)}
        text={props.serviceHierachy.service_type}
      />
      {props.serviceHierachy.services.map(service =>
        renderService(service, levelStyles)
      )}
    </div>
  );
}

function SectionTitle(props) {
  return (
    <div
      style={{
        paddingBottom: "10px",
        borderBottom: "1px solid gray",
        marginBottom: "10px"
      }}
    >
      <i
        className="material-icons"
        style={{
          display: "inline-block",
          padding: "0 0.5rem",
          verticalAlign: "middle",
          fontSize: "20px"
        }}
      >
        {props.icon}
      </i>
      <b>{props.text}</b>
    </div>
  );
}
