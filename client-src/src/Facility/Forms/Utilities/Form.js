import React from "react";
import { Input, Row, Card, Col } from "react-materialize";
import { Alert, FormWizardNavigation } from "../../../common";
import { FieldArray } from "formik";
import PropTypes from "prop-types";
import styled from "styled-components";

const FormWrapper = styled.div`
  padding: 3rem;
`;

export function Form(props) {
  let { values, isSubmitting, handleSubmit } = props;

  const _renderCardHeading = title => {
    return (
      <div className="blue" style={{ padding: 15, color: "white" }}>
        {`Select All ${title} Available`}
      </div>
    );
  };

  return (
    <div test-id="utilitiesForm">
      <div className="mfl-tm-2" />

      {props.errors.length > 0 && (
        <Alert
          warning
          message={`Please Select at Least One: ${props.errors}`}
        />
      )}
      <FieldArray
        name="utilities"
        render={({ push, remove }) => (
          <div>
            <FormWrapper>
              <Row>
                {props.utilityTypes.map(card => {
                  return (
                    <Col s={6} m={6}>
                      <div
                        style={{
                          paddingBottom: "10px",
                          marginBottom: "10px",
                          borderBottom: "1px solid gray"
                        }}
                      >
                        {card.utility_type}
                      </div>
                      <Row>
                        {values.utilities &&
                          props.utilities
                            .filter(util => util.utility_type_id == card.id)
                            .map(utility => {
                              return (
                                <Input
                                  key={`${utility.id}`}
                                  s={4}
                                  type="checkbox"
                                  checked={values.utilities.includes(
                                    utility.id
                                  )}
                                  name="utilities"
                                  label={utility.utility_name}
                                  onChange={() => {
                                    if (!values.utilities.includes(utility.id))
                                      push(utility.id);
                                    else {
                                      remove(
                                        values.utilities.findIndex(
                                          util => util == utility.id
                                        )
                                      );
                                    }
                                  }}
                                />
                              );
                            })}
                      </Row>
                    </Col>
                  );
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
        )}
      />
    </div>
  );
}

Form.propTypes = {};
