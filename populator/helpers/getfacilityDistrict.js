'use strict';

module.exports = (districts = [], s) => {
  const foundDistrict = districts.find((o) => o.district_name === s);
  if (!foundDistrict) {
    return districts.find((o) => o.district_name === 'Lilongwe').id;
  }
  return foundDistrict.id;
};
