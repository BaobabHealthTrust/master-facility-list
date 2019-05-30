import React from "react";
import { Input } from "react-materialize";
import styled from "styled-components";
import { connect } from "react-redux";
import SliderInput from "../../../common/SliderInput";

const Container = styled.div`
  padding: 15px 30px;
`;

export function ResourcesFilter(props) {
  const range = {
    min: 0,
    max: 1000
  };

  const initialResourceValues = props.filterOptions.filter(
    filter => filter.type == "resources"
  );

  const resourcesFieldsData = props.resources
    ? props.resources.map(resource => {
        return {
          name: resource.resource_name,
          id: resource.id,
          ...range,
          values: [range.min, range.max]
        };
      })
    : [];

  const onChange = (field, values) => {
    const value = {
      type: "resources",
      id: field.id,
      label: field.name,
      values,
      range: true
    };
    props.onAddFilter(value);
  };

  const setInitialValues = field => {
    let initialValues = initialResourceValues
      .filter(filter => filter.id == field.id)
      .map(filter => filter.values);

    return initialValues.length > 0
      ? {
          ...field,
          values: initialValues[0]
        }
      : field;
  };

  return (
    <Container>
      {resourcesFieldsData.map(field => {
        field = setInitialValues(field);

        return (
          <SliderInput
            field={field}
            onChange={(name, values) => onChange(field, values)}
          />
        );
      })}
    </Container>
  );
}
const mapStateToProps = state => {
  return {
    resources: state.facilities.resources
  };
};

export default connect(mapStateToProps)(ResourcesFilter);
