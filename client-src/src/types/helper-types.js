//@flow
import {
    RegulatoryStatus,
    OperationalStatus,
    FacilityType,
    Owner
} from "./model-types"

export type SecondaryLink = {
    name: string,
    redirect: ?string,
    displayName: string,
    clickHandler: ?Function
}

export type BasicDetailsFormProps = {
    handleNextForTabs: Function,
    handleCancel: Function,
    addFormValues: Function,
    postFormData: Function,
    facilityName: string,
    facilityNameError: string,
    commonNameError: string,
    commonName: string,
    operationalStatus: string,
    dateOpened: Date,
    regulatoryStatus: string,
    facilityType: string,
    facilityOwner: string,
    regulatoryStatuses: Array<RegulatoryStatus>,
    operationalStatuses: Array<OperationalStatus>,
    facilityOwners: Array<FacilityOwner>,
    facilityTypes: Array<FacilityType>,
    registrationNumber: string,
    registrationNumberError: string,
    postResponse: {}
};
