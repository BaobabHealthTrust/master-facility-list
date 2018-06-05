// TODO: only send values here
export default (e, type) => {
  return {
    type: type,
    payload: e.target.value
  };
};

