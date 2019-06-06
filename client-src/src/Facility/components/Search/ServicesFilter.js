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

  const selectHasValue = (type, opts) => {
    let options = props.filterOptions.filter(
      val => val.type == type && opts.map(opt => opt.id).includes(val.id)
    );
    return options.length > 0;
  };

  const getValue = (options, value) =>
    value == -1
      ? { type: "services", id: -1, options: options.map(op => op.id) }
      : options[value];

  return (
    <Container>
      {servicesFields.map(field => (
        <Input
          key={field.label}
          type="select"
          label={`Filter By ${field.label}`}
          onChange={(e, value) => {
            props.onAddFilter(getValue(field.options, value));
          }}
        >
          <option
            selected={!selectHasValue("services", field.options)}
            value={-1}
          >
            {`All ${field.label}`}
          </option>
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
