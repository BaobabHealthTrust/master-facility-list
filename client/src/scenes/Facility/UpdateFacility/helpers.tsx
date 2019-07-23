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

export const getResources = (
  data: any,
  resources: any,
  facilityId: number,
  curResources: any
) => {
  const createdAt = new Date();
  return resources.map((resource: any) => ({
    facility_id: facilityId,
    client_id: 1,
    resource_id: resource.id,
    quantity: Number(data[`resource_${resource.id}`]) || 0,
    description: "",
    created_date: createdAt
  }));
};

const getResourcesId = (
  facilityId: number,
  resource: any,
  curResources: any
) => {
  const res = curResources.filter(
    (val: any) =>
      val.facility_id === facilityId && val.resource_id === resource.id
  );
  return res.length > 0 ? res[0].id : null;
};

export const getUtilities = (
  data: any,
  facilityId: number,
  curUtilities: any
) => {
  const createdAt = new Date();
  return data.map((utility: any) => ({
    facility_id: facilityId,
    utility_id: utility,
    client_id: 1,
    created_date: createdAt
  }));
};

const getUtilityId = (facilityId: number, utility: any, curUtilities: any) => {
  const util = curUtilities.filter(
    (val: any) =>
      val.facility_id === facilityId && val.utility_id === utility.id
  );
  return util.length > 0 ? util[0].id : null;
};
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
  allServices: Array<any>,
  curServices: any
) => {
  const createdAt = new Date();
  return uniqWith(
    getServicesFromLeaves(data, allServices).map((ser: any) => ({
      service_id: ser.id,
      facility_id: facilityId,
      client_id: 1,
      created_date: createdAt
    })),
    isEqual
  );
};

const getServiceId = (facilityId: number, service: any, curServices: any) => {
  const ser = curServices.filter(
    (val: any) =>
      val.facilityService &&
      val.facilityService.facility_id === facilityId &&
      val.facilityService.service_id === service.id
  );
  return ser.length > 0 ? ser[0].facilityService.id : null;
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
