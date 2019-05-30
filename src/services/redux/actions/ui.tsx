import actions from "./actions";

export const toggleFacilityFilter = () => {
  return {
    type: actions.toggleFacilityFilter
  };
};

export const setActivePage = (page: string) => {
  return {
    type: actions.setActivePage,
    payload: page
  };
};

export const setActiveFacilityPage = (page: string) => {
  return {
    type: actions.setActiveFacilityPage,
    payload: page
  };
};
