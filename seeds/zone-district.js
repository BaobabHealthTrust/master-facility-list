"use strict";

const server = require("../server/server");
const dataSource = server.dataSources.db;

console.log("Hie Nyemba");
//const District = server.models.District;
const Zone = server.models.Zone;
const zoneData = [
  {
    zone_name: "Central East Zone",
  },
  {
    zone_name: "Central West Zone",
  },
  {
    zone_name: "North Zone",
  },
  {
    zone_name: "South East Zone",
  },
  {
    zone_name: "South West Zone",
  },
];
const zoneValues = Zone.create(zoneData);

Promise.all([
  zoneValues
])
  .then(values => {
    console.log(
      "fake data for \
       district and zone are created"
    );
    console.log(values[0][0].id);
  });