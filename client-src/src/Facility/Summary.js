import React, { Component } from "react";
import Card from "../common/MflCard";
import { connect } from "react-redux";
import { fetchCurrentDetails, setCurrentDetails, addFormValues, postFormData } from "../actions";
import moment from "moment";
import { BasicDetailsForm } from "./FacilityForms";

type State = {
  isEditBasic: boolean,
}

class Summary extends Component<State> {
  state = {
    isEditBasic: false,
  }

  submitEditBasicData = async () => {
    const id = this.props.match.params.id;
    const data = {
      facility_code: this.props.registrationNumber,
      facility_name: this.props.facilityName,
      common_name: this.props.commonName,
      facility_date_opened: this.props.dateOpened,
      facility_type_id: this.props.facilityType,
      facility_owner_id: this.props.facilityOwner,
      facility_operational_status_id: this.props.operationalStatus,
      facility_regulatory_status_id: this.props.regulatoryStatus,
      district_id: this.props.current.district.id,
      client_id: 1,
      clientId: 1
    };
    const token = sessionStorage.getItem("token");
    const resource = "/Facilities/" + id;
    const method = "patch";
    const actionName = "EDIT_FACILITY_BASIC_DATA";
    if (this.props.error.length === 0) {
      await this.props.postFormData(
        data,
        resource,
        method,
        actionName,
        token
      );
      if (this.props.postResponse.editBasicResponse.status === 200) {
        await this.props.fetchCurrentDetails(id);
        this.setState({ isEditBasic: false });
        await this.props.addFormValues("", "REMOVE_ALL_FORM_VALUES");
      }
    }
  }

  toggleEditBasic = () => {
    this.setState({ isEditBasic: true });
  }

  handleCancel = () => {
    this.props.addFormValues("", "REMOVE_ALL_FORM_VALUES");
    this.setState({ isEditBasic: false });
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchCurrentDetails(id);
    console.log(this.props.current);
  }

  componentWillReceiveProps(newProps) {
    const newId = newProps.match.params.id;
    newProps.fetchCurrentDetails(newId);
  }

  render() {
    const contactPersonData = this.props.current.contactPeople
      ? [
        [
          "Fullname",
          this.props.current.contactPeople.contact_person_fullname
        ],
        [
          "email",
          this.props.current.contactPeople.contact_person_email
        ],
        [
          "phone",
          this.props.current.contactPeople.contact_person_phone
        ]
      ]
      : [];

    const ownershipData =
      this.props.current.owner &&
        this.props.current.operationalStatus &&
        this.props.current.regulatoryStatus
        ? [
          ["owner", this.props.current.owner.facility_owner],
          [
            "operational Status",
            this.props.current.operationalStatus
              .facility_operational_status
          ],
          [
            "regulatory Status",
            this.props.current.regulatoryStatus
              .facility_regulatory_status
          ]
        ]
        : [];

    return (
      <div className="container">
        {sessionStorage.getItem("token") && (
          !this.state.isEditBasic ? (<a
            class="waves-effect waves-light green btn mfl-tab-btn-space-previous"
            onClick={this.toggleEditBasic}
          >
            <i class="material-icons left">edit</i> Edit
                      </a>) : (
              ""
            )
        )}
        {!this.state.isEditBasic ? (
          <div>
            <div className="row z-depth-2">
              <div className="col m6 s12">
                <p className="mfl-summary-header">Common Name</p>

                <p className="mfl-summary-text">
                  <i class="material-icons mfl-icon left">
                    text_fields
                            </i>
                  {this.props.current.common_name}
                </p>
                <br />
                <p className="mfl-summary-header">Facility Code</p>
                <p className="mfl-summary-text">
                  <i class="material-icons mfl-icon left">map</i>
                  {this.props.current.district
                    ? this.props.current.district.zone.zone_name
                    : ""}
                </p>
              </div>

              <div className="col m6 s12">
                <p className="mfl-summary-header">DATE OPENED</p>
                <p className="mfl-summary-text">
                  <i class="material-icons mfl-icon left">today</i>
                  {moment(
                    this.props.current.facility_date_opened
                  ).format("MMMM Do YYYY")}
                </p>

                <br />

                <p className="mfl-summary-header">Facility Type</p>
                <p className="mfl-summary-text">
                  <i class="material-icons mfl-icon left">
                    local_hospital
                            </i>
                  {this.props.current.facilityType
                    ? this.props.current.facilityType.facility_type
                    : ""}
                </p>
              </div>
            </div>

            <br />

            <div className="row">
              <div className="col l6 m12 s12">
                <Card
                  heading="contact person"
                  icon="person"
                  data={contactPersonData}
                />
              </div>

              <div className="col l6 m12 s12">
                <Card
                  heading="ownership & regulation"
                  icon="bookmark"
                  data={ownershipData}
                />
              </div>
            </div>
          </div>) : (<BasicDetailsForm
            submitBasicData={this.submitEditBasicData}
            facilityNameValue={this.props.current.facility_name}
            commonNameValue={this.props.current.common_name}
            facilityCodeValue={this.props.current.facility_code}
            dateOpenedValue={this.props.current.facility_date_opened}
            operationalStatusValue={this.props.current.facility_operational_status_id}
            regulatoryStatusValue={this.props.current.facility_regulatory_status_id}
            facilityTypeValue={this.props.current.facility_type_id}
            facilityOwnerValue={this.props.current.facility_owner_id}
            isEditBasic={this.state.isEditBasic}
            handleCancel={this.handleCancel}
            facilityOwners={this.props.facilityOwners}
            facilityTypes={this.props.facilityTypes}
            regulatoryStatuses={
              this.props.regulatoryStatuses
            }
            operationalStatuses={
              this.props.operationalStatuses
            }
          />)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    facilities: state.facilities.list,
    current: state.facilities.currentDetails,
    operationalStatuses: state.dependancies.operationalStatuses,
    regulatoryStatuses: state.dependancies.regulatoryStatuses,
    facilityOwners: state.dependancies.facilityOwners,
    facilityTypes: state.dependancies.facilityTypes,
    facilityName: state.formValues.facilityName,
    facilityNameError: state.formValues.facilityNameError,
    commonNameError: state.formValues.commonNameError,
    error: state.formValues.error,
    commonName: state.formValues.commonName,
    operationalStatus: state.formValues.operationalStatus,
    regulatoryStatus: state.formValues.regulatoryStatus,
    facilityType: state.formValues.facilityType,
    facilityOwner: state.formValues.facilityOwner,
    dateOpened: state.formValues.dateOpened,
    registrationNumber: state.formValues.registrationNumber,
    registrationNumberError: state.formValues.registrationNumberError,
    postResponse: state.postResponse,
  };
};

export default connect(mapStateToProps, {
  setCurrentDetails,
  fetchCurrentDetails,
  addFormValues,
  postFormData,
})(Summary);
