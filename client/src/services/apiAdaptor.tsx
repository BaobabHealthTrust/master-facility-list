import { OrderEntities } from "./helpers";
export default {
  getUserRoles: (entities: Array<any>): Array<any> => {
    return OrderEntities("name", entities);
  },

  getUtilities: (entities: Array<any>): Array<any> => {
    return OrderEntities("utility_name", entities);
  },
  getUtilityTypes: (entities: Array<any>): Array<any> => {
    return OrderEntities("utility_type", entities);
  },

  getServices: (entities: Array<any>): Array<any> => {
    return OrderEntities("service_name", entities);
  },
  getServiceTypes: (entities: Array<any>): Array<any> => {
    return OrderEntities("service_type", entities);
  },

  getResources: (entities: Array<any>): Array<any> => {
    return OrderEntities("resource_name", entities);
  },
  getResourceTypes: (entities: Array<any>): Array<any> => {
    return OrderEntities("resource_type", entities);
  },

  getRegulatoryStatuses: (entities: Array<any>): Array<any> => {
    return OrderEntities("facility_regulatory_status", entities);
  },

  getDistricts: (entities: Array<any>): Array<any> => {
    return OrderEntities("district_name", entities);
  },

  getFacilityTypes: (entities: Array<any>): Array<any> => {
    return OrderEntities("facility_type", entities);
  },

  getOwners: (entities: Array<any>): Array<any> => {
    return OrderEntities("facility_owner", entities);
  },

  getOperationalStatuses: (entities: Array<any>): Array<any> => {
    return OrderEntities("facility_operational_status", entities);
  }
};
