//@flow
import React, { Component } from "react";
import { Input, Navbar, NavItem, Row, Button, Card, Col, Modal } from "react-materialize";
import { connect } from "react-redux";
import { DatePicker, FormWizardNavigation } from '../../common';
import { BasicDetailsFormProps } from '../../types/helper-types';
import { Formik, FieldArray } from 'formik';
import { postFormData } from '../../actions';
import yup from 'yup';
import { Redirect } from 'react-router-dom';
import { chunk } from 'lodash';
import { renderOptions } from './helpers';
import { Utility, FacilityResource, Facility, UtilityType, FacilityUtility }
  from '../../types/model-types';

type Props = {
  response: any,
  utilityTypes: Array<UtilityType>,
  utilities: Array<Utility>,
  onNext: Function,
  facility: Facility,
  fromAdd: ?boolean,
  currentUtilities: Array<FacilityUtility>
}

class UtilitiesForm extends React.Component<Props> {

  state = {
    cancelForm: false
  }

  _getInitialState = () => {
    if (this.props.fromAdd) return { utilities: [] };

    const utilities = this.props.currentUtilities.map(util => util.utility_id);
    return { utilities };
  }

  // TODO: Maybe this could go somewhere
  _getFacilityId = async () => {
    const facilityId = this.props.fromAdd
      ? (await this.props.facility.id || 1)
      : Number(await this.props.match.params.id)
    return facilityId;
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
      const id = await this._getFacilityId();
      const date = new Date()
      const data = values.utilities.map(util => {
        return {
          facility_id: id,
          utility_id: util,
          client_id: 1,
          created_date: date
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
      if (this.props.response.length > 0 && this.props.fromAdd) this.props.onNext();
      if (this.props.response.length > 0 && !this.props.fromAdd) this.setState({ cancelForm: true });
    } else {
      setSubmitting(false);
    }
  }

  _handleChange = (id) => {
    this.setState({ selectedUtilities: [...this.state.selectedUtilities, id] })
  }

  render() {
    return (
      <div className="container">
        {(this.state.cancelForm && this.props.fromAdd) && <Redirect to='/facilities' />}
        {
          (this.state.cancelForm && !this.props.fromAdd) &&
          <Redirect to={`/facilities/${this.props.match.params.id}/utilities`} />
        }
        <div className="mfl-tm-2" />
        <Formik
          initialValues={this._getInitialState()}
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
                    {console.log(values)}
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
                                          checked={values.utilities.includes(utility.id)}
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
                      saveButton={this.props.fromAdd ? 'Next' : 'Save'}
                      handleSubmit={handleSubmit}
                      isSubmitting={isSubmitting}
                      handleCancel={() => this.setState({ cancelForm: true })}
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
    currentUtilities: state.facilities.currentUtilities.data
  }
}

export default connect(mapStateToProps, {
  postFormData
})(UtilitiesForm);
