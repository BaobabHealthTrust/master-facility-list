//@flow
import {
  RegulatoryStatus,
  OperationalStatus,
  FacilityType,
  Owner,
  District
} from "./model-types"

export type SecondaryLink = {
  name: string,
  redirect: ?string,
  displayName: string,
  clickHandler: ?Function
}

export type BasicDetailsFormProps = {
  onNext: Function,
  submitFacility: Function,
  regulatoryStatuses: Array<RegulatoryStatus>,
  operationalStatuses: Array<OperationalStatus>,
  facilityOwners: Array<Owner>,
  facilityTypes: Array<FacilityType>,
  districts: Array<District>
};
