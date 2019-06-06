export const toggleAdvancedSearch = () => {
  return {
    type: "TOGGLE_ADVANCED_SEARCH"
  };
};

export const setActivePage = page => {
  return {
    type: "SET_ACTIVE_PAGE",
    payload: page
  };
};
