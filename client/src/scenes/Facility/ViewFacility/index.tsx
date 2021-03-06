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
import { basic } from "../../../components/organisms/FacilityForms/initialValues";
import StatusBadge from "../../../components/atoms/StatusBadge";

const API = process.env.REACT_APP_API_URL;

library.add(faPlus, faHospital, faEnvelope, faBed, faWifi, faStethoscope);

export class index extends Component<any> {
  state = {
    facilityId: null
  };

  badges = [
    {
      label: "Closed",
      color: "#B80F0A"
    },
    {
      label: "Closed (Temporary)",
      color: "#EF7215"
    },
    {
      label: "Functional",
      color: "#00A86B"
    },
    {
      label: "Pending Operation (Under construction)",
      color: "#FC6600"
    },
    {
      label: "Pending Operation (Construction Complete)",
      color: "#964000"
    }
  ];

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

  downloadFacility = () => {
    window.open(`${API}/facilities/download/${this.state.facilityId}`);
  };

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
    this.props.fetchCurrentServices(facilityId, this.props.dependancies);
    this.props.fetchCurrentUtilities(facilityId);
  }

  componentWillReceiveProps(newProps: any) {
    if (
      newProps.match.params.id &&
      newProps.match.params.id != this.state.facilityId
    ) {
      let facilityId = newProps.match.params.id;
      this.setState({ facilityId });
      this.props.fetchCurrentBasic(facilityId);
      this.props.fetchCurrentResources(facilityId);
      this.props.fetchCurrentServices(facilityId, this.props.dependancies);
      this.props.fetchCurrentUtilities(facilityId);
    }
  }

  getBadge = () => {
    if (!this.props.facility.operationalStatus) {
      return <span />;
    }
    const badge = this.badges.filter(
      (badge: any) =>
        badge.label ==
        this.props.facility.operationalStatus.facility_operational_status
    );
    return badge.length == 0 ? (
      <span />
    ) : (
      <StatusBadge label={badge[0].label} color={badge[0].color} />
    );
  };

  isLoading = () =>
    this.props.loading.fetchCurrentBasic ||
    this.props.loading.fetchCurrentResources ||
    this.props.loading.fetchCurrentServices ||
    this.props.loading.fetchCurrentServices ||
    this.props.loading.fetchCurrentUtilities;

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
        downloadFacility={this.downloadFacility}
        isLoading={this.isLoading()}
        badge={this.getBadge()}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  ui: state.ui,
  facility: state.facilities.current,
  loading: state.status,
  dependancies: state.dependancies
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
