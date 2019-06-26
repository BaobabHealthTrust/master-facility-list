'use strict';

module.exports = {
  getIds: async (Model) => {
    return await Model.find({ fields: { id: true } }).map((model) => model.id);
  },
  truncate: async (Model) => {
    const dataSource = Model.dataSource;
    const query = `TRUNCATE TABLE ${Model.definition.name}`;

    await dataSource.connector.execute(query, [], function(err, model) {
      if (err) console.error(err);
    });
  },
};
