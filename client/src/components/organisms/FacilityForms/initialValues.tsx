import moment from "moment";
export const basic = (facility: any = null) => {
  return {
    facilityName: facility == null ? null : facility.facility_name,
    commonName: facility == null ? null : facility.common_name,
    operationalStatus:
      facility == null ? null : facility.facility_operational_status_id,
    district: facility == null ? null : facility.district_id,
    facilityType: facility == null ? null : facility.facility_type_id,
    regulatoryStatus:
      facility == null ? null : facility.facility_regulatory_status_id,
    facilityOwner: facility == null ? null : facility.facility_owner_id,
    dateOpened:
      facility == null
        ? "1975-01-01"
        : moment(new Date(facility.published_date)).format("YYYY-MM-DD"),
    registrationNumber: facility == null ? null : facility.registration_number,
    publishedDate: facility == null ? null : facility.published_date,
    facility_code_mapping:
      facility == null ? null : facility.facility_code_mapping
  };
};

export const contact = (facility: any = null) => {
  return {
    postalAddress:
      facility == null
        ? null
        : facility.addresses
        ? facility.addresses.postal_address
        : null,

    physicalAddress:
      facility == null
        ? null
        : facility.addresses
        ? facility.addresses.physical_address
        : null,

    contactName:
      facility == null
        ? null
        : facility.contactPeople
        ? facility.contactPeople.contact_person_fullname
        : null,

    contactEmail:
      facility == null
        ? null
        : facility.contactPeople
        ? facility.contactPeople.contact_person_email
        : null,

    contactPhoneNumber:
      facility == null
        ? null
        : facility.contactPeople
        ? facility.contactPeople.contact_person_phone
        : null,

    catchmentArea:
      facility == null
        ? null
        : facility.locations
        ? facility.locations.catchment_area
        : null,

    catchmentPopulation:
      facility == null
        ? null
        : facility.locations
        ? facility.locations.catchment_population
        : null,

    longitude:
      facility == null
        ? null
        : facility.geolocations
        ? facility.geolocations.longitude
        : null,

    latitude:
      facility == null
        ? null
        : facility.geolocations
        ? facility.geolocations.latitude
        : null
  };
};

export const resources = (
  resources: Array<any>,
  currentResources: Array<any> = []
) => {
  return currentResources.length == 0
    ? {
        ...getResourcesFieldDefaults(resources)
      }
    : {
        ...getResourcesFieldDefaults(resources, currentResources)
      };
};

const getResourcesFieldDefaults = (
  resources: any,
  currentResources: any = null
) => {
  let fields: any = {};
  resources.forEach((resource: any) => {
    let value =
      currentResources === null
        ? []
        : currentResources.filter(
            (res: any) => res.resource_id === resource.id
          );
    value = value.length === 0 ? null : value[0].quantity;
    fields[`resource_${resource.id}`] = value;
  });

  return fields;
};

export const utilities = (currentUtilities: Array<any> = []) => {
  return currentUtilities.length == 0
    ? {
        utilities: []
      }
    : {
        utilities: currentUtilities.map((util: any) => util.utility_id)
      };
};

export const services = (currentServices: Array<any> = []) => {
  return currentServices.length == 0
    ? {
        services: []
      }
    : {
        services: getServicesDefaults(currentServices)
      };
};

export const getServicesDefaults = (currentServices: Array<any> = []) => {
  let services: Array<any> = [];
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
      ser.children.map((childService: any) => {
        service = {
          ...service,
          secondLevelService: childService.facilityService.service_id,
          thirdLevelService: -1
        };
        childService.children.map((thirdLevelService: any) => {
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
      ser.children.map((childService: any) => {
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
