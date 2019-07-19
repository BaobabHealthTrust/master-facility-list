'use strict';

const { error } = console;

const handleExecute = (err, model) => {
  if (err) {
    error(err.message);
  }

  return;
};

module.exports = async (Model) => {
  try {
    await Model.destroyAll();
    const dataSource = Model.dataSource;
    const query = `TRUNCATE TABLE ${Model.definition.name}`;
    await dataSource.connector.execute(query, [], handleExecute);
  } catch (err) {
    error(err.message);
  }
};
