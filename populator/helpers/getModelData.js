'use strict';

const handleError = (error) => console.error(error.message);

module.exports = async (model, query) => {
  return await model.find({ where: query }).catch(handleError);
};
