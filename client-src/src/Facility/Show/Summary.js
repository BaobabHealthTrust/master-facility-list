//@Flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCurrentDetails, setCurrentDetails } from "../../actions";
import moment from "moment";
import { CurrentFacility } from "../../types/helper-types";
import { Loader } from "../../common";
import { FacilityDetail } from "./components";
import styled from "styled-components";
import { Paper } from "@material-ui/core";
import { Row, Col } from "react-materialize";
import settings from "../../settings";
import { relative } from "path";
import { isLoggedIn } from "../helpers/utilities";
import { DetailsCard } from "./components/DetailsCard";
import { redirectToEdit } from "./helpers";

const CardContent = styled.div.attrs({
  className: "row"
})`
  padding: 30px 30px;
  padding-bottom: 60px;
`;

const CardTitle = styled.div.attrs({
  className: "mfl-card-title  bg-blue"
})``;
class Summary extends Component<{ current: CurrentFacility }> {
  state = {
    error: {},
    loading: true
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchCurrentDetails(id);
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
      <Col m={4} s={12} className="mb-10">
        <SectionTitle icon="business" text="Basic Details" />
        {owner && <FacilityDetail label="Owner" text={owner.facility_owner} />}
        <FacilityDetail
          label="Common Name"
          text={this.props.current.common_name}
        />
        {facilityType && (
          <FacilityDetail
            label="Facility Type"
            text={facilityType.facility_type}
          />
        )}
      </Col>

      <Col m={4} s={12} className="mb-5">
        <SectionTitle icon="new_releases" text="License Status" />
        <FacilityDetail
          label="Date Opened"
          text={moment(facility_date_opened).format("MMMM DD YYYY")}
        />
        {operationalStatus && (
          <FacilityDetail
            label="Operational Status"
            text={operationalStatus.facility_operational_status}
          />
        )}
        {regulatoryStatus && (
          <FacilityDetail
            label="Registration Status"
            text={regulatoryStatus.facility_regulatory_status}
          />
        )}
      </Col>

      <Col m={4} s={12} className="mb-10">
        <SectionTitle icon="info" text="System Details" />
        <FacilityDetail label="MoH Code" text="CDRZD" />
        <FacilityDetail label="DHIS2 Code" text="DFGGZD" />
        <FacilityDetail label="old Code" text="CDo0RZD" />
      </Col>
    </div>
  );

  render() {
    return (
      <Row>
        <Col m={8} s={12} offset="m4">
          <DetailsCard
            isLoading={this.props.isLoading.fetchFacilityDetails}
            isLoggedIn={isLoggedIn()}
            title="Facility Basic Details"
            btnText="Edit Details"
            onEditBtnClick={() => {
              redirectToEdit(this.props);
            }}
          >
            {this._renderFacilityDetailsSections(this.props.current)}
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
)(Summary);

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
