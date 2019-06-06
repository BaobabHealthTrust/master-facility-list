import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input, Row, Col } from "react-materialize";
import { DatePicker, FormWizardNavigation } from "../../../common";
import { Modal, Paper, withStyles } from "@material-ui/core";
import { renderOptions } from "../../helpers/utilities";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faSave,
  faPlus,
  faMinus
} from "@fortawesome/free-solid-svg-icons";
import { Card } from "../../../common/MflCardGeneric";

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
    isSubmitting,
    setFieldValue,
    facilityTypes,
    operationalStatuses,
    regulatoryStatuses,
    facilityOwners,
    districts
  } = props;
  return (
    <div test-id="basicDetailsForm">
      <div className="mfl-tm-2" />
      <FormWrapper>
        <Row>
          <Input
            s={6}
            value={values.facilityName}
            name="facilityName"
            labelClassName="mfl-max-width"
            label="Facility Name"
            placeholder="Enter Facility Name"
            error={touched.facilityName && errors.facilityName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            s={6}
            value={values.commonName}
            name="commonName"
            labelClassName="mfl-max-width"
            label="Common Name"
            placeholder="Enter Common Name"
            error={touched.commonName && errors.commonName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Row>
        <Row>
          <Input
            s={6}
            type="select"
            label="Select Facility Type"
            onChange={e => setFieldValue("facilityType", e.target.value)}
            value={values.facilityType}
            name="facilityType"
          >
            {renderOptions(facilityTypes, "facility_type")}
          </Input>
          <Input
            s={6}
            type="select"
            onChange={e => setFieldValue("operationalStatus", e.target.value)}
            label="Select Operational Status"
            value={values.operationalStatus}
            name="operationalStatus"
          >
            {renderOptions(operationalStatuses, "facility_operational_status")}
          </Input>
        </Row>
        <Row>
          <Input
            s={6}
            type="select"
            onChange={e => setFieldValue("regulatoryStatus", e.target.value)}
            label="Select Facility Regulatory Status"
            name="regulatoryStatus"
            value={values.regulatoryStatus}
          >
            {renderOptions(regulatoryStatuses, "facility_regulatory_status")}
          </Input>
          <Input
            s={3}
            type="select"
            onChange={e => setFieldValue("facilityOwner", e.target.value)}
            label="Select Facility Owner"
            value={values.facilityOwner}
            name="facilityOwner"
          >
            {renderOptions(facilityOwners, "facility_owner")}
          </Input>
          <Input
            s={3}
            type="select"
            onChange={e => setFieldValue("district", e.target.value)}
            label="Select Facility District"
            value={values.district}
            name="facilitDistrict"
          >
            {renderOptions(districts, "district_name")}
          </Input>
        </Row>
        <Row>
          <DatePicker
            suffix="Opened"
            year={
              !props.fromAdd &&
              values.dateOpened &&
              values.dateOpened.split("-")[0]
            }
            month={
              !props.fromAdd &&
              values.dateOpened &&
              values.dateOpened.split("-")[1]
            }
            day={
              !props.fromAdd &&
              values.dateOpened &&
              values.dateOpened.split("-")[2]
            }
            onChange={date => setFieldValue("dateOpened", date)}
          />
          <Input
            s={6}
            label="Registration Number"
            placeholder="Enter Registration Number"
            name="registrationNumber"
            labelClassName="mfl-max-width"
            value={values.registrationNumber}
            error={touched.registrationNumber && errors.registrationNumber}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {!props.fromAdd && (
            <SystemsModal setFieldValue={setFieldValue} values={values} />
          )}
        </Row>
      </FormWrapper>
      <FormWizardNavigation
        saveButton={props.fromAdd ? "Next" : "Save"}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        handleCancel={() => props.cancel()}
      />
    </div>
  );
}

Form.propTypes = {};

class SystemsModal extends React.Component {
  state = {
    open: true,
    systems: [{ system: "", code: "", url: "" }]
  };
  componentDidMount() {
    this.setState({ open: false });
    this.setState({ systems: this.props.values.facility_code_mapping });
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.values) {
      let systems = [...this.props.values.facility_code_mapping];
      if (systems[systems.length - 1].system != "")
        systems.push({ system: "", code: "", url: "" });
      this.setState({ systems });
    }
  }

  onSave = () => {
    let systems = this.state.systems.filter(
      val => val.system != "" && val.code != "" && val.url != ""
    );
    this.props.setFieldValue("facility_code_mapping", systems);
    this.setOpen(false);
  };

  onChange = (index, value, field) => {
    let systems = [...this.state.systems];
    systems[index][field] = value;
    this.setState({ systems });
    if (index == systems.length - 1 && field == "url") {
      this.onAdd();
    }
  };

  onAdd = () => {
    let systems = this.state.systems;
    systems.push({ system: "", code: "", url: "" });
    this.setState({ systems });
  };

  onRemove = index => {
    let systems = [...this.state.systems];
    systems.splice(index, 1);
    this.setState({ systems });
  };

  onCancel = () => {
    let systems = [...this.props.values.facility_code_mapping];
    systems.push({ system: "", code: "", url: "" });
    this.setState({ systems });
  };

  setOpen = open => {
    this.setState({ open: open });
  };

  renderModalActions = (handleSubmit, isSubmitting) => (
    <div>
      <Button
        id="closeButton"
        disabled={isSubmitting}
        modal="close"
        flat
        waves="light"
      >
        cancel
      </Button>
      <Button
        disabled={isSubmitting}
        waves="light"
        className="blue darken-2"
        onClick={handleSubmit}
      >
        Save User
      </Button>
    </div>
  );
  render() {
    return (
      <React.Fragment>
        <Button
          icon={<FontAwesomeIcon icon={faLink} />}
          onClick={() => {
            this.setOpen(true);
          }}
        >
          Map Codes
        </Button>
        <StyledModal open={this.state.open}>
          <Paper
            style={{
              width: "600px",
              margin: "auto"
            }}
          >
            <div className="mfl-card-title  bg-blue">Map Facility Codes</div>
            <div className="mfl-p-2 mfl-bm-1">
              {this.state.systems.map((sys, index) => (
                <StyledRow>
                  <Input
                    s={3}
                    label="System"
                    placeholder="Enter System Name"
                    name={`system${index}`}
                    labelClassName="mfl-max-width"
                    value={this.state.systems[index].system}
                    onChange={e =>
                      this.onChange(index, e.target.value, "system")
                    }
                  />
                  <Input
                    s={3}
                    label="Code"
                    placeholder="Enter System Code"
                    name={`code${index}`}
                    labelClassName="mfl-max-width"
                    value={this.state.systems[index].code}
                    onChange={e => this.onChange(index, e.target.value, "code")}
                  />
                  <Input
                    s={3}
                    label="Url"
                    placeholder="Enter System Url"
                    name={`url${index}`}
                    labelClassName="mfl-max-width"
                    value={this.state.systems[index].url}
                    onChange={e => this.onChange(index, e.target.value, "url")}
                  />
                  <Col
                    m={3}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Button
                      style={{
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "0px"
                      }}
                      color={"red"}
                      className="right"
                      icon={<FontAwesomeIcon icon={faMinus} />}
                      onClick={() => {
                        this.onRemove(index);
                      }}
                    />
                  </Col>
                </StyledRow>
              ))}
              <Row>
                <Col m={12} style={{ textAlign: "right" }}>
                  <Button
                    color="#375a8c"
                    className="right"
                    icon={<FontAwesomeIcon icon={faSave} />}
                    onClick={() => {
                      this.onSave();
                    }}
                    text="Save Configuration"
                  />
                  <Button
                    color="transparent"
                    style={{ color: "black" }}
                    className="right"
                    onClick={() => {
                      this.onCancel();
                      this.setOpen(false);
                    }}
                    text="Or Cancel"
                  />
                </Col>
              </Row>
            </div>
          </Paper>
        </StyledModal>
      </React.Fragment>
    );
  }
}
const CardTitle = styled.div.attrs({
  className: "mfl-card-title  bg-blue"
})`
  margin: -24px;
  margin-bottom: 24px;
`;

const StyledModal = withStyles({
  root: {
    zIndex: 1500
  }
})(Modal);

const StyledRow = styled(Row)`
  display: flex;
  align-content: center;
`;

export function Button(props) {
  const { color, icon, text, onClick } = props;
  return (
    <button
      onClick={onClick}
      className={`ml-3 waves-effect btn`}
      style={{ backgroundColor: color, ...props.style }}
    >
      {icon} {text}
    </button>
  );
}
