module.exports = async (model, condition) => {
  const data = await model.findOne(condition);
  return data.id;
};
