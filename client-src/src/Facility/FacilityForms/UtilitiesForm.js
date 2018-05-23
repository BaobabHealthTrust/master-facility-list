//@flow
import React, { Component } from "react";
import { Input, Navbar, NavItem, Row, Button, Card, Col, Modal } from "react-materialize";
import { connect } from "react-redux";
import { DatePicker, FormWizardNavigation } from '../../common';
import { BasicDetailsFormProps } from '../../types/helper-types';
import { Formik, FieldArray } from 'formik';
import { postFormData } from '../../actions';
import yup from 'yup';
import { chunk } from 'lodash';
import { renderOptions } from './helpers';
import { Utility, FacilityResource, Facility, UtilityType } from '../../types/model-types';

type Props = {
  response: any,
  utilityTypes: Array<UtilityType>,
  utilities: Array<Utility>,
  onNext: Function,
  facility: Facility
}

class UtilitiesForm extends React.Component<Props> {

  initialValues = {
    utilities: []
  }

  componentDidMount() {
    this.props.utilities.forEach(utility => {
      const key = `utility_${utility.id}`;
    })
  }

  _renderCardHeading = (title) => {
    return (
      <div
        className="blue"
        style={{ padding: 15, color: 'white' }}
      >
        {`Select All ${title} Available`}
      </div>
    )
  }

  _validate = values => {
    let errors = [];
    this.props.utilityTypes.forEach(type => {
      const utilitiesOfAType = this.props
        .utilities
        .filter(util => util.utility_type_id == type.id);

      if (!utilitiesOfAType.some(util => values.utilities.includes(util.id))) {
        errors.push(type.utility_type)
      }
    })

    if (errors.length > 0) {
      alert(`Please Select at Least One ${errors[0]}`)
      return false;
    } else return true;
  }

  _handleSubmit = async (values, { setSubmitting, setErros }) => {
    if (this._validate(values)) {
      const data = values.utilities.map(util => {
        return {
          facility_id: this.props.facility.id || 1,
          utility_id: util,
          client_id: 1
        }
      })
      await this.props.postFormData(
        data,
        "FacilityUtilities",
        "POST",
        "POST_FACILITY_UTILITIES",
      );
      setSubmitting(false);
      await console.log(this.props.response);
      if (this.props.response.length > 0) this.props.onNext();
    } else {
      setSubmitting(false);
    }
  }

  _handleChange = (id) => {
    this.setState({ selectedUtilities: [...this.state.selectedUtilities, id] })
  }

  render() {
    return (
      <div>
        <div className="mfl-tm-2" />
        <Formik
          initialValues={this.initialValues}
          onSubmit={this._handleSubmit}
          render={({
            values,
            handleSubmit,
            isSubmitting,
          }) => (
              <FieldArray
                name="utilities"
                render={({ push, remove }) => (
                  <div>
                    {
                      this.props.utilityTypes.map(card => {
                        return (
                          <Col m={12} s={12}>
                            <Card horizontal header={this._renderCardHeading(`Select ${card.utility_type}`)}>
                              <Row>
                                {
                                  this.props.utilities
                                    .filter(util => util.utility_type_id == card.id).map(utility => {
                                      return (
                                        <Input
                                          s={4}
                                          type="checkbox"
                                          name="utilities"
                                          label={utility.utility_name}
                                          onChange={() => {
                                            if (!values.utilities.includes(utility.id))
                                              push(utility.id)
                                            else {
                                              remove(values.utilities.findIndex(util => util == utility.id))
                                            }
                                          }}
                                        />
                                      )
                                    })
                                }
                              </Row>
                            </Card>
                          </Col>
                        )
                      })
                    }
                    <FormWizardNavigation
                      handleSubmit={handleSubmit}
                      isSubmitting={isSubmitting}
                    />
                  </div>
                )}

              />
            )}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    utilityTypes: state.dependancies.utilityTypes,
    response: state.facilities.utilitiesResponse,
    utilities: state.facilities.utilities,
  }
}

export default connect(mapStateToProps, {
  postFormData
})(UtilitiesForm);
