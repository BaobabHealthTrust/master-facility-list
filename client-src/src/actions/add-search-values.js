export default (e, type) => {
    console.log(type);
    return {
        type: type,
        payload: e.target.value
    };
};

