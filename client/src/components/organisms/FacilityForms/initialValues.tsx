import moment from "moment";
import { getServicesLeaves } from "../../../services/helpers";

export const basic = (
  facility: any = null,
  regulatoryStatuses: any = [],
  facilityTypes: any = []
) => {
  const defaultStatus = regulatoryStatuses.find(
    (r: any) => r.facility_regulatory_status === "Not Registered"
  );
  const defaultType = facilityTypes.find(
    (r: any) => r.facility_type === "Unclassified"
  );

  return {
    facilityName: facility == null ? null : facility.facility_name,
    commonName: facility == null ? null : facility.common_name,
    operationalStatus:
      facility == null ? null : facility.facility_operational_status_id,
    district: facility == null ? null : facility.district_id,
    facilityType:
      facility == null
        ? defaultType
          ? defaultType.id
          : null
        : facility.facility_type_id,
    regulatoryStatus:
      facility == null
        ? defaultStatus
          ? defaultStatus.id
          : null
        : facility.facility_regulatory_status_id,
    facilityOwner: facility == null ? null : facility.facility_owner_id,
    dateOpened:
      facility == null
        ? "1975-01-01"
        : moment(new Date(facility.facility_date_opened)).format("YYYY-MM-DD"),
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
  return getServicesLeaves(currentServices).map((ser: any) => ({
    ...ser.service,
    serviceType: {}
  }));
};
