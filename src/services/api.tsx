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

export const getFacilityTypes = () => {
  const url = `${settings.API}/FacilityTypes`;
  return axios.get(url);
};

export const getFacilities = () => {
  const url = `${settings.API}/facilities/list`;
  return axios.get(url);
};

export const getFacilityResources = (facilityId: number) => {
  const url = `${settings.API}/FacilityResources/latest?id=${facilityId}`;
  return axios.get(url);
};

export const getFacilityBasicDetails = (facilityId: number) => {
  const FILTER = {
    include: [
      "owner",
      "facilityType",
      "operationalStatus",
      "regulatoryStatus",
      "contactPeople",
      "addresses",
      "locations",
      "geolocations",
      { district: "zone" }
    ]
  };
  const url = `${settings.API}/Facilities/${facilityId}?filter=${JSON.stringify(
    FILTER
  )}`;
  return axios.get(url);
};

export const getFacilityServices = (facilityId: number) => {
  const url = `${
    settings.API
  }/FacilityServices/hierarchy?facility_id=${facilityId}`;
  return axios.get(url);
};

export const getFacilityUtilities = (facilityId: number) => {
  const url = `${settings.API}/FacilityUtilities/latest?id=${facilityId}`;
  return axios.get(url);
};

export const getUsers = () => {
  const url = `${settings.API}/clients`;
  return axios.get(url);
};

export const authenticateUser = (credentials: {
  username: string;
  password: string;
}) => {
  const url = `${settings.API}/clients/login`;
  return axios.post(url, credentials);
};

export const getUserDetails = (userId: number, token: string) => {
  const url = `${settings.API}/clients/${userId}`;
  const header = {
    headers: {
      Authorization: `${token}`
    }
  };
  return axios.get(url, header);
};
