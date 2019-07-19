'use strict';

const { truncate } = require('./seed-helpers');
const { log, error } = console;

module.exports = async (Model, data) => {
  try {
    await truncate(Model);
    await Model.create(data);
    log(`✅ created ${Model.definition.name} Successfully...`);
  } catch (err) {
    error(err.message);
  }
};
