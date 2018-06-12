//@flow
import {
  RegulatoryStatus,
  OperationalStatus,
  FacilityType,
  Owner,
  Address,
  ContactPeople,
  District,
  Location,
  Geolocation
} from "./model-types"

export type SecondaryLink = {
  name: string,
  redirect: ?string,
  displayName: string,
  clickHandler: ?Function
}

export type CurrentFacility = {
  addresses: Address,
  district: District,
  owner: Owner,
  contactPeople: ContactPeople,
  facilityType: FacilityType,
  geolocations: Geolocation,
  locations: Location,
  operationalStatus: OperationalStatus,
  regulatoryStatus: RegulatoryStatus,
  archive_date: ?string,
  common_name: string,
  district_id: number,
  facility_code: number | string,
  facility_date_opened: string,
  facility_name: string,
  facility_operational_status_id: number,
  facility_owner_id: number,
  facility_regulatory_status_id: number,
  facility_type_id: number,
  registration_number: number,
}

export type BasicDetailsFormProps = {
  onNext: Function,
  submitFacility: Function,
  postFormData: Function,
  regulatoryStatuses: Array<RegulatoryStatus>,
  operationalStatuses: Array<OperationalStatus>,
  facilityOwners: Array<Owner>,
  facilityTypes: Array<FacilityType>,
  districts: Array<District>,
  fromAdd: ?boolean,
  currentFacility: CurrentFacility
};
