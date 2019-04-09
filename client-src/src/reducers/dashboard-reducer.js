//@flow
import type { FacilityService } from "../types/model-types";

type reduxAction = {
  type: string,
  payload: { data: Array<FacilityService> }
};

export default (
  store: any = {
    dashboardFacilityServices: []
  },
  action: reduxAction
) => {
  switch (action.type) {
    case "FETCH_FACILITY_SERVICES_FULFILLED":
      return {
        facilityServices: action.payload.data
      };
    default:
      return store;
  }
};
