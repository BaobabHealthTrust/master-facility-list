//@Flow
import React, { Component } from "react";
import Card from "../common/MflCard";
import { connect } from "react-redux";
import { fetchCurrentDetails, setCurrentDetails } from "../actions";
import moment from "moment";
import { BasicDetailsForm } from "./FacilityForms";
import { CurrentFacility } from "../types/helper-types";
class Summary extends Component<{ current: CurrentFacility }> {

  async componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchCurrentDetails(id);
  }

  _renderHeadingSection = (title, icon, label) => {
    return (
      <React.Fragment>
        <p className="mfl-summary-header">{title}</p>
        <p className="mfl-summary-text">
          <i class="material-icons mfl-icon left">{icon}</i>
          {label}
        </p>
        <br />
      </React.Fragment>
    )
  }

  render() {
    const { owner, regulatoryStatus, facilityType, operationalStatus, district } = this.props.current;
    const { facility_date_opened } = this.props.current;
    return (
      <div className="container">
        <div>
          <div className="row z-depth-2">
            <div className="col m6 s12">
              {this._renderHeadingSection('Common Name', 'text_fields', this.props.current.common_name)}
              {owner && this._renderHeadingSection('Owner', 'meeting_room', owner.facility_owner)}
              {
                regulatoryStatus && this._renderHeadingSection(
                  'Regulatory Status',
                  'visibility',
                  regulatoryStatus.facility_regulatory_status
                )
              }
            </div>

            <div className="col m6 s12">
              {
                this._renderHeadingSection(
                  'Date Opened',
                  'today',
                  moment(facility_date_opened).format('MMMM DD YYYY')
                )
              }
              {
                facilityType &&
                this._renderHeadingSection(
                  'Facility Type',
                  'local_hospital',
                  facilityType.facility_type
                )
              }
              {
                operationalStatus &&
                this._renderHeadingSection(
                  'Operational Status',
                  'warning',
                  operationalStatus.facility_operational_status
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    current: state.facilities.currentDetails,
  };
};

export default connect(mapStateToProps, {
  setCurrentDetails,
  fetchCurrentDetails
})(Summary);
