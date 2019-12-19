import actions from "../actions/actions";
import { getServicesHierachyForRedux } from "../../helpers";
// @ts-ignore
import { isEqual, uniqWith } from "lodash";

const initialState = {
  list: [],
  filteredList: [],
  current: {
    resources: [],
    services: [],
    utilities: []
  },
  advancedFilter: {
    filterValues: [],
    filterResults: {
      basic: [],
      resources: [],
      utilities: [],
      services: []
    }
  } as { filterValues: Array<any>; filterResults: any },
  quickSearchValue: "" as any
};
export default (
  state = initialState,
  action: { type: string; payload?: any; meta: any }
) => {
  switch (action.type) {
    case actions.fetchFacilities + "_FULFILLED":
      return {
        ...state,
        list: action.payload.data.data
      };

    case actions.archiveFacility + "_FULFILLED":
      return {
        ...state,
        list: state.list.filter((f: any) => f.id != action.payload.data.id)
      };
    case actions.setSearchValue:
      return {
        ...state,
        quickSearchValue: action.payload
      };
    case actions.fetchFilteredFacilities:
      return {
        ...state,
        filteredList: state.list.filter((val: any) =>
          action.payload.includes(val.id)
        )
      };
    case actions.fetchCurrentBasic + "_FULFILLED":
      return {
        ...state,
        current: {
          ...state.current,
          ...action.payload.data
        }
      };
    case actions.fetchCurrentResources + "_FULFILLED":
      return {
        ...state,
        current: {
          ...state.current,
          resources: action.payload.data.data
        }
      };
    case actions.fetchCurrentServices + "_FULFILLED":
      return {
        ...state,
        current: {
          ...state.current,
          services: uniqWith(
            getServicesHierachyForRedux(
              action.payload.data.data,
              action.meta.services.list,
              action.meta.services.types
            ),
            (curSer: any, nextSer: any) =>
              curSer.service.id == nextSer.service.id
          )
        }
      };

    case actions.fetchCurrentUtilities + "_FULFILLED":
      return {
        ...state,
        current: {
          ...state.current,
          utilities: action.payload.data.data
        }
      };

    case actions.addFilterValue:
      return {
        ...state,
        advancedFilter: {
          ...state.advancedFilter,
          filterValues: uniqWith(
            [action.payload, ...state.advancedFilter.filterValues],
            (cur: any, next: any) => cur.id == next.id && cur.type == next.type
          )
        }
      };
    case actions.removeFilterValue:
      return {
        ...state,
        advancedFilter: {
          ...state.advancedFilter,
          filterValues: state.advancedFilter.filterValues.filter(
            val => !isEqual(val, action.payload)
          )
        }
      };
    case actions.removeAllFilterValues:
      return {
        ...state,
        advancedFilter: {
          ...state.advancedFilter,
          filterValues: [],
          filterResults: {}
        }
      };

    case actions.basicAdvancedFilter + "_FULFILLED":
      return {
        ...state,
        advancedFilter: {
          ...state.advancedFilter,
          filterResults: {
            ...state.advancedFilter.filterResults,
            basic: action.payload.data.data.map((val: any) => val.id)
          }
        }
      };
    case actions.resourcesAdvancedFilter + "_FULFILLED":
      let resourceValues: Array<any> = state.advancedFilter.filterValues.filter(
        val => val.type == "resources"
      );
      let tempResources: Array<any> = [];

      for (let resource of resourceValues) {
        tempResources[resource.id] = action.payload.data
          .filter((val: any) => val.resource_id == resource.id)
          .map((val: any) => val.facility_id);
      }
      return {
        ...state,
        advancedFilter: {
          ...state.advancedFilter,
          filterResults: {
            ...state.advancedFilter.filterResults,
            resources: tempResources
          }
        }
      };

    case actions.utilitiesAdvancedFilter + "_FULFILLED":
      let utilityValues: Array<any> = state.advancedFilter.filterValues.filter(
        val => val.type == "utilities"
      );
      let tempUtilities: Array<any> = [];

      for (let utility of utilityValues) {
        tempUtilities[utility.id] = action.payload.data
          .filter((val: any) => val.utility_id == utility.id)
          .map((val: any) => val.facility_id);
      }
      return {
        ...state,
        advancedFilter: {
          ...state.advancedFilter,
          filterResults: {
            ...state.advancedFilter.filterResults,
            utilities: tempUtilities
          }
        }
      };
    case actions.servicesAdvancedFilter + "_FULFILLED":
      let serviceValues: Array<any> = state.advancedFilter.filterValues.filter(
        val => val.type == "services"
      );
      let tempServices: Array<any> = [];

      for (let service of serviceValues) {
        tempServices[service.id] = action.payload.data
          .filter((val: any) => val.service_id == service.id)
          .map((val: any) => val.facility_id);
      }
      return {
        ...state,
        advancedFilter: {
          ...state.advancedFilter,
          filterResults: {
            ...state.advancedFilter.filterResults,
            services: tempServices
          }
        }
      };
    default:
      return state;
  }
};
