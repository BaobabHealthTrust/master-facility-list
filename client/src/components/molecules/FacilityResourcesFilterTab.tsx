import React from "react";
import styled from "styled-components";
import SliderInput from "../atoms/SliderInput/index.js";

const Container = styled.div`
  padding: 15px 30px;
`;

export function ResourcesFilter(props: any) {
  const { resources } = props.dependancies;
  const range = {
    min: 0,
    max: 1000
  };

  const initialResourceValues = props.filterOptions.filter(
    (filter: any) => filter.type == "resources"
  );

  const resourcesFieldsData = resources.list
    ? resources.list.map((resource: any) => {
        return {
          name: resource.resource_name,
          id: resource.id,
          ...range,
          values: [range.min, range.max]
        };
      })
    : [];

  const onChange = (field: any, values: any) => {
    const value = {
      type: "resources",
      id: field.id,
      label: field.name,
      values,
      range: true
    };
    props.onAddFilter(value);
  };

  const setInitialValues = (field: any) => {
    let initialValues = initialResourceValues
      .filter((filter: any) => filter.id == field.id)
      .map((filter: any) => filter.values);

    return initialValues.length > 0
      ? {
          ...field,
          values: initialValues[0]
        }
      : field;
  };

  return (
    <Container>
      {resourcesFieldsData.map((field: any) => {
        field = setInitialValues(field);

        return (
          <SliderInput
            field={field}
            onChange={(name: any, values: any) => onChange(field, values)}
          />
        );
      })}
    </Container>
  );
}

export default ResourcesFilter;
