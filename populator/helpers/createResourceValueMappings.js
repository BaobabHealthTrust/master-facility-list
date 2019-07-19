'use strict';

module.exports = (facility) => {
  return [
    {resourceName: 'Maternity beds', value: facility[80]},
    {resourceName: 'Delivery beds', value: facility[81]},
    {resourceName: 'Other inpatient beds', value: facility[78]},
    {resourceName: 'Total overningt beds', value: facility[79]},
    {resourceName: 'Motor Vehicle Ambulances', value: facility[110]},
    {resourceName: 'Motor cycles', value: facility[109]},
    {resourceName: 'Vehicles/Cars', value: facility[108]},
    {resourceName: 'Motor cycles', value: facility[108]},
    {resourceName: 'Motor Bike Ambulances', value: facility[110]},
    {resourceName: 'Bicycles', value: facility[111]},
    {resourceName: 'Other', value: facility[112]},
    {resourceName: 'Desktop', value: facility[101]},
    {resourceName: 'Staff houses', value: facility[101]},
  ];
};
