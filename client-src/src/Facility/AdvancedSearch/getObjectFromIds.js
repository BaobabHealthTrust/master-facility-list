export default (ids, entities) => {
    return entities.filter(e => ids.includes(e.id.toString()));
};