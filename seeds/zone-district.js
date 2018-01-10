"use strict";

const server = require("../server/server");
const dataSource = server.dataSources.db;

const District = server.models.District;
const Zone = server.models.Zone;

const zoneData = [
    {
        zone_name: "Central East Zone"
    },
    {
        zone_name: "Central West Zone"
    },
    {
        zone_name: "North Zone"
    },
    {
        zone_name: "South East Zone"
    },
    {
        zone_name: "South West Zone"
    }
];
const zoneValues = Zone.create(zoneData);

Promise.all([zoneValues]).then(values => {
    const districtData = [
        {
            district_name: "Nkhata Bay",
            zone_id: values[0][2].id
        },
        {
            district_name: "Chitipa",
            zone_id: values[0][2].id
        },
        {
            district_name: "Karonga",
            zone_id: values[0][2].id
        },
        {
            district_name: "Mzuzu Central",
            zone_id: values[0][2].id
        },
        {
            district_name: "Rumphi",
            zone_id: values[0][2].id
        },
        {
            district_name: "Mzimba",
            zone_id: values[0][2].id
        },
        {
            district_name: "Likoma",
            zone_id: values[0][2].id
        },
        {
            district_name: "Dowa",
            zone_id: values[0][0].id
        },
        {
            district_name: "Kasungu",
            zone_id: values[0][0].id
        },
        {
            district_name: "Nkhotakota",
            zone_id: values[0][0].id
        },
        {
            district_name: "Ntchisi",
            zone_id: values[0][0].id
        },
        {
            district_name: "Salima",
            zone_id: values[0][0].id
        },
        {
            district_name: "Kamuzu Central",
            zone_id: values[0][1].id
        },
        {
            district_name: "Dedza",
            zone_id: values[0][1].id
        },
        {
            district_name: "Lilongwe",
            zone_id: values[0][1].id
        },
        {
            district_name: "Mchinji",
            zone_id: values[0][1].id
        },
        {
            district_name: "Ntcheu",
            zone_id: values[0][1].id
        },
        {
            district_name: "Balaka",
            zone_id: values[0][3].id
        },
        {
            district_name: "Machinga",
            zone_id: values[0][3].id
        },
        {
            district_name: "Mangochi",
            zone_id: values[0][3].id
        },
        {
            district_name: "Mulanje",
            zone_id: values[0][3].id
        },
        {
            district_name: "Phalombe",
            zone_id: values[0][3].id
        },
        {
            district_name: "Zomba",
            zone_id: values[0][3].id
        },
        {
            district_name: "Blantyre",
            zone_id: values[0][4].id
        },
        {
            district_name: "Queens Elizabeth",
            zone_id: values[0][4].id
        },
        {
            district_name: "Chiradzulu",
            zone_id: values[0][4].id
        },
        {
            district_name: "Chikwawa",
            zone_id: values[0][4].id
        },
        {
            district_name: "Mwanza",
            zone_id: values[0][4].id
        },
        {
            district_name: "Neno",
            zone_id: values[0][4].id
        },
        {
            district_name: "Nsanje",
            zone_id: values[0][4].id
        },
        {
            district_name: "Thyolo",
            zone_id: values[0][4].id
        }
    ];

    const districtValues = District.create(districtData);
    Promise.all([districtValues]).then(values => {
        console.log("All districts and zones are created");
        dataSource.disconnect();
    });
});
