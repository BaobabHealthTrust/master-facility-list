export const getBasicDetails = (data: any) => ({
  registration_number: data.registrationNumber,
  facility_name: data.facilityName,
  common_name: data.commonName,
  facility_date_opened: data.dateOpened,
  facility_type_id: data.facilityType,
  facility_owner_id: data.facilityOwner,
  facility_operational_status_id: data.operationalStatus,
  facility_regulatory_status_id: data.regulatoryStatus,
  district_id: data.district,
  facility_code_mapping: data.facility_code_mapping,
  published_date: data.publishedDate,
  client_id: 1,
  updated_at: Date.now()
});

export const getResources = (data: any, resources: any, facilityId: number) =>
  resources.map((resource: any) => ({
    facility_id: facilityId,
    client_id: 1,
    resource_id: resource.id,
    quantity: Number(data[`resource_${resource.id}`]) || 0,
    description: "",
    created_date: new Date()
  }));

export const getUtilities = (data: any, facilityId: number) =>
  data.map((utility: any) => ({
    facility_id: facilityId,
    utility_id: utility,
    client_id: 1,
    created_date: new Date()
  }));

export const getUtilitiesToDelete = (data: any, currentUtilities: any) =>
  currentUtilities
    .filter((val: any) => !data.includes(val.utility_id))
    .map((val: any) => val.id);

export const getServicesToDelete = (data: any, currentServices: any) =>
  currentServices
    .filter((val: any) => !data.includes(val.service_id))
    .map((val: any) => val.id);

export const getServices = (
  data: any,
  facilityId: number,
  currentServices: Array<any>
) => {
  const services = [];
  for (let service of data) {
    if (Number(service.firstLevelService) > 0) {
      let facilityService = currentServices.filter(
        ser => ser.service_id == service.firstLevelService
      );
      let id = facilityService.length > 0 ? facilityService[0].id : null;
      services.push({
        service_id: service.firstLevelService,
        facility_id: facilityId,
        client_id: 1,
        id
      });
    }

    if (Number(service.secondLevelService) > 0) {
      let facilityService = currentServices.filter(
        ser => ser.service_id == service.secondLevelService
      );
      let id = facilityService.length > 0 ? facilityService[0].id : null;
      services.push({
        service_id: service.secondLevelService,
        facility_id: facilityId,
        client_id: 1,
        id
      });
    }

    if (Number(service.thirdLevelService) > 0) {
      let facilityService = currentServices.filter(
        ser => ser.service_id == service.thirdLevelService
      );
      let id = facilityService.length > 0 ? facilityService[0].id : null;
      services.push({
        service_id: service.thirdLevelService,
        facility_id: facilityId,
        client_id: 1,
        id
      });
    }
  }

  return services;
};

export const getCurrentServices = (currentServices: Array<any> = []) => {
  let services: Array<any> = [];
  currentServices.map(ser => {
    // has three levels
    if (
      ser.children &&
      ser.children.length > 0 &&
      ser.children[0].children &&
      ser.children[0].children.length > 0
    ) {
      services.push(ser.facilityService);
      ser.children.map((childService: any) => {
        services.push(childService.facilityService);
        childService.children.map((thirdLevelService: any) => {
          services.push(thirdLevelService.facilityService);
        });
      });
    }
    // has two levels
    else if (ser.children && ser.children.length > 0) {
      services.push(ser.facilityService);
      ser.children.map((childService: any) => {
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
