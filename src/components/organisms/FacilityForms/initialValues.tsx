import moment from "moment";
export const basic = (facility: any = null) => {
  return {
    facilityName: facility == null ? null : facility.facility_name,
    commonName: facility == null ? null : facility.common_name,
    operationalStatus:
      facility == null ? null : facility.facility_operational_status_id,
    district: facility == null ? null : facility.district_id,
    facilityType: facility == null ? null : facility.facility_type_id,
    regulatoryStatus:
      facility == null ? null : facility.facility_regulatory_status_id,
    facilityOwner: facility == null ? null : facility.facility_owner_id,
    dateOpened:
      facility == null
        ? "1975-01-01"
        : moment(new Date(facility.published_date)).format("YYYY-MM-DD"),
    registrationNumber: facility == null ? null : facility.registration_number,
    publishedDate: facility == null ? null : facility.published_date
  };
};
