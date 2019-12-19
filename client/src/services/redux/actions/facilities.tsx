import actions from "./actions";
import {
  getFacilities,
  getFacilityResources,
  getFacilityBasicDetails,
  getFacilityServices,
  getFacilityUtilities,
  postBasicDetails,
  postResources,
  postUtilities,
  postServices,
  publishFacility as publish,
  putBasicDetails,
  putContactDetails,
  postContactDetails,
  putResources,
  putUtilities,
  deleteUtilities,
  putServices,
  deleteServices,
  archiveFacility as archFacility
} from "../../api";
import { groupIntersect, hasFilterValuesForType } from "../../helpers";

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

export const setQuickSearchValue = (value: any) => {
  return {
    type: actions.setSearchValue,
    payload: value
  };
};

export const fetchCurrentResources = (facilityId: number) => {
  return {
    type: actions.fetchCurrentResources,
    payload: getFacilityResources(facilityId)
  };
};

export const fetchCurrentServices = (facilityId: number, dependancies: any) => {
  return {
    type: actions.fetchCurrentServices,
    payload: getFacilityServices(facilityId),
    meta: dependancies
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

export const patchFacilityContactDetails = (data: any, token: string) => {
  return {
    type: actions.putFacilityContactDetails,
    payload: putContactDetails(data, token)
  };
};

export const postFacilityResources = (data: any, token: string) => {
  return {
    type: actions.postFacilityResources,
    payload: postResources(data, token)
  };
};

export const patchFacilityResources = (data: any, token: string) => {
  return {
    type: actions.putFacilityResources,
    payload: putResources(data, token)
  };
};

export const postFacilityUtilities = (data: any, token: string) => {
  return {
    type: actions.postFacilityUtilities,
    payload: postUtilities(data, token)
  };
};

export const patchFacilityUtilities = (data: any, token: string) => {
  return {
    type: actions.putFacilityUtilities,
    payload: putUtilities(data, token)
  };
};

export const deleteFacilityUtilities = (utilityId: number, token: string) => {
  return {
    type: actions.deleteFacilityUtilities,
    payload: deleteUtilities(utilityId, token)
  };
};

export const postFacilityServices = (data: any, token: string) => {
  return {
    type: actions.postFacilityServices,
    payload: postServices(data, token)
  };
};

export const patchFacilityServices = (data: any, token: string) => {
  return {
    type: actions.putFacilityServices,
    payload: putServices(data, token)
  };
};

export const deleteFacilityServices = (serviceId: number, token: string) => {
  return {
    type: actions.deleteFacilityServices,
    payload: deleteServices(serviceId, token)
  };
};

export const publishFacility = (data: any, token: string) => {
  return {
    type: actions.publishFacility,
    payload: publish(data, token)
  };
};

export const archiveFacility = (data: { id: any }, token: string) => {
  data = {
    ...data,
    archived_date: new Date()
  } as any;
  return {
    type: actions.archiveFacility,
    payload: archFacility(data as any, token)
  };
};

export const addFilterValue = (value: {
  type: string;
  id: number;
  label?: string;
  range?: any;
}) => {
  return {
    type: actions.addFilterValue,
    payload: value
  };
};

export const removeFilterValue = (value: {
  type: string;
  id: number;
  label?: string;
  range?: any;
}) => {
  return {
    type: actions.removeFilterValue,
    payload: value
  };
};

export const removeAllFilterValue = () => {
  return {
    type: actions.removeAllFilterValues
  };
};

export const basicAdvancedFilter = (filterValues: Array<any>) => {
  const districtsFilterOpt = filterValues
    .filter(filter => filter.type == "districts")
    .map(opt => {
      return { district_id: opt.id };
    });

  const facilityTypeFilterOpt = filterValues
    .filter(filter => filter.type == "facilityTypes")
    .map(opt => {
      return { facility_type_id: opt.id };
    });

  const regulatoryStatusFilterOpt = filterValues
    .filter(filter => filter.type == "regulatoryStatuses")
    .map(opt => {
      return { facility_regulatory_status_id: opt.id };
    });

  const operationalStatusFilterOpt = filterValues
    .filter(filter => filter.type == "operationalStatuses")
    .map(opt => {
      return { facility_operational_status_id: opt.id };
    });

  const ownerFilterOpt = filterValues
    .filter(filter => filter.type == "facilityOwners")
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
  return {
    type: actions.basicAdvancedFilter,
    payload: getFacilities(FILTER)
  };
};

export const resourcesAdvancedFilter = (filterValues: Array<any>) => {
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

  return {
    type: actions.resourcesAdvancedFilter,
    payload: getFacilityResources(-1, FILTER)
  };
};

export const utilitiesAdvancedFilter = (filterValues: Array<any>) => {
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

  return {
    type: actions.utilitiesAdvancedFilter,
    payload: getFacilityUtilities(-1, FILTER)
  };
};

export const servicesAdvancedFilter = (filterValues: Array<any>) => {
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

  return {
    type: actions.servicesAdvancedFilter,
    payload: getFacilityServices(-1, FILTER)
  };
};

export const fetchFilteredFacilities = (
  filterValues: Array<any>,
  filterResults: Array<any>
) => {
  const filterSets: Array<any> = [];
  if (hasFilterValuesForType("basic", filterValues)) filterSets.push("basic");

  if (hasFilterValuesForType("resources", filterValues))
    filterSets.push("resources");

  if (hasFilterValuesForType("utilities", filterValues))
    filterSets.push("utilities");

  if (hasFilterValuesForType("services", filterValues))
    filterSets.push("services");

  let filterArray: Array<any> = [];

  for (let set of filterSets) {
    if (set === "basic") {
      filterArray.push(filterResults[set]);
    } else {
      filterArray.push(groupIntersect(filterResults[set]));
    }
  }

  const facilityIds = groupIntersect([...filterArray]);

  return {
    type: actions.fetchFilteredFacilities,
    payload: facilityIds
  };
};
