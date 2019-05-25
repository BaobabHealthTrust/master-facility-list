import actions from "./actions";
import {
  getUtilities,
  getUtilityTypes,
  getServices,
  getServiceTypes,
  getResources,
  getResourceTypes,
  getRegulatoryStatuses,
  getOperationalStatuses,
  getDistricts,
  getOwners
} from "../../api";

export const fetchUtilities = () => {
  return {
    type: actions.fetchUtilities,
    payload: getUtilities()
  };
};

export const fetchUtilityTypes = () => {
  return {
    type: actions.fetchUtilityTypes,
    payload: getUtilityTypes()
  };
};

export const fetchServices = () => {
  return {
    type: actions.fetchServices,
    payload: getServices()
  };
};

export const fetchServiceTypes = () => {
  return {
    type: actions.fetchServiceTypes,
    payload: getServiceTypes()
  };
};

export const fetchResources = () => {
  return {
    type: actions.fetchResources,
    payload: getResources()
  };
};

export const fetchResourceTypes = () => {
  return {
    type: actions.fetchResourceTypes,
    payload: getResourceTypes()
  };
};

export const fetchRegulatoryStatuses = () => {
  return {
    type: actions.fetchRegulatoryStatuses,
    payload: getRegulatoryStatuses()
  };
};

export const fetchOperationalStatuses = () => {
  return {
    type: actions.fetchOperationalStatuses,
    payload: getOperationalStatuses()
  };
};

export const fetchOwners = () => {
  return {
    type: actions.fetchOwners,
    payload: getOwners()
  };
};

export const fetchDistricts = () => {
  return {
    type: actions.fetchDistricts,
    payload: getDistricts()
  };
};

export const dispatchDependancyError = () => {
  return {
    type: actions.dependacyError
  };
};
