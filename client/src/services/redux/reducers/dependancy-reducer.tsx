import actions from "../actions/actions";
import { getServicesHierachy } from "../../helpers";
import apiAdaptor from "../../apiAdaptor";

const initialState = {
  utilities: {
    list: [] as Array<any>,
    types: [] as Array<any>
  },
  services: {
    list: [] as Array<any>,
    hierachy: [] as Array<any>,
    types: [] as Array<any>
  },
  resources: {
    list: [] as Array<any>,
    types: [] as Array<any>
  },
  regulatoryStatuses: {
    list: [] as Array<any>
  },
  operationalStatuses: {
    list: [] as Array<any>
  },
  districts: {
    list: [] as Array<any>
  },
  owners: {
    list: [] as Array<any>
  },
  facilityTypes: {
    list: [] as Array<any>
  },
  roles: {
    list: [] as Array<any>
  }
};
export default (
  state = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case actions.fetchUtilities + "_FULFILLED":
      return {
        ...state,
        utilities: {
          ...state.utilities,
          list: apiAdaptor.getUtilities(action.payload.data)
        }
      };
    case actions.fetchUtilityTypes + "_FULFILLED":
      return {
        ...state,
        utilities: {
          ...state.utilities,
          types: apiAdaptor.getUtilityTypes(action.payload.data)
        }
      };

    case actions.fetchServices + "_FULFILLED":
      return {
        ...state,
        services: {
          ...state.services,
          list: apiAdaptor.getServices(action.payload.data),
          hierachy: apiAdaptor.getServices(
            getServicesHierachy(action.payload.data)
          )
        }
      };
    case actions.fetchServiceTypes + "_FULFILLED":
      return {
        ...state,
        services: {
          ...state.services,
          types: apiAdaptor.getServiceTypes(action.payload.data)
        }
      };

    case actions.fetchResources + "_FULFILLED":
      return {
        ...state,
        resources: {
          ...state.resources,
          list: apiAdaptor.getResources(action.payload.data)
        }
      };
    case actions.fetchResourceTypes + "_FULFILLED":
      return {
        ...state,
        resources: {
          ...state.resources,
          types: apiAdaptor.getResourceTypes(action.payload.data)
        }
      };

    case actions.fetchRegulatoryStatuses + "_FULFILLED":
      return {
        ...state,
        regulatoryStatuses: {
          list: apiAdaptor.getRegulatoryStatuses(action.payload.data)
        }
      };

    case actions.fetchDistricts + "_FULFILLED":
      return {
        ...state,
        districts: {
          list: apiAdaptor.getDistricts(action.payload.data)
        }
      };

    case actions.fetchFacilityTypes + "_FULFILLED":
      return {
        ...state,
        facilityTypes: {
          list: apiAdaptor.getFacilityTypes(action.payload.data)
        }
      };

    case actions.fetchOwners + "_FULFILLED":
      return {
        ...state,
        owners: {
          list: apiAdaptor.getOwners(action.payload.data)
        }
      };
    case actions.fetchOperationalStatuses + "_FULFILLED":
      return {
        ...state,
        operationalStatuses: {
          list: apiAdaptor.getOperationalStatuses(action.payload.data)
        }
      };
    case actions.fetchUserRoles + "_FULFILLED":
      return {
        ...state,
        roles: {
          list: apiAdaptor.getUserRoles(action.payload.data as Array<any>)
        }
      };
    default:
      return state;
  }
};
