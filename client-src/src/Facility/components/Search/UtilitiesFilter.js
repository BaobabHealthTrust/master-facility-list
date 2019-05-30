import React from "react";
import { Input } from "react-materialize";
import styled from "styled-components";
import { connect } from "react-redux";

const Container = styled.div`
  padding: 15px 30px;
`;
export function UtilitiesFilter(props) {
  const utilitiesFields = props.utilityTypes.map(utilityType => {
    const utilitiesForType = props.utilities
      .filter(utility => utility.utility_type_id == utilityType.id)
      .map(utility => {
        return {
          id: utility.id,
          type: "utilities",
          label: utility.utility_name
        };
      });
    return {
      label: utilityType.utility_type,
      options: utilitiesForType
    };
  });

  return (
    <Container>
      {utilitiesFields.map(field => (
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
    utilities: state.facilities.utilities,
    utilityTypes: state.dependancies.utilityTypes
  };
};

export default connect(mapStateToProps)(UtilitiesFilter);
