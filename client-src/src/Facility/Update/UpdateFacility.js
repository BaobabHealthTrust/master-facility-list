//@flow
import React, { Fragment } from "react";
import {
  BasicDetails,
  Contacts,
  Resources,
  Utilities,
  Services
} from "../Forms";
import { connect } from "react-redux";
import {
  postFormData,
  fetchCurrentDetails,
  fetchCurrentResources,
  fetchCurrentUtilities,
  fetchCurrentServices,
  deleteFromApi
} from "../../actions";

import {
  basicSchema,
  contactSchema,
  getResourcesSchema
} from "../Forms/schema";
import { getCurrentServices } from "../helpers/utilities";
import { setInitialValues } from "../Forms/values";
import { Redirect } from "react-router-dom";
import swal from "@sweetalert/with-react";
import {
  postBasicDetails,
  postContactDetails,
  updateServicesDetails,
  updateResourcesDetails,
  updateUtilityDetails,
  deleteUtility,
  deleteService
} from "../helpers/postFaclityDetails";
import { isLoggedIn, getFacilityId, getCurrentTab } from "../helpers/utilities";
import { Loader, Alert } from "../../common";
import styled from "styled-components";
import { Paper } from "@material-ui/core";

const Container = styled.div.attrs({
  className: "container"
})``;
class UpdateFacility extends React.Component<{}> {
  state = {
    active: "summary",
    redirect: false,
    error: false,
    facility: {
      details: {},
      contact: {},
      resources: [],
      utilities: [],
      services: []
    },
    schema: {},
    initalValues: {
      details: {
        facilityName: null,
        commonName: null,
        operationalStatus: null,
        district: null,
        facilityType: null,
        regulatoryStatus: null,
        facilityOwner: null,
        dateOpened: null,
        registrationNumber: null,
        publishedDate: Date.now
      },

      contact: {
        postalAddress: null,
        physicalAddress: null,
        contactName: null,
        contactEmail: null,
        contactPhoneNumber: null,
        catchmentArea: null,
        catchmentPopulation: null,
        longitude: null,
        latitude: null
      }
    }
  };

  handleSubmit = values => {
    return swal({
      icon: "warning",
      title: `Are you sure you want save these changes?`,
      buttons: {
        cancel: "Cancel",
        confirm: "Save"
      },
      closeOnClickOutside: false
    }).then(res => {
      if (res) {
        switch (this.state.active) {
          case "summary":
            return this.onSubmitBasicDetails(values);
          case "locations":
            return this.onSubmitContactDetails(values);
          case "resources":
            return this.onSubmitResourcesDetails(values);
          case "utilities":
            return this.onSubmitUtilitiesDetails(values);
          case "services":
            return this.onSubmitServicesDetails(values);
        }
      }
    });
  };

  onDetailsUpdated = () => {
    swal("Facility Updated");
    this.setState({ redirect: true });
    return {};
  };

  onUpdateDetailsError = () => {
    this.setState({ error: true });
    return this.props.errors.postFacilityBasicDetails;
  };

  onSubmitBasicDetails = values => {
    let val = {
      ...values,
      published_date: values.publishedDate
    };
    return postBasicDetails(
      val,
      this.props.postFormData,
      getFacilityId(this.props)
    )
      .then(() => {
        return this.onDetailsUpdated();
      })
      .catch(() => {
        return this.onUpdateDetailsError();
      });
  };

  onSubmitContactDetails = values => {
    return postContactDetails(
      { id: getFacilityId(this.props) },
      values,
      this.props.postFormData,
      "update"
    )
      .then(() => {
        return this.onDetailsUpdated();
      })
      .catch(() => {
        return this.onUpdateDetailsError();
      });
  };

  onSubmitResourcesDetails = values => {
    return updateResourcesDetails(
      this.props.currentFacility,
      values,
      this.props.resources,
      this.props.currentResources,
      this.props.postFormData
    )
      .then(() => {
        return this.onDetailsUpdated();
      })
      .catch(() => {
        return this.onUpdateDetailsError();
      });
  };

  onSubmitUtilitiesDetails = values => {
    const currentUtilities = this.props.currentUtilities
      ? []
      : this.props.currentUtilities;
    for (let currentUtility of currentUtilities) {
      if (!values.includes(currentUtility.utility_id)) {
        deleteUtility(currentUtility.id, deleteFromApi);
      }
    }
    return updateUtilityDetails(
      this.props.currentFacility,
      values,
      currentUtilities,
      this.props.postFormData
    )
      .then(() => {
        return this.onDetailsUpdated();
      })
      .catch(() => {
        return this.onUpdateDetailsError();
      });
  };

  onSubmitServicesDetails = values => {
    let currentServices = getCurrentServices(this.props.currentServices);

    for (let currentService of currentServices) {
      let isInValues = values.filter(
        value =>
          value.firstLevelService == currentService.service_id ||
          value.secondLevelService == currentService.service_id ||
          value.thirdLevelService == currentService.service_id
      );
      if (isInValues.length == 0) {
        deleteService(currentService.id, deleteFromApi);
      }
    }
    return updateServicesDetails(
      this.props.currentFacility,
      values,
      this.props.postFormData,
      currentServices
    )
      .then(() => {
        return this.onDetailsUpdated();
      })
      .catch(() => {
        return this.onUpdateDetailsError();
      });
  };

