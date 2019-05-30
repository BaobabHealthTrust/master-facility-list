import React from "react";
import { Input, Row, Button, Pagination } from "react-materialize";
import { Alert, FormWizardNavigation } from "../../../common";
import { renderOptions } from "../../helpers/utilities";
import PropTypes from "prop-types";
import styled from "styled-components";

const FormWrapper = styled.div`
  padding: 3rem;
`;
export function Form(props) {
  let { isSubmitting, handleSubmit } = props;

  return (
    <div test-id="servicesForm">
      <div className="mfl-tm-2" />

      {props.errors.length > 0 && <Alert warning message={`${props.errors}`} />}
      <FormWrapper>
        <div className="row" style={{ minHeight: 300 }}>
          <div className="col m6 s12">
            <Row>
              <Input
                s={12}
                type="select"
                value={props.service.selectedServiceType}
                label="Select Service Type"
                onChange={e => props.onChange(e, "type")}
              >
                <option key="default" value="-1">
                  Select Service Type
                </option>
                {renderOptions(props.serviceTypes, "service_type")}
              </Input>
              {props.service.selectedServiceType > 0 && (
                <Input
                  s={12}
                  type="select"
                  label="Select Service"
                  onChange={e => props.onChange(e, "first")}
                >
                  <option key="default" value="-1">
                    Select Sub Service
                  </option>
                  {renderOptions(props.filteredServices(0), "service_name")}
                </Input>
              )}
            </Row>
            <Row>
              {props.filteredServices(props.service.firstLevelService).length >
                0 && (
                <Input
                  s={12}
                  type="select"
                  label="Select Sub Service"
                  onChange={e => props.onChange(e, "second")}
                >
                  <option key="default" value="-1">
                    Select Sub-sub Service
                  </option>
                  {renderOptions(
                    props.filteredServices(props.service.firstLevelService),
                    "service_name"
                  )}
                </Input>
              )}
              {props.filteredServices(props.service.secondLevelService).length >
                0 && (
                <Input
                  s={12}
                  type="select"
                  label="Select Sub-sub Service"
                  onChange={e => props.onChange(e, "third")}
                >
                  <option key="default" value="-1">
                    Select Sub Service
                  </option>
                  {renderOptions(
                    props.filteredServices(props.service.secondLevelService),
                    "service_name"
                  )}
                </Input>
              )}
              <Row>
                <Button
                  className="ml-6"
                  onClick={props.addService}
                  disabled={isSubmitting}
                >
                  Add Service
                </Button>
              </Row>
            </Row>
          </div>
          <div className="col m6 s12">
            <h6 className="mb-4 flex items-center">
              <i className="material-icons mr-4">verified_user</i> Services
            </h6>
            {props.renderSelectedServices()}
          </div>
        </div>
      </FormWrapper>
      <FormWizardNavigation
        saveButton={isSubmitting ? "Saving..." : "Save"}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        handleCancel={() => props.cancel()}
      />
    </div>
  );
}

Form.propTypes = {};
