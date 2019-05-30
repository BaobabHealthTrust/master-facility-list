// TODO: only send values here
export default (value, type) => {
  return {
    type: type,
    payload: value
  };
};
