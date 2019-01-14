export default (token, name) => {
  return {
    type: "SET_USER_DETAILS",
    payload: {
      token,
      name
    }
  };
};
