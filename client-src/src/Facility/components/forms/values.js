import { getResourcesFieldDefaults } from "../../helpers/utilities";
import { getUtilitiesDefaults } from "../../helpers/utilities";
import { getServicesDefaults } from "../../helpers/utilities";
import moment from "moment";

export const setInitialValues = (nextProp, fromAdd = false) => {
  return {
    details: {
      facilityName: fromAdd
        ? null
        : nextProp.currentFacility.facility_name || null,

      commonName: fromAdd ? null : nextProp.currentFacility.common_name || null,

      operationalStatus: fromAdd
        ? nextProp.operationalStatuses && nextProp.operationalStatuses[0]
          ? nextProp.operationalStatuses[0].id
          : ""
        : nextProp.currentFacility.facility_operational_status_id || null,

      district: fromAdd
        ? nextProp.districts && nextProp.districts[0]
          ? nextProp.districts[0].id
          : ""
        : nextProp.currentFacility.district_id || "",

      facilityType: fromAdd
        ? nextProp.facilityTypes && nextProp.facilityTypes[0]
          ? nextProp.facilityTypes[0].id
          : ""
        : nextProp.currentFacility.facility_type_id || null,

      regulatoryStatus: fromAdd
        ? nextProp.regulatoryStatuses && nextProp.regulatoryStatuses[0]
          ? nextProp.regulatoryStatuses[0].id
          : ""
        : nextProp.currentFacility.facility_regulatory_status_id || null,

      facilityOwner: fromAdd
        ? nextProp.facilityOwners && nextProp.facilityOwners[0]
          ? nextProp.facilityOwners[0].id
          : ""
        : nextProp.currentFacility.facility_owner_id || null,

      dateOpened: fromAdd
        ? "1975-01-01"
        : moment(nextProp.currentFacility.facility_date_opened).format(
            "YYYY-MM-DD"
          ),

      registrationNumber: fromAdd
        ? null
        : nextProp.currentFacility.registration_number || 0,

      publishedDate: fromAdd
        ? null
        : nextProp.currentFacility.published_date || Date.now
    },

    contact: {
      postalAddress: fromAdd
        ? null
        : nextProp.currentFacility.addresses
          ? nextProp.currentFacility.addresses.postal_address
          : null,

      physicalAddress: fromAdd
        ? null
        : nextProp.currentFacility.addresses
          ? nextProp.currentFacility.addresses.physical_address
          : null,

      contactName: fromAdd
        ? null
        : nextProp.currentFacility.contactPeople
          ? nextProp.currentFacility.contactPeople.contact_person_fullname
          : null,

      contactEmail: fromAdd
        ? null
        : nextProp.currentFacility.contactPeople
          ? nextProp.currentFacility.contactPeople.contact_person_email
          : null,

      contactPhoneNumber: fromAdd
        ? null
        : nextProp.currentFacility.contactPeople
          ? nextProp.currentFacility.contactPeople.contact_person_phone
          : null,

      catchmentArea: fromAdd
        ? null
        : nextProp.currentFacility.locations
          ? nextProp.currentFacility.locations.catchment_area
          : null,

      catchmentPopulation: fromAdd
        ? null
        : nextProp.currentFacility.locations
          ? nextProp.currentFacility.locations.catchment_population
          : null,

      longitude: fromAdd
        ? null
        : nextProp.currentFacility.geolocations
          ? nextProp.currentFacility.geolocations.longitude
          : null,

      latitude: fromAdd
        ? null
        : nextProp.currentFacility.geolocations
          ? nextProp.currentFacility.geolocations.latitude
          : null
    },
    resources: fromAdd
      ? {
          ...getResourcesFieldDefaults(nextProp.resources)
        }
      : {
          ...getResourcesFieldDefaults(
            nextProp.resources,
            nextProp.currentResources
          )
        },

    utilities: fromAdd
      ? { utilities: [] }
      : { utilities: getUtilitiesDefaults(nextProp.currentUtilities) },
    services: fromAdd
      ? { services: [] }
      : { services: getServicesDefaults(nextProp.currentServices) }
  };
};
