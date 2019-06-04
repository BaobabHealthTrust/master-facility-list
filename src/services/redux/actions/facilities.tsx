import actions from "./actions";
import {
  getFacilities,
  getFacilityResources,
  getFacilityBasicDetails,
  getFacilityServices,
  getFacilityUtilities,
  postBasicDetails,
  postContactDetails,
  postResources,
  postUtilities,
  postServices,
  publishFacility as publish,
  putBasicDetails
} from "../../api";

export const fetchFacilities = () => {
  return {
    type: actions.fetchFacilities,
    payload: getFacilities()
  };
};

export const fetchCurrentBasic = (facilityId: number) => {
  return {
    type: actions.fetchCurrentBasic,
    payload: getFacilityBasicDetails(facilityId)
  };
};

export const fetchCurrentResources = (facilityId: number) => {
  return {
    type: actions.fetchCurrentResources,
    payload: getFacilityResources(facilityId)
  };
};

export const fetchCurrentServices = (facilityId: number) => {
  return {
    type: actions.fetchCurrentServices,
    payload: getFacilityServices(facilityId)
  };
};

export const fetchCurrentUtilities = (facilityId: number) => {
  return {
    type: actions.fetchCurrentUtilities,
    payload: getFacilityUtilities(facilityId)
  };
};

export const postFacilityBasicDetails = (data: any, token: string) => {
  return {
    type: actions.postFacilityBasicDetails,
    payload: postBasicDetails(data, token)
  };
};

export const patchFacilityBasicDetails = (
  data: any,
  facilityId: number,
  token: string
) => {
  return {
    type: actions.putFacilityBasicDetails,
    payload: putBasicDetails(data, facilityId, token)
  };
};

export const postFacilityContactDetails = (data: any, token: string) => {
  return {
    type: actions.postFacilityContactDetails,
    payload: postContactDetails(data, token)
  };
};

export const postFacilityResources = (data: any, token: string) => {
  return {
    type: actions.postFacilityResources,
    payload: postResources(data, token)
  };
};

export const postFacilityUtilities = (data: any, token: string) => {
  return {
    type: actions.postFacilityUtilities,
    payload: postUtilities(data, token)
  };
};

export const postFacilityServices = (data: any, token: string) => {
  return {
    type: actions.postFacilityServices,
    payload: postServices(data, token)
  };
};

export const publishFacility = (data: any, token: string) => {
  return {
    type: actions.publishFacility,
    payload: publish(data, token)
  };
};
