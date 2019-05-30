import actions from "./actions";
import {
  getFacilities,
  getFacilityResources,
  getFacilityBasicDetails,
  getFacilityServices,
  getFacilityUtilities
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
