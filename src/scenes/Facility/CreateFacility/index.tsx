import React, { Component } from "react";
import { connect } from "react-redux";
import CreateFacility from "./CreateFacility";
import { fetchOwners } from "../../../services/redux/actions/dependancies";
import {
  postFacilityBasicDetails,
  postFacilityContactDetails,
  postFacilityResources,
  postFacilityUtilities,
  postFacilityServices,
  publishFacility
} from "../../../services/redux/actions/facilities";
import {
  getBasicDetails,
  getContactDetails,
  getResources,
  getUtilities,
  getServices
} from "./helpers";
import { statement } from "@babel/template";
export class index extends Component<Props> {
  state = {
    active: "Basic Details",
    facility: {
      details: {},
      contact: {},
      resources: [],
      utilities: [],
      services: []
    },
    newFacility: { id: 1 } as any,
    networkError: false,
    networkErrorSavingDetails: [] as Array<any>
  };

  formSections = [
    "Basic Details",
    "Contacts & Location",
    "Resources",
    "Utilities",
    "Services",
    "Finish"
  ];

  componentDidMount() {
    if (this.props.dependancies.owners.list.length == 0) {
      this.props.fetchOwners();
    }
  }

  postDetails(data: any, facility: any, token: string | null) {
    this.props
      .postFacilityContactDetails(
        getContactDetails(data.contact, Number(facility.id)),
        token
      )
      .catch(() => {
        this.setState({
          networkErrorSavingDetails: [
            ...this.state.networkErrorSavingDetails,
            "Contact Details"
          ]
        });
      });

    this.props
      .postFacilityResources(
        getResources(
          data.resources,
          this.props.dependancies.resources.list,
          Number(facility.id)
        ),
        token
      )
      .catch((e: any) => {
        this.setState({
          networkErrorSavingDetails: [
            ...this.state.networkErrorSavingDetails,
            "Resorces"
          ]
        });
      });

    this.props
      .postFacilityUtilities(
        getUtilities(data.utilities, Number(facility.id)),
        token
      )
      .catch((e: any) => {
        this.setState({
          networkErrorSavingDetails: [
            ...this.state.networkErrorSavingDetails,
            "Utilities"
          ]
        });
      });

    this.props
      .postFacilityServices(
        getServices(data.services, Number(facility.id)),
        token
      )
      .catch((e: any) => {
        this.setState({
          networkErrorSavingDetails: [
            ...this.state.networkErrorSavingDetails,
            "Services"
          ]
        });
      });
  }

  handleSubmit = async () => {
    let data = JSON.parse((await localStorage.getItem("new_facility")) || "{}");
    let token = sessionStorage.getItem("token");
    let facility: any = null;
    this.setState({ networkError: false, networkErrorSavingDetails: [] });
    let addFacility = await this.props
      .postFacilityBasicDetails(getBasicDetails(data.details), token)
      .then((res: any) => {
        let tempFacility = res.action.payload.data;
        this.props.publishFacility(
          {
            id: tempFacility.id,
            district_id: tempFacility.district_id
          },
          token
        );
        facility = tempFacility;
        this.setState({ newFacility: facility });
        return true;
      })
      .catch((e: any) => {
        alert(e);
        this.setState({ networkError: true });
        return false;
      });

    if (facility != null) {
      this.postDetails(data, facility, token);
    }
    return addFacility;
  };

  onSubmit = async (values: any, key: string, nextTab: string) => {
    this.setFacilityDetails(key, values);
    if (nextTab == "Finish") {
      if (!(await this.handleSubmit())) return;
    }
    this.setNextActiveTab(nextTab);
  };

  setNextActiveTab = (tabName: string) => {
    this.setState({ active: tabName });
    localStorage.setItem(`new_facility_active_tab`, tabName);
  };

  setFacilityDetails = async (key: string, details: any) => {
    var facility = {
      ...this.state.facility,
      [key]: details
    };
    this.setState({ facility });
    localStorage.setItem("new_facility", JSON.stringify(facility));
  };

  onCancel = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <CreateFacility
        sections={this.formSections}
        active={this.state.active}
        onSubmit={this.onSubmit}
        onCancel={this.onCancel}
        dependancies={this.props.dependancies}
        facility={this.state.newFacility}
        errors={{
          networkError: this.state.networkError,
          networkErrorSavingDetails: this.state.networkErrorSavingDetails
        }}
      />
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    drawerOpen: state.ui.advancedSearchOpen,
    facilities: state.facilities.list,
    dependancies: state.dependancies
  };
};

type Props = {
  drawerOpen: boolean;
  toggleFacilityFilter: Function;
  facilities: Array<any>;
  dependancies: any;
  fetchOwners: Function;
  history: any;
  postFacilityBasicDetails: Function;
  postFacilityContactDetails: Function;
  postFacilityResources: Function;
  postFacilityUtilities: Function;
  postFacilityServices: Function;
  publishFacility: Function;
};
export default connect(
  mapStateToProps,
  {
    fetchOwners,
    postFacilityBasicDetails,
    postFacilityContactDetails,
    postFacilityResources,
    postFacilityUtilities,
    postFacilityServices,
    publishFacility
  }
)(index);
