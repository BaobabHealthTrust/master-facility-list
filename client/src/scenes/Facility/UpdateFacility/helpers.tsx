import {
  getServicesHierachy,
  getServicesLeaves,
  getServicesFromLeaves
} from "../../../services/helpers";
// @ts-ignore
import { uniqWith, isEqual } from "lodash";

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
  published_date: data.publishedDate,
  client_id: 1,
  updated_at: Date.now()
});

export const getResources = (data: any, resources: any, facilityId: number) =>
  resources.map((resource: any) => ({
    facility_id: facilityId,
    client_id: 1,
    resource_id: resource.id,
    quantity: Number(data[`resource_${resource.id}`]) || 0,
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

export const getUtilitiesToDelete = (data: any, currentUtilities: any) =>
  currentUtilities
    .filter((val: any) => !data.includes(val.utility_id))
    .map((val: any) => val.id);

export const getServicesToDelete = (data: any, currentServices: any) => {
  data = data.map((val: any) => val.service_id);
  return currentServices
    .filter((val: any) => !data.includes(val.facilityService.service_id))
    .map((val: any) => val.facilityService.id);
};

export const getServices = (
  data: any,
  facilityId: number,
  allServices: Array<any>
) => {
  return uniqWith(
    getServicesFromLeaves(data, allServices).map((ser: any) => ({
      service_id: ser.id,
      facility_id: facilityId,
      client_id: 1
    })),
    isEqual
  );
};

export const getCurrentServices = (currentServices: Array<any> = []) => {
  return getServicesLeaves(currentServices).map((ser: any) => ({
    ...ser.service,
    facilityService: ser.facilityService,
    serviceType: {}
  }));
};

export const getSelectedServicesFromLeaves = (
  currentServices: Array<any>,
  allServices: Array<any>
) => {
  return getServicesFromLeaves(currentServices, allServices);
};
