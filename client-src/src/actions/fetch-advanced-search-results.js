import axios from "axios";
import settings from "../settings";
import { map, intersection, slice, head, remove, pull } from "lodash";

export default searchGroups => {
  const END_POINT = `${settings.hostname}/api/`;
  const RESOURCE = `Facilities/list`;

  const facilityIds = intersection(
    searchGroups.basicDetailsFacilities,
    groupIntersect(searchGroups.basicDetailsFacilityResources),
    groupIntersect(searchGroups.basicDetailsFacilityUtilities),
    groupIntersect(searchGroups.basicDetailsFacilityServices)
  );

  const FILTER = {
    limit: 10,
    where: {
      id: {
        inq: map(facilityIds)
      }
    }
  };

  const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
  const request = axios.get(URL);

  return {
    type: "FETCH_ADVANCED_SEARCH_RESULTS",
    payload: request
  };
};

const groupIntersect = val => {
  const mapped = val.filter(val => val != null);
  if (mapped.length == 1) {
    return mapped[0];
  }
  return intersection(
    mapped[0],
    groupIntersect(slice(mapped, 1, mapped.length))
  );
};