  componentDidMount = () => {
    this.props.fetchCurrentDetails(getFacilityId(this.props));
    this.props.fetchCurrentResources(getFacilityId(this.props));
    this.props.fetchCurrentUtilities(getFacilityId(this.props));
    this.props.fetchCurrentServices(getFacilityId(this.props));
    this.setState({
      active: getCurrentTab(this.props),
      initalValues: setInitialValues(this.props)
    });
  };

  componentWillReceiveProps(nextProp) {
    if (!this.isLoading(nextProp.isLoading)) {
      this.setState({
        initalValues: setInitialValues(nextProp)
      });
    }
  }

  isLoading = (isLoading = this.props.isLoading) => {
    return (
      isLoading.fetchFacilityDetails &&
      isLoading.fetchCurrentResources &&
      isLoading.fetchCurrentUtilities &&
      isLoading.fetchCurrentServices
    );
  };

  _getRedirectLink = () => {
    const currentLocation = this.props.location.pathname;
    const locArr = currentLocation.split("/").filter(val => val != "edit");
    return locArr.join("/");
  };

  _setValidationSchema = () => {
    switch (this.state.active) {
      case "summary":
        return this.setState({ schema: basicSchema });
      case "locations":
        return this.setState({ schema: contactSchema });
      case "resources":
        return this.setState({
          schema: getResourcesSchema(this.props.resources)
        });
      default:
        return this.setState({ schema: basicSchema });
    }
  };

  _setNextActiveTab = tabName => {
    this.setState({ active: tabName });
    localStorage.setItem(`new_facility_active_tab`, tabName);
    this._setValidationSchema();
  };

  _setFacilityDetails = (key, details) => {
    var facility = {
      ...this.state.facility,
      [key]: details
    };
    this.setState({ facility });
    localStorage.setItem("new_facility", JSON.stringify(facility));
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
        this.setState({ redirect: true });
      }
    });
  };

  _renderForms = () => {
    switch (this.state.active) {
      case "summary":
        return (
          <BasicDetails
            initalValues={this.state.initalValues.details}
            onSubmit={values => this.handleSubmit(values)}
            cancel={this._cancel}
            {...this.props}
          />
        );
      case "locations":
        return (
          <Contacts
            initalValues={this.state.initalValues.contact}
            onSubmit={values => this.handleSubmit(values)}
            cancel={this._cancel}
            {...this.props}
          />
        );
      case "resources":
        return (
          <Resources
            initalValues={this.state.initalValues.resources}
            onSubmit={values => this.handleSubmit(values)}
            cancel={this._cancel}
            {...this.props}
          />
        );
      case "utilities":
        return (
          <Utilities
            initalValues={this.state.initalValues.utilities}
            onSubmit={values => this.handleSubmit(values)}
            cancel={this._cancel}
            {...this.props}
          />
        );
      case "services":
        return (
          <Services
            initalValues={this.state.initalValues.services}
            onSubmit={values => this.handleSubmit(values)}
            cancel={this._cancel}
            {...this.props}
          />
        );
      default:
        return (
          <BasicDetails
            initalValues={this.state.initalValues.details}
            onSubmit={values => this.handleSubmit(values)}
            cancel={this._cancel}
            {...this.props}
          />
        );
    }
  };

  render() {
    return !isLoggedIn(this.props.userDetails) || this.state.redirect ? (
      <Redirect to={this._getRedirectLink()} />
    ) : (
      <Fragment>
        <Container>
          <Paper>
            {this.isLoading() && <Loader />}
            {this.state.error && (
              <Alert warning message="Failed To Update Details" />
            )}
            {!this.isLoading() && this._renderForms()}
          </Paper>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    districts: state.dependancies.districts,

    resources: state.facilities.resources,
    resourceTypes: state.dependancies.resourceTypes,
    currentResources: state.facilities.currentResources.data,

    services: state.facilities.services,
    serviceTypes: state.dependancies.serviceTypes,
    currentServices: state.facilities.currentServices.hierarchy,

    regulatoryStatuses: state.dependancies.regulatoryStatuses,

    facilityOwners: state.dependancies.facilityOwners,
    facilityTypes: state.dependancies.facilityTypes,

    operationalStatuses: state.dependancies.operationalStatuses,
    currentFacility: state.facilities.currentDetails,
    userDetails: state.users.loggedInUser,

    utilities: state.facilities.utilities,
    utilityTypes: state.dependancies.utilityTypes,
    currentUtilities: state.facilities.currentUtilities.data,

    isLoading: state.statusErrors.isLoading,
    errors: state.statusErrors.errors
  };
};

export default connect(
  mapStateToProps,
  {
    postFormData,
    fetchCurrentDetails,
    fetchCurrentResources,
    fetchCurrentUtilities,
    fetchCurrentServices
  }
)(UpdateFacility);
