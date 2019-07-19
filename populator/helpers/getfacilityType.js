'use strict';

module.exports = (facilityTypes = [], s) => {
  const foundFacilityType = facilityTypes.find((o) => o.facility_type === s);
  if (!foundFacilityType) {
    return facilityTypes.find((o) => o.facility_type === 'Unclassified').id;
  }
  return foundFacilityType.id;
};
