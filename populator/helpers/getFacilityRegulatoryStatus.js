'use strict';

module.exports = (regulatoryStatus = [], actualStatus) => {
  if (!actualStatus) {
    const statusName = 'Registration suspended';
    return regulatoryStatus.find(
      (status) => status.facility_regulatory_status == statusName,
    ).id;
  }

  const statusName = 'Registered';
  return regulatoryStatus.find(
    (status) => status.facility_regulatory_status == statusName,
  ).id;
};
