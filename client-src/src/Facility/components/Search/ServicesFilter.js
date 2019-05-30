import React from "react";
import { Input } from "react-materialize";
import styled from "styled-components";
import { connect } from "react-redux";

const Container = styled.div`
  padding: 15px 30px;
`;
export function ServicesFilter(props) {
  const servicesFields = props.serviceTypes.map(serviceType => {
    const servicesForType = props.services
      .filter(service => service.service_type_id == serviceType.id)
      .map(service => {
        return {
          id: service.id,
          type: "services",
          label: service.service_name
        };
      });
    return {
      label: serviceType.service_type,
      options: servicesForType
    };
  });

  return (
    <Container>
      {servicesFields.map(field => (
        <Input
          key={field.label}
          type="select"
          label={`Filter By ${field.label}`}
          onChange={(e, value) => {
            props.onAddFilter(field.options[value]);
          }}
        >
          {field.options.map((option, index) => (
            <option key={option.id} value={index}>
              {option.label}
            </option>
          ))}
        </Input>
      ))}
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    services: state.facilities.services,
    serviceTypes: state.dependancies.serviceTypes
  };
};

export default connect(mapStateToProps)(ServicesFilter);
