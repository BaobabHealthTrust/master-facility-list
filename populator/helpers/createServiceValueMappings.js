'use strict';

module.exports = (facility) => {
  return [
    {serviceName: 'Pill', value: facility[241]},
    {serviceName: 'Pill', value: facility[242]},
    {serviceName: 'Injectable', value: facility[243]},
    {serviceName: 'Progesterone only injectable', value: facility[244]},
    {serviceName: 'Male condoms', value: facility[245]},
    {serviceName: 'Female condoms', value: facility[246]},
    {serviceName: 'Intrauterine Device (IUD)', value: facility[247]},
    {serviceName: 'Implant', value: facility[248]},
    {serviceName: 'Cycle Beads', value: facility[249]},
    {serviceName: 'Emergency Contraception', value: facility[250]},
    {serviceName: 'Male Sterilisation', value: facility[251]},
    {serviceName: 'Female Sterilisation', value: facility[252]},
    {serviceName: 'Depoprovera', value: facility[253]},
  ];
};
