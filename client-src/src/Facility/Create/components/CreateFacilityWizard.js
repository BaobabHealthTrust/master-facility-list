//@flow
import React, { Fragment } from "react";
import {
  BasicDetailsForm,
  ContactsForm,
  ResourcesForm,
  UtilitiesForm,
  ServicesForm,
  FinishedForm
} from "../../components/Forms";
import { setInitialValues } from "../../components/Forms/values";
import { connect } from "react-redux";
import { postFormData, fetchCurrentDetails } from "../../../actions";
import { FormWizardTabHeading } from "../../../common";
import { Redirect } from "react-router-dom";
import swal from "@sweetalert/with-react";
import {
  postBasicDetails,
  postContactDetails,
  addServices,
  addResources,
  addUtilities,
  publishFacility
} from "../../helpers/postFaclityDetails";
import { isLoggedIn, clearStorage } from "../../helpers/utilities";
import styled from "styled-components";

const WizardHeaderContainer = styled.div.attrs({
  className: "mfl-form-wizard"
})`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-size: 20;
  margin-top: 20;
`;
class CreateFacilityWizard extends React.Component<{}> {
  state = {
    active: "Basic Details",
    redirect: false,
    facility: {
      details: {},
      contact: {},
      resources: [],
      utilities: [],
      services: []
    },
    initalValues: {}
  };

  _onSubmit = async (values, key, nextTab) => {
    this._setFacilityDetails(key, values);
    if (nextTab == "Finish") {
      await this.handleSubmit();
      return;
    }
    this._setNextActiveTab(nextTab);
  };

  componentDidMount = () => {
    this._setInitialState();
    this.setState({ initalValues: setInitialValues(this.props, true) });
  };

  componentWillReceiveProps(nextProp) {
    if (nextProp.resources) {
      this.setState({ initalValues: setInitialValues(nextProp, true) });
    }
  }

  _setInitialState = async () => {
    if (await localStorage.getItem("new_facility")) {
      let facility = JSON.parse(await localStorage.getItem("new_facility"));
      swal({
        icon: "info",
        title: `You Did Not Finish Adding the Facility with name ${
          facility.details.facilityName
        }`,
        text:
          "Press Continue to continue from where you stopped or cancel to restart",
        buttons: {
          cancel: "Cancel",
          confirm: "Continue"
        },
        closeOnClickOutside: false
      }).then(async response => {
        if (response) {
          this._setNextActiveTab(
            await localStorage.getItem("new_facility_active_tab")
          );
          return;
        }
        clearStorage();
      });
    }
    this.setState({
      initalValues: setInitialValues(this.props, true),
      facility: JSON.parse(await localStorage.getItem("new_facility"))
    });
  };

  handleSubmit = async () => {
    let data = JSON.parse(await localStorage.getItem("new_facility"));
    let error = false;
    await postBasicDetails(data.details, this.props.postFormData)
      .then(async res => {
        let facility = res.action.payload.data;
        postContactDetails(facility, data.contact, this.props.postFormData);

        await addResources(
          facility,
          data.resources,
          this.props.resources,
          this.props.postFormData
        );

        await addUtilities(facility, data.utilities, this.props.postFormData);

        await addServices(facility, data.services, this.props.postFormData);

        await publishFacility(facility, this.props.postFormData);
      })
      .catch(() => {
        error = true;
        swal("There was an error while saving", "Please try again", "error");
      });

    if (!error) {
      this._setNextActiveTab("Finish");
      clearStorage();
    }
  };

  _cancel = () => {
    swal({
      icon: "warning",
      title: "Are You Sure You Want To Cancel Facility Add ?",
      text: "All data filled in will be lost",
      buttons: {
        cancel: "No",
        confirm: "Yes"
      },
      closeOnClickOutside: false
    }).then(async response => {
      if (response) {
        clearStorage();
        this.setState({ redirect: true });
      }
    });
  };

  _setNextActiveTab = tabName => {
    this.setState({ active: tabName });
    localStorage.setItem(`new_facility_active_tab`, tabName);
  };

