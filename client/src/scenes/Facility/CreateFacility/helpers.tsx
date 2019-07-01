import {
  getServicesLeaves,
  getServicesFromLeaves
} from "../../../services/helpers";

export const getBasicDetails = (data: any) => ({
  registration_number: data.registrationNumber,
  facility_name: data.facilityName,
  common_name: data.commonName,
  facility_date_opened: data.dateOpened,
  facility_type_id: data.facilityType,
  facility_owner_id: data.facilityOwner,
  facility_operational_status_id: data.operationalStatus,
  facility_regulatory_status_id: data.regulatoryStatus,
  district_id: data.district,
  facility_code_mapping: data.facility_code_mapping,
  client_id: 1,
  updated_at: Date.now()
});

export const getContactDetails = (data: any, facilityId: number) => ({
  data: {
    ...data,
    client: 1,
    updated_at: Date.now()
  },
  id: facilityId
});

export const getResources = (
  data: any,
  allResources: any,
  facilityId: number
) =>
  allResources.map((resource: any) => ({
    facility_id: facilityId,
    client_id: 1,
    resource_id: resource.id,
    quantity: Number(data[`resource_${resource.id}`]),
    description: "",
    created_date: new Date()
  }));

export const getUtilities = (data: any, facilityId: number) =>
  data.map((utility: any) => ({
    facility_id: facilityId,
    utility_id: utility,
    client_id: 1,
    created_date: new Date()
  }));

export const getServices = (
  data: any,
  facilityId: number,
  allServices: Array<any>
) => {
  return getServicesFromLeaves(data, allServices).map((ser: any) => ({
    service_id: ser.id,
    facility_id: facilityId,
    client_id: 1
  }));
};

export const getSelectedServicesFromLeaves = (
  currentServices: Array<any>,
  allServices: Array<any>
) => {
  return getServicesFromLeaves(currentServices, allServices);
};
