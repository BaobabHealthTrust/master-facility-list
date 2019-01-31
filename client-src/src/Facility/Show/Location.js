//@flow
import React, { Component, Fragment } from "react";
import Card from "../../common/MflCard";
import { Loader } from "../../common";
import { fetchCurrentDetails, setCurrentDetails } from "../../actions";
import { connect } from "react-redux";
import MFLGoogleMap from "../../common/MFLGoogleMap";

class Location extends Component<State> {
  state = {
    loading: true
  };

  componentWillMount() {
    const id = this.props.match.params.id;
    this.props.fetchCurrentDetails(id);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading) this.setState({ loading: false });
  }
  _renderContactCards = (locationData, contactPersonData, addressData) => (
    <div className="col m6 s12">
      <div className="row">
        <Card heading="Location" icon="location_on" data={locationData} />
      </div>
      <div className="row">
        <Card heading="Address" icon="location_city" data={addressData} />
      </div>
      <div className="row">
        <Card heading="contact person" icon="person" data={contactPersonData} />
      </div>
    </div>
  );

  render() {
    const locationData = this.props.current.locations
      ? [
          ["catchment area", this.props.current.locations.catchment_area],
          ["population", this.props.current.locations.catchment_population],
          ["district", this.props.current.district.district_name]
        ]
      : [];

    const contactPersonData = this.props.current.contactPeople
      ? [
          [
            "Fullname",
            this.props.current.contactPeople.contact_person_fullname
          ],
          ["email", this.props.current.contactPeople.contact_person_email],
          ["phone", this.props.current.contactPeople.contact_person_phone]
        ]
      : [];

    const addressData = this.props.current.addresses
      ? [
          ["physical", this.props.current.addresses.physical_address],
          ["postal", this.props.current.addresses.postal_address],
          ["zone", this.props.current.district.zone.zone_name]
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
      <div className="container">
        {this.state.loading ? (
          <Loader />
        ) : (
          <Fragment>
            <div className="row">
              <div className="col m6 s12 mb-8">
                <div className="z-depth-2">
                  <MFLGoogleMap position={position} isMarkerShown />
                </div>
              </div>

              {this._renderContactCards(
                locationData,
                addressData,
                contactPersonData
              )}
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    current: state.facilities.currentDetails,
    isLoading: state.facilities.isLoading
  };
};

export default connect(
  mapStateToProps,
  {
    setCurrentDetails,
    fetchCurrentDetails
  }
)(Location);
