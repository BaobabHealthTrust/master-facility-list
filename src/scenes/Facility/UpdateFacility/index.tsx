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
import { patchFacilityBasicDetails } from "../../../services/redux/actions/facilities";
import {
  faHospital,
  faEnvelope,
  faBed,
  faWifi,
  faStethoscope
} from "@fortawesome/free-solid-svg-icons";
import { getBasicDetails } from "./helpers";

library.add(faHospital, faEnvelope, faBed, faWifi, faStethoscope);

export class index extends Component<Props> {
  state = {
    facilityId: null
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
    this.props.history.goBack();
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
      this.props.fetchCurrentServices(facilityId);
      this.props.fetchCurrentUtilities(facilityId);
    }
  }
  onSubmit = (values: any) => {
    switch (this.props.facilityPage) {
      case "summary":
        return this.onSubmitBasicDetails(values);
      // case "locations":
      //   return this.onSubmitContactDetails(values);
      // case "resources":
      //   return this.onSubmitResourcesDetails(values);
      // case "utilities":
      //   return this.onSubmitUtilitiesDetails(values);
      // case "services":
      //   return this.onSubmitServicesDetails(values);
    }
  };

  onSubmitBasicDetails = async (values: any) => {
    let token = (await sessionStorage.getItem("token")) || "";
    let val = {
      ...values,
      published_date: values.publishedDate
    };
    if (token == "") return;

    return this.props
      .patchFacilityBasicDetails(
        getBasicDetails(val),
        this.props.facility.id,
        token
      )
      .then(() => {
        return;
      })
      .catch(() => {
        return;
      });
  };
  render() {
    const { facility, loading } = this.props;

    return (
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
      />
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
  history?: any;
  loading: any;
};
export default connect(
  mapStateToProps,
  {
    fetchOwners,
    fetchCurrentResources,
    fetchCurrentBasic,
    fetchCurrentServices,
    fetchCurrentUtilities,
    setActiveFacilityPage,
    patchFacilityBasicDetails
  }
)(index);
