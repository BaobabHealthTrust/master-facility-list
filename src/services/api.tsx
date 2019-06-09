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

export const getFacilities = (filter: any = null) => {
  const url =
    filter == null
      ? `${settings.API}/facilities/list`
      : `${settings.API}/facilities/list?filter=${JSON.stringify(filter)}`;
  return axios.get(url);
};

export const getFacilityResources = (
  facilityId: number = -1,
  filter: any = null
) => {
  const url =
    filter === null
      ? `${settings.API}/FacilityResources/latest?id=${facilityId}`
      : `${settings.API}/FacilityResources?filter=${JSON.stringify(filter)}`;
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

export const getFacilityServices = (
  facilityId: number = -1,
  filter: any = null
) => {
  const url =
    filter === null
      ? `${settings.API}/FacilityServices/hierarchy?facility_id=${facilityId}`
      : `${settings.API}/FacilityServices?filter=${JSON.stringify(filter)}`;
  return axios.get(url);
};

export const getFacilityUtilities = (
  facilityId: number = -1,
  filter: any = null
) => {
  const url =
    filter === null
      ? `${settings.API}/FacilityUtilities/latest?id=${facilityId}`
      : `${settings.API}/FacilityUtilities?filter=${JSON.stringify(filter)}`;
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
export const getUsers = (token: string) => {
  const url = `${settings.API}/clients`;
  const header = {
    headers: {
      Authorization: `${token}`
    }
  };
  return axios.get(url, header);
};

export const addUser = (data: any, token: string) => {
  const url = `${settings.API}/clients/createAdmin`;
  const header = {
    headers: {
      Authorization: `${token}`
    }
  };
  return axios.post(url, data, header);
};

export const publishFacility = (data: any, token: string) => {
  const url = `${settings.API}/Facilities/publish`;
  const header = {
    headers: {
      Authorization: `${token}`
    }
  };
  return axios.post(url, data, header);
};

export const postBasicDetails = (data: any, token: string) => {
  const url = `${settings.API}/Facilities`;
  const header = {
    headers: {
      Authorization: `${token}`
    }
  };
  return axios.post(url, data, header);
};

export const putBasicDetails = (
  data: any,
  facilityId: number,
  token: string
) => {
  const url = `${settings.API}/Facilities/${facilityId}`;
  const header = {
    headers: {
      Authorization: `${token}`
    }
  };
  return axios.put(url, data, header);
};

export const putContactDetails = (data: any, token: string) => {
  const url = `${settings.API}/Facilities/updateContactDetails`;
  const header = {
    headers: {
      Authorization: `${token}`
    }
  };
  return axios.post(url, data, header);
};

export const postContactDetails = (data: any, token: string) => {
  const url = `${settings.API}/Facilities/contactDetails`;
  const header = {
    headers: {
      Authorization: `${token}`
    }
  };
  return axios.post(url, data, header);
};

export const postResources = (data: any, token: string) => {
  const url = `${settings.API}/FacilityResources`;
  const header = {
    headers: {
      Authorization: `${token}`
    }
  };
  return axios.post(url, data, header);
};

export const putResources = (data: any, token: string) => {
  const url = `${settings.API}/FacilityResources/replaceOrCreate`;
  const header = {
    headers: {
      Authorization: `${token}`
    }
  };
  return axios.post(url, data, header);
};

export const postUtilities = (data: any, token: string) => {
  const url = `${settings.API}/FacilityUtilities`;
  const header = {
    headers: {
      Authorization: `${token}`
    }
  };
  return axios.post(url, data, header);
};

export const putUtilities = (data: any, token: string) => {
  const url = `${settings.API}/FacilityUtilities/replaceOrCreate`;
  const header = {
    headers: {
      Authorization: `${token}`
    }
  };
  return axios.post(url, data, header);
};

export const deleteUtilities = (utilityId: any, token: string) => {
  const url = `${settings.API}/FacilityUtilities/${utilityId}`;
  const header = {
    headers: {
      Authorization: `${token}`
    }
  };
  return axios.delete(url, header);
};

export const postServices = (data: any, token: string) => {
  const url = `${settings.API}/FacilityServices`;
  const header = {
    headers: {
      Authorization: `${token}`
    }
  };
  return axios.post(url, data, header);
};

export const putServices = (data: any, token: string) => {
  const url = `${settings.API}/FacilityServices/replaceOrCreate`;
  const header = {
    headers: {
      Authorization: `${token}`
    }
  };
  return axios.post(url, data, header);
};

export const deleteServices = (serviceId: any, token: string) => {
  const url = `${settings.API}/FacilityServices/${serviceId}`;
  const header = {
    headers: {
      Authorization: `${token}`
    }
  };
  return axios.delete(url, header);
};
