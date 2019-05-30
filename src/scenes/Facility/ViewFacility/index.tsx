import React, { Component } from "react";
import { connect } from "react-redux";
// @ts-ignore
import { split } from "lodash";
import {
  fetchCurrentResources,
  fetchCurrentBasic,
  fetchCurrentServices,
  fetchCurrentUtilities
} from "../../../services/redux/actions/facilities";
import { setActiveFacilityPage } from "../../../services/redux/actions/ui";
import ViewFacility from "./ViewFacility";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faHospital,
  faEnvelope,
  faBed,
  faWifi,
  faStethoscope
} from "@fortawesome/free-solid-svg-icons";
import { FacilityPages as pages } from "../../../services/utils";

library.add(faPlus, faHospital, faEnvelope, faBed, faWifi, faStethoscope);

export class index extends Component<any> {
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

  handlePageChange = (page: any) => {
    this.props.setActiveFacilityPage(page);
    this.props.history.push(`/facilities/${this.state.facilityId}/${page}`);
  };

  componentDidMount() {
    let location = split(window.location.pathname, "/");
    let facilityId =
      location.length == 3
        ? location[location.length - 1]
        : location[location.length - 2];
    let currentPage =
      location.length == 3 ? pages.summary : location[location.length - 1];

    this.props.setActiveFacilityPage(currentPage);
    this.setState({ facilityId });

    this.props.fetchCurrentBasic(facilityId);
    this.props.fetchCurrentResources(facilityId);
    this.props.fetchCurrentServices(facilityId);
    this.props.fetchCurrentUtilities(facilityId);
  }
  render() {
    const { facility } = this.props;
    const { services, utilities, resources } = facility;

    return (
      <ViewFacility
        activePage={this.props.ui.activeFacilityPage}
        basic={facility}
        resources={resources}
        utilities={utilities}
        services={services}
        onChangePage={(page: any) => {
          this.handlePageChange(page);
        }}
        onEditDetails={() => {}}
        facilitySubMenu={this.facilitySubMenu}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  ui: state.ui,
  facility: state.facilities.current
});

export default connect(
  mapStateToProps,
  {
    fetchCurrentResources,
    fetchCurrentBasic,
    fetchCurrentServices,
    fetchCurrentUtilities,
    setActiveFacilityPage
  }
)(index);
