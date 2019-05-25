import actions from "./actions";
import { getFacilities } from "../../api";

export const fetchFacilities = () => {
  return {
    type: actions.fetchFacilities,
    payload: getFacilities()
  };
};
