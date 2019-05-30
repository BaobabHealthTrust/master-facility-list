import React from "react";
import { Input } from "react-materialize";
import styled from "styled-components";
import { connect } from "react-redux";

const Container = styled.div`
  padding: 15px 30px;
`;

function BasicFilter(props) {
  const districts = props.districts.map(district => {
    return {
      type: "district",
      id: district.id,
      label: district.district_name
    };
  });

  const facilityTypes = props.facilityTypes.map(type => {
    return {
      type: "facilityTypes",
      id: type.id,
      label: type.facility_type
    };
  });

  const regulatoryStatuses = props.regulatoryStatuses.map(status => {
    return {
      type: "regulatoryStatuses",
      id: status.id,
      label: status.facility_regulatory_status
    };
  });

  const operationalStatuses = props.operationalStatuses.map(status => {
    return {
      type: "operationalStatuses",
      id: status.id,
      label: status.facility_operational_status
    };
  });

  const facilityOwners = props.facilityOwners.map(status => {
    return {
      type: "facilityOwner",
      id: status.id,
      label: status.facility_owner
    };
  });

  return (
    <Container>
      <Input
        type="select"
        label="Filter By District"
        name="district"
        onChange={(e, value) => {
          props.onAddFilter(districts[value]);
        }}
      >
        {districts.map((option, index) => (
          <option key={option.id} value={index}>
            {option.label}
          </option>
        ))}
      </Input>
      <Input
        name="type"
        type="select"
        label="Filter By Types"
        onChange={(e, value) => {
          props.onAddFilter(facilityTypes[value]);
        }}
      >
        {facilityTypes.map((option, index) => (
          <option key={option.id} value={index}>
            {option.label}
          </option>
        ))}
      </Input>
      <Input
        name="regulatoryStatus"
        type="select"
        label="Filter By Regulatory Status"
        onChange={(e, value) => {
          props.onAddFilter(regulatoryStatuses[value]);
        }}
      >
        {regulatoryStatuses.map((option, index) => (
          <option key={option.id} value={index}>
            {option.label}
          </option>
        ))}
      </Input>
      <Input
        name="operationStatus"
        type="select"
        label="Filter By Operational Status"
        onChange={(e, value) => {
          props.onAddFilter(operationalStatuses[value]);
        }}
      >
        {operationalStatuses.map((option, index) => (
          <option key={option.id} value={index}>
            {option.label}
          </option>
        ))}
      </Input>
      <Input
        name="ownership"
        type="select"
        label="Filter By Ownership"
        onChange={(e, value) => {
          props.onAddFilter(facilityOwners[value]);
        }}
      >
        {facilityOwners.map((option, index) => (
          <option key={option.id} value={index}>
            {option.label}
          </option>
        ))}
      </Input>
    </Container>
  );
}
const mapStateToProps = state => {
  return {
    districts: state.dependancies.districts,
    facilityTypes: state.dependancies.facilityTypes,
    regulatoryStatuses: state.dependancies.regulatoryStatuses,
    operationalStatuses: state.dependancies.operationalStatuses,
    facilityOwners: state.dependancies.facilityOwners
  };
};

export default connect(mapStateToProps)(BasicFilter);
