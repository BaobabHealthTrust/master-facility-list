import React from "react";
import { Grid } from "@material-ui/core";
import SectionTitle from "../atoms/FacilityViewSectionTitle";
import FacilityDetail from "../atoms/FacilityDetail";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospital,
  faCertificate,
  faInfo
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

library.add(faHospital, faCertificate, faInfo);

function FacilityDetails(props: Props) {
  const { facility } = props;
  return (
    <Grid container>
      <Grid xs={12} sm={6} md={4}>
        <SectionTitle
          icon={<FontAwesomeIcon icon={faHospital} />}
          text="Basic Details"
        />
        {facility.owner && (
          <FacilityDetail label="Owner" text={facility.owner.facility_owner} />
        )}
        <FacilityDetail label="Common Name" text={facility.common_name} />
        {facility.facilityType && (
          <FacilityDetail
            label="Facility Type"
            text={facility.facilityType.facility_type}
          />
        )}
      </Grid>

      <Grid xs={12} sm={6} md={4}>
        <SectionTitle
          icon={<FontAwesomeIcon icon={faCertificate} />}
          text="License Status"
        />
        <FacilityDetail
          label="Operational Status"
          text={
            facility.operationalStatus &&
            facility.operationalStatus.facility_operational_status
          }
        />
        {facility.facilityType && (
          <FacilityDetail
            label="Date Opened"
            text={moment(facility.facility_date_opened).format("MMMM DD YYYY")}
          />
        )}
        {facility.regulatoryStatus && (
          <FacilityDetail
            label="Registration Status"
            text={facility.regulatoryStatus.facility_regulatory_status}
          />
        )}
      </Grid>

      <Grid xs={12} sm={6} md={4}>
        <SectionTitle
          icon={<FontAwesomeIcon icon={faInfo} />}
          text="System Details"
        />
        <FacilityDetail
          label="MoH Code"
          text={facility.facility_code && facility.facility_code}
        />
        {facility.facility_code_mapping &&
          facility.facility_code_mapping.map((sys: any) => (
            <FacilityDetail label={sys.system} text={sys.code} />
          ))}
      </Grid>
    </Grid>
  );
}

export default FacilityDetails;

type Props = {
  facility: any;
};
