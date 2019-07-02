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
  publishFacility,
  fetchFacilities
} from "../../../services/redux/actions/facilities";
import {
  getBasicDetails,
  getContactDetails,
  getResources,
  getUtilities,
  getServices
} from "./helpers";
import { toast } from "react-toastify";
import Notification from "../../../components/atoms/Notification";
import RedirectOnMobile from "../../../components/atoms/RedirectOnMobile";
import swal from "sweetalert";

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
    this.setInitialState();
    if (this.props.dependancies.owners.list.length == 0) {
      this.props.fetchOwners();
    }
  }

  setInitialState = async () => {
    if (await localStorage.getItem("new_facility")) {
      let facility: any = JSON.parse((await localStorage.getItem(
        "new_facility"
      )) as any);
      // @ts-ignore
      swal({
        icon: "info",
        title: `You Did Not Finish Adding the Facility with name ${facility.details.facilityName}`,
        text:
          "Press Continue to continue from where you stopped or cancel to restart",
        buttons: {
          cancel: "Cancel",
          confirm: "Continue"
        },
        closeOnClickOutside: false
      }).then(async (response: any) => {
        if (response) {
          this.setNextActiveTab((await localStorage.getItem(
            "new_facility_active_tab"
          )) as any);
          this.setState({ facility });
          return;
        }
        localStorage.clear();
      });
    }
  };

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
            "Resources"
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
        getServices(
          data.services,
          Number(facility.id),
          this.props.dependancies.services.list
        ),
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
    let data = JSON.parse((await localStorage.getItem("new_facility")) as any);
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
        this.setState({ networkError: true });
        return false;
      });

    if (facility != null) {
      this.postDetails(data, facility, token);
    }
    this.props.fetchFacilities();
    return addFacility;
  };

  onSubmit = async (values: any, key: string, nextTab: string) => {
    this.setFacilityDetails(key, values);
    if (nextTab == "Finish") {
      if (!(await this.handleSubmit())) {
        toast.info(
          <Notification error message="Failed To Create Facility, Try Again" />
        );
        return;
      }
      localStorage.clear();
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
    // @ts-ignore
    swal({
      icon: "warning",
      title: "Are You Sure You Want To Cancel Facility Add ?",
      text: "All data filled in will be lost",
      buttons: {
        cancel: "No",
        confirm: "Yes"
      },
      closeOnClickOutside: false
    }).then(async (response: any) => {
      this.props.history.goBack();
      localStorage.clear();
    });
  };

  render() {
    return (
      <>
        <RedirectOnMobile />
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
      </>
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
  fetchFacilities: Function;
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
    publishFacility,
    fetchFacilities
  }
)(index);
