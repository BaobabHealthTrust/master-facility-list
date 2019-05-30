//@flow
import React, { Component, Fragment } from "react";
import Card from "../../common/MflCard";
import { Loader } from "../../common";
import { fetchCurrentDetails, setCurrentDetails } from "../../actions";
import { connect } from "react-redux";
import MFLGoogleMap from "../../common/MFLGoogleMap";
import styled from "styled-components";
import { Paper } from "@material-ui/core";
import { Row, Col } from "react-materialize";
import { Link } from "react-router-dom";
import FacilityDetail from "./components/FacilityDetail";
import { isLoggedIn } from "../helpers/utilities";
import { DetailsCard } from "./components/DetailsCard";
import { redirectToEdit } from "./helpers";

class Location extends Component<State> {
  state = {
    loading: true
  };

  componentWillMount() {
    const id = this.props.match.params.id;
    this.props.fetchCurrentDetails(id);
  }

  _renderContactSections = (locationData, addressData, contactPersonData) => (
    <Fragment>
      <Col m={4} s={12} className="mb-5">
        <SectionTitle icon="person" text="Contact Person" />
        {contactPersonData.map(contact => (
          <FacilityDetail
            key={contact[0]}
            label={contact[0]}
            text={contact[1]}
          />
        ))}
      </Col>

      <Col m={4} s={12} className="mb-5">
        <SectionTitle icon="location_on" text="Location" />
        {locationData.map(contact => (
          <FacilityDetail
            key={contact[0]}
            label={contact[0]}
            text={contact[1]}
          />
        ))}
      </Col>

      <Col m={4} s={12} className="mb-5">
        <SectionTitle icon="contact_mail" text="Contact Address" />
        {addressData.map(contact => (
          <FacilityDetail
            key={contact[0]}
            label={contact[0]}
            text={contact[1]}
          />
        ))}
      </Col>
    </Fragment>
  );

  render() {
    const locationData = this.props.current.locations
      ? [
          ["Catchment area", this.props.current.locations.catchment_area],
          ["Population", this.props.current.locations.catchment_population],
          ["District", this.props.current.district.district_name]
        ]
      : [];

    const contactPersonData = this.props.current.contactPeople
      ? [
          ["", this.props.current.contactPeople.contact_person_fullname],
          ["", this.props.current.contactPeople.contact_person_email],
          ["", this.props.current.contactPeople.contact_person_phone]
        ]
      : [];

    const addressData = this.props.current.addresses
      ? [
          ["", this.props.current.addresses.physical_address],
          ["", this.props.current.addresses.postal_address],
          ["", this.props.current.district.zone.zone_name]
        ]
      : [];

    const position =
      this.props.current.geolocations &&
      this.props.current.geolocations.latitude != ""
        ? {
            lat: parseFloat(this.props.current.geolocations.latitude),
            lng: parseFloat(this.props.current.geolocations.longitude)
          }
        : { lat: -13.9626121, lng: 33.7741195 };

    return (
      <Row>
        <Col m={8} s={12} offset="m4">
          <DetailsCard
            isLoading={this.props.isLoading.fetchFacilityDetails}
            isLoggedIn={isLoggedIn()}
            title="Facility Contact Details"
            btnText="Edit Contacts"
            onEditBtnClick={() => {
              redirectToEdit(this.props);
            }}
          >
            {this._renderContactSections(
              locationData,
              addressData,
              contactPersonData
            )}
          </DetailsCard>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    current: state.facilities.currentDetails,
    isLoading: state.statusErrors.isLoading
  };
};

export default connect(
  mapStateToProps,
  {
    setCurrentDetails,
    fetchCurrentDetails
  }
)(Location);
function Button(props) {
  const { color, icon, text } = props;
  const buttonClass = props.margin
    ? `waves-effect btn`
    : `mr-3 waves-effect btn`;
  return props.link ? (
    <Link
      className={buttonClass}
      to={props.link}
      style={{ backgroundColor: color }}
    >
      <i className="material-icons left">{icon}</i>
      {text}
    </Link>
  ) : (
    <Link
      className={buttonClass}
      style={{ backgroundColor: color }}
      to="#"
      onClick={() => props.onClick()}
    >
      <i className="material-icons left">{icon}</i>
      {text}
    </Link>
  );
}

function SectionTitle(props) {
  return (
    <div
      style={{
        paddingBottom: "10px",
        borderBottom: "1px solid gray",
        marginBottom: "10px"
      }}
    >
      <i
        className="material-icons"
        style={{
          display: "inline-block",
          padding: "0 0.5rem",
          verticalAlign: "middle",
          fontSize: "20px"
        }}
      >
        {props.icon}
      </i>
      <b>{props.text}</b>
    </div>
  );
}
