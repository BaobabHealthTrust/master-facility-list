'use strict';

module.exports = (facility) => {
  return [
    {utilityName: 'TNM', value: facility[89]},
    {utilityName: 'Access', value: facility[90]},
    {utilityName: 'MTL', value: facility[91]},
    {utilityName: 'Other', value: facility[92]},
    {utilityName: 'GWAN', value: facility[94]},
    {utilityName: 'Skyband', value: facility[95]},
    {utilityName: 'Globe', value: facility[96]},
    {utilityName: 'Airtel', value: facility[88]},
    {utilityName: 'Incinerator', value: facility[202]},
    {utilityName: 'Chamber industrial', value: facility[175]},
    {utilityName: 'Chamber drum', value: facility[176]},
    {utilityName: 'Flat ground', value: facility[178]},
    {utilityName: 'Protected ground', value: facility[179]},
    {utilityName: 'Pit latrine', value: facility[180]},
    {utilityName: 'Pit no protection', value: facility[181]},
    {utilityName: 'Protected ground or pit', value: facility[182]},
    {utilityName: 'Covered container', value: facility[183]},
    {utilityName: 'Other protected environment', value: facility[184]},
    {utilityName: 'Other', value: facility[186]},
    {utilityName: 'Non sharp chamber industrial', value: facility[189]},
    {utilityName: 'Non sharp chamber drum', value: facility[190]},
    {utilityName: 'Non sharp flat ground', value: facility[191]},
    {utilityName: 'Non sharp pit protected ground', value: facility[192]},
    {utilityName: 'Non sharp covered pit', value: facility[193]},
    {utilityName: 'Non sharp open pit', value: facility[194]},
    {utilityName: 'Non sharp protected ground', value: facility[195]},
    {utilityName: 'Non sharp covered container', value: facility[196]},
    {
      utilityName: 'Toilet',
      value: facility[162] == 'YES' || facility[162] == 'Yes' ? 1 : 0,
    },
    {
      utilityName: 'Non sharp other protected environment',
      value: facility[197],
    },
    {utilityName: 'Non sharp other', value: facility[200]},
    {utilityName: 'Wired for electricity', value: facility[118]},
    {utilityName: 'Non sharp other', value: facility[200]},
  ];
};
