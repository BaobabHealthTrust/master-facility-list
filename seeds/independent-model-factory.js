'use strict';

module.exports = async (Model, data) => {
  try {
    const dataSource = Model.dataSource;
    const query = `TRUNCATE TABLE ${Model.definition.name}`;

    await dataSource.connector.execute(query, [], function(err, model) {
      if (err) console.error(err);
    });

    await Model.deleteAll();
    await Model.create(data);
    await console.log(`Created ${Model.definition.name} Successfully...`);
  } catch (err) {
    console.error(err);
  }
};
