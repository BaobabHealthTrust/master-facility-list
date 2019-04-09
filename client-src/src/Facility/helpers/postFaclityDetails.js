export const postBasicDetails = async (data, postFormData, id = null) => {
  let details = {
    registration_number: data.registrationNumber,
    facility_name: data.facilityName,
    common_name: data.commonName,
    facility_date_opened: data.dateOpened,
    facility_type_id: data.facilityType,
    facility_owner_id: data.facilityOwner,
    facility_operational_status_id: data.operationalStatus,
    facility_regulatory_status_id: data.regulatoryStatus,
    district_id: data.district,
    client_id: 1,
    updated_at: Date.now()
  };

  let method = id === null ? "POST" : "PUT";
  if (id != null) {
    details = {
      ...details,
      published_date: data.publishedDate
    };
  }

  return await postFormData(
    details,
    "Facilities",
    method,
    "POST_FACILITY_BASIC_DETAILS",
    "",
    id
  );
};

export const postContactDetails = async (
  facility,
  data,
  postFormData,
  action = "Add"
) => {
  const facilityId = Number(facility.id);
  const endpoint = action == "Add" ? "contactDetails" : "updateContactDetails";

  await postFormData(
    {
      data: {
        ...data,
        client: 1,
        updated_at: Date.now()
      },
      id: facilityId
    },
    "Facilities",
    "POST",
    "POST_FACILITY_CONTACT_DETAILS",
    endpoint,
    ""
  );
};

export const updateResourcesDetails = async (
  facility,
  data,
  allresources,
  currentResources,
  postFormData
) => {
  const id = facility.id;
  const date = new Date();
  const resources = allresources.map(resource => {
    let currentFacilityResourceId = currentResources.filter(
      res => res.resource_id == resource.id
    );
    currentFacilityResourceId =
      currentFacilityResourceId.length == 0
        ? null
        : currentFacilityResourceId[0].id;
    return {
      facility_id: id,
      client_id: 1,
      resource_id: resource.id,
      quantity: Number(data[`resource_${resource.id}`]),
      description: "",
      created_date: date,
      id: currentFacilityResourceId
    };
  });

  for (let resource of resources) {
    await postFormData(
      resource,
      "FacilityResources",
      "POST",
      "POST_FACILITY_RESOURCES",
      "replaceOrCreate"
    );
  }
};
export const deleteUtility = async (id, del) =>
  await del(id, "FacilityUtilities", "DELETE_FACILITY_UTILITY");

export const updateUtilityDetails = async (
  facility,
  data,
  currentUtilities,
  postFormData
) => {
  const id = facility.id;
  const date = new Date();
  const utilities = data.map(utility => {
    let currentFacilityUtilityId = currentUtilities.filter(
      util => util.id == utility
    );

    currentFacilityUtilityId =
      currentFacilityUtilityId.length == 0
        ? null
        : currentFacilityUtilityId[0].id;

    return {
      facility_id: id,
      utility_id: utility,
      client_id: 1,
      created_date: date,
      id: currentFacilityUtilityId
    };
  });

  for (let utility of utilities) {
    await postFormData(
      utility,
      "FacilityUtilities",
      "POST",
      "POST_FACILITY_UTILITIES",
      "replaceOrCreate"
    );
  }
};

export const deleteService = async (id, del) =>
  await del(id, "FacilityServices", "DELETE_FACILITY_SERVICE");

export const updateServicesDetails = async (
  facility,
  data,
  postFormData,
  services
) => {
  const id = facility.id;

  for (let service of data) {
    if (Number(service.firstLevelService) > 0) {
      let facilityService = services.filter(
        ser => ser.service_id == service.firstLevelService
      );
      let facilityServiceId =
        facilityService.length > 0 ? facilityService[0].id : null;
      await postFormData(
        {
          service_id: service.firstLevelService,
          facility_id: id,
          client_id: 1,
          id: facilityServiceId
        },
        "FacilityServices",
        "POST",
        "POST_FACILITY_SERVICE",
        "replaceOrCreate"
      );
    }

    if (Number(service.secondLevelService) > 0) {
      let facilityService = services.filter(
        ser => ser.service_id == service.secondLevelService
      );
      let facilityServiceId =
        facilityService.length > 0 ? facilityService[0].id : null;
      await postFormData(
        {
          service_id: service.secondLevelService,
          facility_id: id,
          client_id: 1,
          id: facilityServiceId
        },
        "FacilityServices",
        "POST",
        "POST_FACILITY_SERVICE",
        "replaceOrCreate"
      );
    }

    if (Number(service.thirdLevelService) > 0) {
      let facilityService = services.filter(
        ser => ser.service_id == service.thirdLevelService
      );
      let facilityServiceId =
        facilityService.length > 0 ? facilityService[0].id : null;
      await postFormData(
        {
          service_id: service.thirdLevelService,
          facility_id: id,
          client_id: 1,
          id: facilityServiceId
        },
        "FacilityServices",
        "POST",
        "POST_FACILITY_SERVICE",
        "replaceOrCreate"
      );
    }
  }
};

export const addResources = async (
  facility,
  data,
  allresources,
  postFormData
) => {
  const id = facility.id;
  const date = new Date();
  const resources = allresources.map(resource => {
    return {
      facility_id: id,
      client_id: 1,
      resource_id: resource.id,
      quantity: Number(data[`resource_${resource.id}`]),
      description: "",
      created_date: date
    };
  });

  await postFormData(
    resources,
    "FacilityResources",
    "POST",
    "POST_FACILITY_RESOURCES"
  );
};

export const addUtilities = async (facility, data, postFormData) => {
  const id = facility.id;
  const date = new Date();
  const utilities = data.map(utility => {
    return {
      facility_id: id,
      utility_id: utility,
      client_id: 1,
      created_date: date
    };
  });

  await postFormData(
    utilities,
    "FacilityUtilities",
    "POST",
    "POST_FACILITY_UTILITIES"
  );
};

export const addServices = async (facility, data, postFormData) => {
  const id = facility.id;

  const services = [];
  for (let service of data) {
    if (Number(service.firstLevelService) > 0)
      services.push(service.firstLevelService);

    if (Number(service.secondLevelService) > 0)
      services.push(service.secondLevelService);

    if (Number(service.thirdLevelService) > 0)
      services.push(service.thirdLevelService);
  }

  await postFormData(
    services.map(service => {
      return {
        service_id: service,
        facility_id: id,
        client_id: 1
      };
    }),
    "FacilityServices",
    "POST",
    "POST_FACILITY_SERVICE",
    ""
  );
};
export const publishFacility = async (facility, postFormData) => {
  await postFormData(
    {
      id: facility.id,
      district_id: facility.district_id
    },
    "Facilities",
    "POST",
    "PATCH_BASIC_DETAILS",
    "publish"
  );
};
