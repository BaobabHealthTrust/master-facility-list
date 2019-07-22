import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export const getUtilities = () => {
  const url = `${API}/Utilities`;
  return axios.get(url);
};

export const getUtilityTypes = () => {
  const url = `${API}/UtilityTypes`;
  return axios.get(url);
};

export const getServices = () => {
  const url = `${API}/Services`;
  return axios.get(url);
};

export const getServiceTypes = () => {
  const url = `${API}/ServiceTypes`;
  return axios.get(url);
};

export const getResources = () => {
  const url = `${API}/Resources`;
  return axios.get(url);
};

export const getResourceTypes = () => {
  const url = `${API}/ResourceTypes`;
  return axios.get(url);
};

export const getRegulatoryStatuses = () => {
  const url = `${API}/RegulatoryStatuses`;
  return axios.get(url);
};

export const getOperationalStatuses = () => {
  const url = `${API}/OperationalStatuses`;
  return axios.get(url);
};

export const getOwners = () => {
  const url = `${API}/Owners`;
  return axios.get(url);
};

export const getDistricts = () => {
  const url = `${API}/districts`;
  return axios.get(url);
};

export const getFacilityTypes = () => {
  const url = `${API}/FacilityTypes`;
  return axios.get(url);
};

export const getFacilities = (filter: any = null) => {
  const url =
    filter == null
      ? `${API}/facilities/list`
      : `${API}/facilities/list?filter=${JSON.stringify(filter)}`;
  return axios.get(url);
};

export const getFacilityResources = (
  facilityId: number = -1,
  filter: any = null,
) => {
  const url =
    filter === null
      ? `${API}/FacilityResources/latest?id=${facilityId}`
      : `${API}/FacilityResources?filter=${JSON.stringify(filter)}`;
  return axios.get(url);
};

export const getFacilityBasicDetails = (facilityId: number) => {
  const FILTER = {
    include: [
      'owner',
      'facilityType',
      'operationalStatus',
      'regulatoryStatus',
      'contactPeople',
      'addresses',
      'locations',
      'geolocations',
      { district: 'zone' },
    ],
  };
  const url = `${API}/Facilities/${facilityId}?filter=${JSON.stringify(
    FILTER,
  )}`;
  return axios.get(url);
};

export const getFacilityServices = (
  facilityId: number = -1,
  filter: any = null,
) => {
  const url =
    filter === null
      ? `${API}/FacilityServices?filter=${JSON.stringify({
          where: { facility_id: facilityId },
        })}`
      : `${API}/FacilityServices?filter=${JSON.stringify(filter)}`;
  return axios.get(url);
};

export const getFacilityUtilities = (
  facilityId: number = -1,
  filter: any = null,
) => {
  const url =
    filter === null
      ? `${API}/FacilityUtilities/latest?id=${facilityId}`
      : `${API}/FacilityUtilities?filter=${JSON.stringify(filter)}`;
  return axios.get(url);
};

export const authenticateUser = (credentials: {
  username: string;
  password: string;
}) => {
  const url = `${API}/clients/login`;
  return axios.post(url, credentials);
};

export const getUserDetails = (userId: number, token: string) => {
  const url = `${API}/clients/${userId}`;
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return axios.get(url, header);
};
export const getUsers = (token: string) => {
  const url = `${API}/clients`;
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return axios.get(url, header);
};

export const addUser = (data: any, token: string) => {
  const url = `${API}/clients/createAdmin`;
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return axios.post(url, data, header);
};

export const putUser = (userId: number, data: any, token: string) => {
  const url = `${API}/clients/${userId}`;
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return axios.patch(url, data, header);
};

export const publishFacility = (data: any, token: string) => {
  const url = `${API}/Facilities/publish`;
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return axios.post(url, data, header);
};

export const postBasicDetails = (data: any, token: string) => {
  const url = `${API}/Facilities`;
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return axios.post(url, data, header);
};

export const putBasicDetails = (
  data: any,
  facilityId: number,
  token: string,
) => {
  const url = `${API}/Facilities/${facilityId}`;
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return axios.put(url, data, header);
};

export const putContactDetails = (data: any, token: string) => {
  const url = `${API}/Facilities/updateContactDetails`;
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return axios.post(url, data, header);
};

export const postContactDetails = (data: any, token: string) => {
  const url = `${API}/Facilities/contactDetails`;
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return axios.post(url, data, header);
};

export const postResources = (data: any, token: string) => {
  const url = `${API}/FacilityResources`;
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return axios.post(url, data, header);
};

export const putResources = (data: any, token: string) => {
  const url = `${API}/FacilityResources/replaceOrCreate`;
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return axios.post(url, data, header);
};

export const postUtilities = (data: any, token: string) => {
  const url = `${API}/FacilityUtilities`;
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return axios.post(url, data, header);
};

export const putUtilities = (data: any, token: string) => {
  const url = `${API}/FacilityUtilities/replaceOrCreate`;
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return axios.post(url, data, header);
};

export const deleteUtilities = (utilityId: any, token: string) => {
  const url = `${API}/FacilityUtilities/${utilityId}`;
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return axios.delete(url, header);
};

export const postServices = (data: any, token: string) => {
  const url = `${API}/FacilityServices`;
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return axios.post(url, data, header);
};

export const putServices = (data: any, token: string) => {
  const url = `${API}/FacilityServices/replaceOrCreate`;
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return axios.post(url, data, header);
};

export const deleteServices = (serviceId: any, token: string) => {
  const url = `${API}/FacilityServices/${serviceId}`;
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return axios.delete(url, header);
};

export const deleteUser = (userId: any, token: string) => {
  const url = `${API}/Clients/${userId}`;
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return axios.delete(url, header);
};

export const getFeedbackTypes = () => {
  const url = `${API}/FeedbackTypes`;

  return axios.get(url);
};

export const postFeedback = (data: any) => {
  const url = `${API}/Feedbacks/feedback`;

  return axios.post(url, data);
};

export const changePassword = (data: any, userId: number, token: string) => {
  const url = `${API}/Client/${userId}`;
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return axios.post(url, data, header);
};
