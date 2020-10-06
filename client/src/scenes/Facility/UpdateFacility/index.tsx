import React, { Component } from "react";
import { connect } from "react-redux";
// @ts-ignore
import { split } from "lodash";
import UpdateFacility from "./UpdateFacility";
import {
  fetchCurrentResources,
  fetchCurrentBasic,
  fetchCurrentServices,
  fetchCurrentUtilities
} from "../../../services/redux/actions/facilities";
import { setActiveFacilityPage } from "../../../services/redux/actions/ui";
import { fetchOwners } from "../../../services/redux/actions/dependancies";
import { FacilityPages as pages } from "../../../services/utils";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  patchFacilityBasicDetails,
  patchFacilityContactDetails,
  patchFacilityResources,
  patchFacilityUtilities,
  deleteFacilityUtilities,
  patchFacilityServices,
  deleteFacilityServices,
  postFacilityServices,
  postFacilityUtilities,
  postFacilityResources
} from "../../../services/redux/actions/facilities";
import {
  faHospital,
  faEnvelope,
  faBed,
  faWifi,
  faStethoscope
} from "@fortawesome/free-solid-svg-icons";
import {
  getBasicDetails,
  getResources,
  getUtilitiesToDelete,
  getUtilities,
  getServicesToDelete,
  getServices,
  getCurrentServices,
  getSelectedServicesFromLeaves
} from "./helpers";
import { toast } from "react-toastify";
import Notification from "../../../components/atoms/Notification";
import { withRouter, RouteComponentProps } from "react-router-dom";
import swal from "sweetalert";
import RedirectOnMobile from "../../../components/atoms/RedirectOnMobile";

const API = process.env.REACT_APP_API_URL;

library.add(faHospital, faEnvelope, faBed, faWifi, faStethoscope);

export class index extends Component<Props & RouteComponentProps<{}>> {
  state = {
    facilityId: null,
    submitting: true
  };

  facilitySubMenu = [
    {
      link: pages.summary,
      name: "Facility Summary",
      icon: <FontAwesomeIcon icon={faHospital} />
    },
    {
      link: pages.contact,
      name: "Facility Contacts",
      icon: <FontAwesomeIcon icon={faEnvelope} />
    },
    {
      link: pages.resources,
      name: "Facility Resources",
      icon: <FontAwesomeIcon icon={faBed} />
    },
    {
      link: pages.utilities,
      name: "Facility Utilities",
      icon: <FontAwesomeIcon icon={faWifi} />
    },
    {
      link: pages.services,
      name: "Facility Services",
      icon: <FontAwesomeIcon icon={faStethoscope} />
    }
  ];

  onCancel = () => {
    // @ts-ignore
    swal({
      icon: "warning",
      title: `Are you sure you want cancel?`,
      // @ts-ignore
      buttons: {
        cancel: "No",
        confirm: "Yes"
      },
      closeOnClickOutside: false
    }).then((res: any) => {
      if (res) this.props.history.goBack();
    });
  };

  downloadFacility = () => {
    window.open(`${API}/facilities/download/${this.props.facility.id}`);
  };

  handlePageChange = (page: any) => {
    this.props.setActiveFacilityPage(page);
    this.props.history.push(`/facilities/${this.props.facility.id}/${page}`);
  };

  componentDidMount() {
    if (this.props.dependancies.owners.list.length == 0) {
      this.props.fetchOwners();
    }
    if (!this.props.facility.id) {
      let location = split(window.location.pathname, "/");
      let facilityId = location[location.length - 3];
      let currentPage = location[location.length - 2];

      this.props.setActiveFacilityPage(currentPage);
      this.setState({ facilityId });

      this.props.fetchCurrentBasic(facilityId);
      this.props.fetchCurrentResources(facilityId);
      this.props.fetchCurrentServices(facilityId, this.props.dependancies);
      this.props.fetchCurrentUtilities(facilityId);
    }
  }

  onSubmit = (values: any, setSubmitting: Function) => {
    // @ts-ignore
    swal({
      icon: "warning",
      title: `Are you sure you want save these changes?`,
      buttons: {
        cancel: { text: "Cancel", closeModal: true, visible: true },
        confirm: { text: "Save" }
      },
      closeOnClickOutside: false
    }).then(async (res: any) => {
      if (res) {
        // @ts-ignore
        swal({
          icon: "info",
          title: `Updating Facility. Please wait...`
        });
        switch (this.props.facilityPage) {
          case "summary":
            await this.onSubmitBasicDetails(values);
            break;
          case "contact":
            await this.onSubmitContactDetails(values);
            break;
          case "resources":
            await this.onSubmitResourcesDetails(values);
            break;
          case "utilities":
            await this.onSubmitUtilityDetails(values);
            break;
          case "services":
            await this.onSubmitServiceDetails(values);
            break;
        }
      }
      setSubmitting(false);
    });
  };

  onSubmitBasicDetails = async (values: any) => {
    let token = (await sessionStorage.getItem("token")) || "";
    let val = {
      ...values,
      published_date: values.publishedDate
    };
    if (token == "") return;

    this.props
      .patchFacilityBasicDetails(
        getBasicDetails(val),
        Number(this.props.facility.id),
        token
      )
      .then(() => {
        this.onSuccess();
      })
      .catch(() => {
        this.onError();
      });
  };

