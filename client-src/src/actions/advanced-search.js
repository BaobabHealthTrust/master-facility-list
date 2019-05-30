import axios from "axios";
import settings from "../settings";

export const basicAdvancedFilter = filterOptions => {
  const END_POINT = `${settings.hostname}/api/`;
  const RESOURCE = `Facilities/list`;

  const districtsFilterOpt = filterOptions
    .filter(filter => filter.type == "district")
    .map(opt => {
      return { district_id: opt.id };
    });

  const facilityTypeFilterOpt = filterOptions
    .filter(filter => filter.type == "facilityTypes")
    .map(opt => {
      return { facility_type_id: opt.id };
    });

  const regulatoryStatusFilterOpt = filterOptions
    .filter(filter => filter.type == "regulatoryStatuses")
    .map(opt => {
      return { facility_regulatory_status_id: opt.id };
    });

  const operationalStatusFilterOpt = filterOptions
    .filter(filter => filter.type == "operationalStatuses")
    .map(opt => {
      return { facility_operational_status_id: opt.id };
    });

  const ownerFilterOpt = filterOptions
    .filter(filter => filter.type == "facilityOwner")
    .map(opt => {
      return { facility_owner_id: opt.id };
    });

  const FILTER = {
    where: {
      and: [
        { or: districtsFilterOpt },
        { or: facilityTypeFilterOpt },
        { or: regulatoryStatusFilterOpt },
        { or: operationalStatusFilterOpt },
        { or: ownerFilterOpt }
      ]
    }
  };

  const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
  const request = axios.get(URL);

  return {
    type: "FETCH_ADVANCED_SEARCH_BASIC",
    payload: request
  };
};

export const resourcesAdvancedFilter = filterValues => {
  const END_POINT = `${settings.hostname}/api/`;
  const RESOURCE = `FacilityResources`;

  let resFilterValues = filterValues.filter(
    filterValue => filterValue.type == "resources"
  );

  let filter =
    resFilterValues.length > 0
      ? resFilterValues.map(filterValue => {
          return {
            and: [
              { resource_id: filterValue.id },
              { quantity: { gte: filterValue.values[0] } },
              { quantity: { lte: filterValue.values[1] } }
            ]
          };
        })
      : [];

  const FILTER = {
    where: {
      or: filter
    }
  };

  const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
  const request = axios.get(URL);

  return {
    type: "FETCH_FACILITY_BY_RESOURCES",
    payload: request
  };
};

export const utilitiesAdvancedFilter = filterValues => {
  const END_POINT = `${settings.hostname}/api/`;
  const RESOURCE = `FacilityUtilities`;

  let utilFilterValues = filterValues.filter(
    filterValue => filterValue.type == "utilities"
  );

  let filter =
    utilFilterValues.length > 0
      ? utilFilterValues.map(filterValue => {
          return {
            and: [{ utility_id: filterValue.id }]
          };
        })
      : [];

  const FILTER = {
    where: {
      or: filter
    }
  };

  const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
  const request = axios.get(URL);

  return {
    type: "FETCH_FACILITY_BY_UTILITIES",
    payload: request
  };
};

export const servicesAdvancedFilter = filterValues => {
  const END_POINT = `${settings.hostname}/api/`;
  const RESOURCE = `FacilityServices`;

  let serFilterValues = filterValues.filter(
    filterValue => filterValue.type == "services"
  );

  let filter =
    serFilterValues.length > 0
      ? serFilterValues.map(filterValue => {
          return {
            and: [{ service_id: filterValue.id }]
          };
        })
      : [];

  const FILTER = {
    where: {
      or: filter
    }
  };

  const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
  const request = axios.get(URL);

  return {
    type: "FETCH_FACILITY_BY_SERVICES",
    payload: request
  };
};
