import React from "react";
import { Input, Row } from "react-materialize";
import { FormWizardNavigation } from "../../../common";
import PropTypes from "prop-types";
import styled from "styled-components";

const FormWrapper = styled.div`
  padding: 3rem;
`;

export function Form(props) {
  let {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    handleBlur,
    isSubmitting
  } = props;
  return (
    <div test-id="resourcesForm">
      <div className="mfl-tm-2">
        <FormWrapper>
          <Row>
            {props.resourceTypes.map(type => {
              return props.filteredResources(type.id).map(resource => {
                return (
                  <div>
                    <Input
                      s={3}
                      label={`${resource.resource_name}`}
                      placeholder={`Enter Total ${resource.resource_name}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values && values[`resource_${resource.id}`]}
                      error={
                        values &&
                        touched[`resource_${resource.id}`] &&
                        errors[`resource_${resource.id}`]
                      }
                      name={`resource_${resource.id}`}
                    />
                  </div>
                );
              });
            })}
          </Row>
        </FormWrapper>
        <FormWizardNavigation
          saveButton={props.fromAdd ? "Next" : "Save"}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          handleCancel={() => props.cancel()}
        />
      </div>
    </div>
  );
}

Form.propTypes = {};
