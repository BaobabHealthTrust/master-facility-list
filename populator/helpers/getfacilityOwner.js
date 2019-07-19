'use strict';

module.exports = (facilityOwners = [], s) => {
  const foundFacilityOwner = facilityOwners.find((o) => o.facility_owner === s);
  if (!foundFacilityOwner) {
    return facilityOwners.find((o) => o.facility_owner === 'Other').id;
  }
  return foundFacilityOwner.id;
};
