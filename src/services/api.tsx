import axios from "axios";
import settings from "../App/settings";

export const getUtilities = () => {
  const url = `${settings.API}/Utilities`;
  return axios.get(url);
};

export const getUtilityTypes = () => {
  const url = `${settings.API}/UtilityTypes`;
  return axios.get(url);
};

export const getServices = () => {
  const url = `${settings.API}/Services`;
  return axios.get(url);
};

export const getServiceTypes = () => {
  const url = `${settings.API}/ServiceTypes`;
  return axios.get(url);
};

export const getResources = () => {
  const url = `${settings.API}/Resources`;
  return axios.get(url);
};

export const getResourceTypes = () => {
  const url = `${settings.API}/ResourceTypes`;
  return axios.get(url);
};

export const getRegulatoryStatuses = () => {
  const url = `${settings.API}/RegulatoryStatuses`;
  return axios.get(url);
};

export const getOperationalStatuses = () => {
  const url = `${settings.API}/OperationalStatuses`;
  return axios.get(url);
};

export const getOwners = () => {
  const url = `${settings.API}/Owners`;
  return axios.get(url);
};

export const getDistricts = () => {
  const url = `${settings.API}/districts`;
  return axios.get(url);
};

export const getFacilities = () => {
  const url = `${settings.API}/facilities/list`;
  return axios.get(url);
};
