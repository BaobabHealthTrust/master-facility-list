//@flow
import React from "react";
import { Input, Row, Card, Col } from "react-materialize";
import { Alert, FormWizardNavigation } from "../../../common";
import { FieldArray } from "formik";
import {
  Utility,
  Facility,
  UtilityType,
  FacilityUtility
} from "../../../types/model-types";
import { Formik } from "formik";
import styled from "styled-components";

type Props = {
  response: any,
  utilityTypes: Array<UtilityType>,
  utilities: Array<Utility>,
  onNext: Function,
  facility: Facility,
  fromAdd: ?boolean,
  currentUtilities: Array<FacilityUtility>
};

const Container = styled.div.attrs({
  className: "container"
})``;

class UtilitiesForm extends React.Component<Props> {
  state = {
    errors: []
  };

  inputField = [];

  _renderCardHeading = title => {
    return (
      <div className="blue" style={{ padding: 15, color: "white" }}>
        {`Select All ${title} Available`}
      </div>
    );
  };

  _validate = values => {
    let errors = [];
    this.props.utilityTypes.forEach(type => {
      const utilitiesOfAType = this.props.utilities.filter(
        util => util.utility_type_id == type.id
      );

      if (!utilitiesOfAType.some(util => values.utilities.includes(util.id))) {
        errors.push(type.utility_type);
      }
    });
    return errors;
  };

  _onNext = async (values, { setSubmitting }) => {
    let errors = this._validate(values);

    if (errors.length > 0) {
      this.setState({ errors });
      setSubmitting(false);
      return;
    }

    this.props.onSubmit(values.utilities);
    setSubmitting(false);
  };

  _renderForm = props => {
    var { values, isSubmitting, handleSubmit } = props;

    return (
      <div test-id="utilitiesForm">
        <div className="mfl-tm-2" />
        {this.state.errors.length > 0 && (
          <Alert
            warning
            message={`Please Select at Least One: ${this.state.errors}`}
          />
        )}
        <FieldArray
          name="utilities"
          render={({ push, remove }) => (
            <div>
              {this.props.utilityTypes.map(card => {
                return (
                  <Col m={12} s={12}>
                    <Card
                      header={this._renderCardHeading(
                        `Select ${card.utility_type}`
                      )}
                    >
                      <Row>
                        {values.utilities &&
                          this.props.utilities
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
                    </Card>
                  </Col>
                );
              })}
              <FormWizardNavigation
                saveButton={this.props.fromAdd ? "Next" : "Save"}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                handleCancel={() => this.props.cancel()}
              />
            </div>
          )}
        />
      </div>
    );
  };
  render() {
    return (
      <Container>
        <Formik
          enableReinitialize={true}
          initialValues={this.props.initalValues}
          onSubmit={this._onNext}
          render={props => this._renderForm(props)}
        />
      </Container>
    );
  }
}

export default UtilitiesForm;
