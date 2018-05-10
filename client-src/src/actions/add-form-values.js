export default (e, type, resource) => {
    return {
        type: type,
        payload: e,
        name: resource
    };
};