  onSubmitContactDetails = async (values: any) => {
    let token = (await sessionStorage.getItem("token")) || "";
    let val = {
      data: {
        ...values,
        client: 1,
        updated_at: Date.now()
      },
      id: Number(this.props.facility.id)
    };
    if (token == "") return;

    return this.props
      .patchFacilityContactDetails(val, token)
      .then(() => {
        this.onSuccess();
      })
      .catch(() => {
        this.onError();
      });
  };

  onSubmitResourcesDetails = async (values: any) => {
    let token = (await sessionStorage.getItem("token")) || "";

    if (token == "") return;

    let data = getResources(
      values,
      this.props.dependancies.resources.list,
      this.props.facility.id,
      this.props.facility.resources
    );
    let error = false;

    await this.props.postFacilityResources(data, token).catch(() => {
      error = true;
    });

    if (error) {
      this.onError();
      return;
    }
    this.onSuccess();
  };

  onSubmitUtilityDetails = async (values: any) => {
    let token = (await sessionStorage.getItem("token")) || "";

    if (token == "") return;

    let data = getUtilities(
      values,
      this.props.facility.id,
      this.props.facility.utilities
    );

    let error = false;

    // let utilitiesToDelete = getUtilitiesToDelete(
    //   values,
    //   this.props.facility.utilities
    // );
    // for (let utilityId of utilitiesToDelete) {
    //   await this.props.deleteFacilityUtilities(utilityId, token).catch(() => {
    //     error = true;
    //   });
    // }

    await this.props.postFacilityUtilities(data, token).catch(() => {
      error = true;
    });

    if (error) {
      this.onError();
      return;
    }
    this.onSuccess();
  };

  onSubmitServiceDetails = async (values: any) => {
    let token = (await sessionStorage.getItem("token")) || "";

    if (token == "") return;

    let currentServices = getCurrentServices(this.props.facility.services);
    let data = getServices(
      values,
      this.props.facility.id,
      this.props.dependancies.services.list,
      getSelectedServicesFromLeaves(
        getCurrentServices(this.props.facility.services),
        this.props.dependancies.services.list
      )
    );

    let error = false;

    // let servicesToDelete = getServicesToDelete(data, currentServices);
    // for (let serviceId of servicesToDelete) {
    //   await this.props.deleteFacilityServices(serviceId, token).catch(() => {
    //     error = true;
    //   });
    // }

    await this.props.postFacilityServices(data, token).catch(() => {
      error = true;
    });

    if (error) {
      this.onError();
      return;
    }
    this.onSuccess();
  };

  onError = () => {
    toast.info(
      <Notification
        error
        message={`Failed To Update Facility ${this.props.facilityPage}, Please Try Again`}
      />
    );
    swal({
      icon: "error",
      title: `Failed To Update Facility.`
    });
    setTimeout(() => {
      //@ts-ignore
      swal.close();
    }, 4000);
  };

  onSuccess = () => {
    toast.info(
      <Notification
        message={`Facility ${this.props.facilityPage} Updated!!!`}
      />
    );
    swal({
      icon: "success",
      title: `Facility Updated Successfully.`
    });
    setTimeout(() => {
      //@ts-ignore
      swal.close();
    }, 4000);
    this.props.history.push(
      `/facilities/${this.props.facility.id}/${this.props.facilityPage}`
    );
  };

  render() {
    const { facility, loading } = this.props;

    return (
      <>
        <RedirectOnMobile />
        <UpdateFacility
          onCancel={this.onCancel}
          loadingStates={loading}
          sections={pages}
          activePage={this.props.facilityPage}
          onSubmit={this.onSubmit}
          facility={facility}
          dependancies={this.props.dependancies}
          onChangePage={(page: any) => {
            this.handlePageChange(page);
          }}
          facilitySubMenu={this.facilitySubMenu}
          downloadFacility={this.downloadFacility}
        />
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    drawerOpen: state.ui.advancedSearchOpen,
    facilityPage: state.ui.activeFacilityPage,
    facility: state.facilities.current,
    dependancies: state.dependancies,
    loading: state.status
  };
};

type Props = {
  drawerOpen: boolean;
  toggleFacilityFilter: Function;
  facility: any;
  dependancies: any;
  facilityPage: string;
  fetchOwners: Function;
  fetchCurrentResources: Function;
  fetchCurrentBasic: Function;
  fetchCurrentServices: Function;
  fetchCurrentUtilities: Function;
  setActiveFacilityPage: Function;
  patchFacilityBasicDetails: Function;
  patchFacilityContactDetails: Function;
  patchFacilityResources: Function;
  patchFacilityUtilities: Function;
  deleteFacilityUtilities: Function;
  patchFacilityServices: Function;
  postFacilityServices: Function;
  postFacilityUtilities: Function;
  postFacilityResources: Function;
  deleteFacilityServices: Function;
  history?: any;
  loading: any;
};
export default withRouter(
  connect(mapStateToProps, {
    fetchOwners,
    fetchCurrentResources,
    fetchCurrentBasic,
    fetchCurrentServices,
    fetchCurrentUtilities,
    setActiveFacilityPage,
    patchFacilityBasicDetails,
    patchFacilityContactDetails,
    patchFacilityResources,
    patchFacilityUtilities,
    deleteFacilityUtilities,
    deleteFacilityServices,
    patchFacilityServices,
    postFacilityServices,
    postFacilityUtilities,
    postFacilityResources
  })(index)
);
