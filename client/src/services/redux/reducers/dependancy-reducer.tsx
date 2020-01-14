import actions from "../actions/actions";
import { getServicesHierachy } from "../../helpers";

const initialState = {
  utilities: {
    list: [],
    types: []
  },
  services: {
    list: [],
    hierachy: [],
    types: []
  },
  resources: {
    list: [],
    types: []
  },
  regulatoryStatuses: {
    list: []
  },
  operationalStatuses: {
    list: []
  },
  districts: {
    list: []
  },
  owners: {
    list: []
  },
  facilityTypes: {
    list: []
  },
  roles: {
    list: []
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
          list: action.payload.data
        }
      };
    case actions.fetchUtilityTypes + "_FULFILLED":
      return {
        ...state,
        utilities: {
          ...state.utilities,
          types: action.payload.data
        }
      };

    case actions.fetchServices + "_FULFILLED":
      return {
        ...state,
        services: {
          ...state.services,
          list: action.payload.data,
          hierachy: getServicesHierachy(action.payload.data)
        }
      };
    case actions.fetchServiceTypes + "_FULFILLED":
      return {
        ...state,
        services: {
          ...state.services,
          types: action.payload.data
        }
      };

    case actions.fetchResources + "_FULFILLED":
      return {
        ...state,
        resources: {
          ...state.resources,
          list: action.payload.data
        }
      };
    case actions.fetchResourceTypes + "_FULFILLED":
      return {
        ...state,
        resources: {
          ...state.resources,
          types: action.payload.data
        }
      };

    case actions.fetchRegulatoryStatuses + "_FULFILLED":
      return {
        ...state,
        regulatoryStatuses: {
          list: action.payload.data
        }
      };

    case actions.fetchDistricts + "_FULFILLED":
      return {
        ...state,
        districts: {
          list: action.payload.data
        }
      };

    case actions.fetchFacilityTypes + "_FULFILLED":
      return {
        ...state,
        facilityTypes: {
          list: action.payload.data
        }
      };

    case actions.fetchOwners + "_FULFILLED":
      return {
        ...state,
        owners: {
          list: action.payload.data
        }
      };
    case actions.fetchOperationalStatuses + "_FULFILLED":
      return {
        ...state,
        operationalStatuses: {
          list: action.payload.data
        }
      };
    case actions.fetchUserRoles + "_FULFILLED":
      return {
        ...state,
        roles: {
          list: action.payload.data
        }
      };
    default:
      return state;
  }
};
