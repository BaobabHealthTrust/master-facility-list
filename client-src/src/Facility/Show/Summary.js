//@Flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCurrentDetails, setCurrentDetails } from "../../actions";
import moment from "moment";
import { CurrentFacility } from "../../types/helper-types";
import { Loader } from "../../common";
import { FacilityDetail } from "./components";

class Summary extends Component<{ current: CurrentFacility }> {
  state = {
    error: {},
    loading: true
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchCurrentDetails(id);
  }

  componentWillReceiveProps(nextProps) {
    const { error } = this.props;
    this.setState({ error });

    if (!nextProps.isLoading) this.setState({ loading: false });
  }

  _renderFacilityDetailsSections = ({
    owner,
    regulatoryStatus,
    facilityType,
    operationalStatus,
    facility_date_opened,
    district
  }) => (
    <div>
      <div className="col m6 s12">
        <FacilityDetail
          title="Common Name"
          icon="text_fields"
          label={this.props.current.common_name}
        />
        {owner && (
          <FacilityDetail
            title="Owner"
            icon="meeting_room"
            label={owner.facility_owner}
          />
        )}
        {regulatoryStatus && (
          <FacilityDetail
            title="Regulatory Status"
            icon="visibility"
            label={regulatoryStatus.facility_regulatory_status}
          />
        )}
      </div>

      <div className="col m6 s12">
        <FacilityDetail
          title="Date Opened"
          icon="today"
          label={moment(facility_date_opened).format("MMMM DD YYYY")}
        />
        {facilityType && (
          <FacilityDetail
            title="Facility Type"
            icon="local_hospital"
            label={facilityType.facility_type}
          />
        )}
        {operationalStatus && (
          <FacilityDetail
            title="Operational Status"
            icon="warning"
            label={operationalStatus.facility_operational_status}
          />
        )}
      </div>
    </div>
  );

  render() {
    return (
      <div className="container">
        <div className="row z-depth-2">
          {this.state.loading ? (
            <Loader />
          ) : (
            this._renderFacilityDetailsSections(this.props.current)
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    current: state.facilities.currentDetails,
    isLoading: state.facilities.isLoading,
    error: state.facilities.error
  };
};

export default connect(
  mapStateToProps,
  {
    setCurrentDetails,
    fetchCurrentDetails
  }
)(Summary);
