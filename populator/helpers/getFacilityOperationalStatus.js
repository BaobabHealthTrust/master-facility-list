'use strict';

module.exports = (operationalStatus = [], actualStatus) => {
  if (!actualStatus) {
    const statusName = 'Pending Operation (Construction Complete)';
    return operationalStatus.find(
      (status) => status.facility_operational_status == statusName,
    ).id;
  }

  const statusName = 'Functional';
  return operationalStatus.find(
    (status) => status.facility_operational_status == statusName,
  ).id;
};