  _setFacilityDetails = async (key, details) => {
    var facility = {
      ...this.state.facility,
      [key]: details
    };
    this.setState({ facility });
    localStorage.setItem("new_facility", JSON.stringify(facility));
  };

  _renderForms = () => {
    switch (this.state.active) {
      case "Basic Details":
        return (
          <BasicDetailsForm
            fromAdd
            initalValues={this.state.initalValues.details}
            onSubmit={values =>
              this._onSubmit(values, "details", "Contacts & Location")
            }
            cancel={this._cancel}
            {...this.props}
          />
        );
      case "Contacts & Location":
        return (
          <ContactsForm
            fromAdd
            initalValues={this.state.initalValues.contact}
            onSubmit={values => this._onSubmit(values, "contact", "Resources")}
            cancel={this._cancel}
            {...this.props}
          />
        );
      case "Resources":
        return (
          <ResourcesForm
            fromAdd
            initalValues={this.state.initalValues.resources}
            onSubmit={values =>
              this._onSubmit(values, "resources", "Utilities")
            }
            cancel={this._cancel}
            {...this.props}
          />
        );
      case "Utilities":
        return (
          <UtilitiesForm
            fromAdd
            initalValues={this.state.initalValues.utilities}
            onSubmit={values => this._onSubmit(values, "utilities", "Services")}
            cancel={this._cancel}
            {...this.props}
          />
        );
      case "Services":
        return (
          <ServicesForm
            fromAdd
            initalValues={this.state.initalValues.services}
            onSubmit={values => this._onSubmit(values, "services", "Finish")}
            cancel={this._cancel}
            {...this.props}
          />
        );
      case "Finish":
        return (
          <FinishedForm handleBack={() => this.setState({ redirect: true })} />
        );
      default:
        return (
          <BasicDetailsForm
            fromAdd
            initalValues={this.state.initalValues.details}
            onSubmit={values =>
              this._onSubmit(values, "details", "Contacts & Location")
            }
            cancel={this._cancel}
            {...this.props}
          />
        );
    }
  };

  _renderTabHeadings = () => {
    return (
      this.state.active != "Finish" && (
        <WizardHeaderContainer>
          <FormWizardTabHeading
            index="1"
            title="Basic Details"
            active={this.state.active}
          />
          <FormWizardTabHeading
            index="2"
            title="Contacts & Location"
            active={this.state.active}
          />
          <FormWizardTabHeading
            index="3"
            title="Resources"
            active={this.state.active}
          />
          <FormWizardTabHeading
            index="4"
            title="Utilities"
            active={this.state.active}
          />
          <FormWizardTabHeading
            index="5"
            title="Services"
            active={this.state.active}
          />
        </WizardHeaderContainer>
      )
    );
  };

  render() {
    return !isLoggedIn(this.props.userDetails) || this.state.redirect ? (
      <Redirect to="/facilities" />
    ) : (
      <Fragment>
        {this._renderTabHeadings()}
        {this._renderForms()}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    regulatoryStatuses: state.dependancies.regulatoryStatuses,
    facilityOwners: state.dependancies.facilityOwners,
    facilityTypes: state.dependancies.facilityTypes,
    districts: state.dependancies.districts,
    operationalStatuses: state.dependancies.operationalStatuses,
    response: state.facilities.basicDetailsResponse,
    currentFacility: state.facilities.currentDetails,
    userDetails: state.users.loggedInUser,
    currentResources: state.facilities.currentResources.data,
    response: state.facilities.resourcesResponse,
    resourceTypes: state.dependancies.resourceTypes,
    resources: state.facilities.resources,
    services: state.facilities.services,
    patchResponse: state.facilities.patchResponse,
    utilityTypes: state.dependancies.utilityTypes,
    utilities: state.facilities.utilities,
    serviceTypes: state.dependancies.serviceTypes,
    services: state.facilities.services,
    patchResponse: state.facilities.patchResponse
  };
};

export default connect(
  mapStateToProps,
  {
    postFormData,
    fetchCurrentDetails
  }
)(CreateFacilityWizard);
