import React from "react";

export const isLoggedIn = (userDetails = null) => {
  userDetails =
    userDetails == null
      ? sessionStorage.getItem("user")
        ? JSON.parse(sessionStorage.getItem("user"))
        : null
      : userDetails;
  return (userDetails && userDetails.token) || false;
};

export const getFacilityId = props => {
  return props.match.params.id;
};

export const getCurrentTab = props => {
  return props.match.path.split("/")[3];
};

export const clearStorage = () => {
  localStorage.clear(["new_facility_active_tab", "new_facility"]);
};

export const renderOptions = (dependancy, entityName: string) => {
  return dependancy.map(entity => (
    <option key={entity.id} value={entity.id}>
      {entity[entityName]}
    </option>
  ));
};

export const getResourcesFieldDefaults = (
  resources,
  currentResources = null
) => {
  let fields = {};
  resources.forEach(resource => {
    let value =
      currentResources === null
        ? []
        : currentResources.filter(res => res.resource_id === resource.id);
    value = value.length === 0 ? null : value[0].quantity;
    fields[`resource_${resource.id}`] = value;
  });

  return fields;
};
export const getResourcesFields = resources => {
  let fields = [];

  fields = resources.map(resource => {
    return `resource_${resource.id}`;
  });

  return fields;
};

export const getUtilitiesDefaults = (currentUtilities = []) =>
  currentUtilities.map(util => util.utility_id);

export const getServicesDefaults = (currentServices = []) => {
  let services = [];
  currentServices.map(ser => {
    // has three levels
    if (
      ser.children &&
      ser.children.length > 0 &&
      ser.children[0].children &&
      ser.children[0].children.length > 0
    ) {
      let service = {
        selectedServiceType: ser.serviceType.id,
        firstLevelService: ser.facilityService.service_id,
        secondLevelService: -1,
        thirdLevelService: -1
      };
      ser.children.map(childService => {
        service = {
          ...service,
          secondLevelService: childService.facilityService.service_id,
          thirdLevelService: -1
        };
        childService.children.map(thirdLevelService => {
          services.push({
            ...service,
            thirdLevelService: thirdLevelService.facilityService.service_id
          });
        });
      });
    }
    // has two levels
    else if (ser.children && ser.children.length > 0) {
      let service = {
        selectedServiceType: ser.serviceType.id,
        firstLevelService: ser.facilityService.service_id,
        secondLevelService: -1,
        thirdLevelService: -1
      };
      ser.children.map(childService => {
        services.push({
          ...service,
          secondLevelService: childService.facilityService.service_id,
          thirdLevelService: -1
        });
      });
    }
    // has one level
    else {
      services.push({
        selectedServiceType: ser.serviceType.id,
        firstLevelService: ser.facilityService.service_id,
        secondLevelService: -1,
        thirdLevelService: -1
      });
    }
  });
  return services;
};

export const getCurrentServices = (currentServices = []) => {
  let services = [];
  currentServices.map(ser => {
    // has three levels
    if (
      ser.children &&
      ser.children.length > 0 &&
      ser.children[0].children &&
      ser.children[0].children.length > 0
    ) {
      services.push(ser.facilityService);
      ser.children.map(childService => {
        services.push(childService.facilityService);
        childService.children.map(thirdLevelService => {
          services.push(thirdLevelService.facilityService);
        });
      });
    }
    // has two levels
    else if (ser.children && ser.children.length > 0) {
      services.push(ser.facilityService);
      ser.children.map(childService => {
        services.push(childService.facilityService);
      });
    }
    // has one level
    else {
      services.push(ser.facilityService);
    }
  });
  return services;
};
