import React from "react";
import { Input, Row, Card, Col } from "react-materialize";
import { Alert, FormWizardNavigation } from "../../../common";
import { FieldArray } from "formik";
import PropTypes from "prop-types";

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
            {props.utilityTypes.map(card => {
              return (
                <Col m={12} s={12}>
                  <Card
                    header={_renderCardHeading(`Select ${card.utility_type}`)}
                  >
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
                                checked={values.utilities.includes(utility.id)}
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
                  </Card>
                </Col>
              );
            })}
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
