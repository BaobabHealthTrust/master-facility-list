"use strict";

const server = require("../server/server");
const dataSource = server.dataSources.db;

const FacilityType = server.models.FacilityType;
const Owner = server.models.Owner;
const OperationalStatus = server.models.OperationalStatus;
const RegulatoryStatus = server.models.RegulatoryStatus;
const Zone = server.models.Zone;

/* This will go */

const ResourceType = server.models.ResourceType;
const Resource = server.models.Resource;

const UtilityType = server.models.UtilityType;
const Utility = server.models.Utility;

const Service = server.models.Service;
const ServiceType = server.models.ServiceType;
/*********************************************/

const facilityTypes = [
  {
    facility_type: "District hospital",
    description: "These facilities belongs to districts",
  },
  {
    facility_type: "Hospital",
    description: "These facilities are second to district hospitals",
  },
  {
    facility_type: "Central Hospital",
    description: "These are governmental largest owned hospitals",
  },
  {
    facility_type: "Despensary",
    description: "These are middle class health facilities",
  },
  {
    facility_type: "Clinic",
    description: "These are middle class health facilities",
  },
  {
    facility_type: "health centers",
    description: "These are health centers facilities",
  },
  {
    facility_type: "Private",
    description: "These are private health facilities",
  },
];

const facilityType = FacilityType.create(facilityTypes);

const owners = [
  {
    facility_owner: "Private",
    description: "These are private hospital",
  },
  {
    facility_owner: "Government",
    description: "These are government health facilities",
  },
  {
    facility_owner: "Parastatal",
    description: "These are governmental institutional facilities",
  },
  {
    facility_owner: "CHAM",
    description: "These are organisational hospitals",
  },
  {
    facility_owner: "Non-Government",
    description: "These are NGO owned facilities",
  },
];

const owner = Owner.create(owners);

const operationatStatuses = [
  {
    facility_operational_status: "Functional",
    description: "This facility is now operational",
  },
  {
    facility_operational_status: "Pending Operation (Under construction)",
    description: "This facility is still being constructed",
  },
  {
    facility_operational_status: "Pending Operation (Construction Complete)",
    description: "This facility is about to be opened",
  },
  {
    facility_operational_status: "Closed (Temporary)",
    description: "This facility is temporarily closed",
  },
  {
    facility_operational_status: "Closed",
    description: "This facility is now closed",
  },
];

const operationalStatus = OperationalStatus.create(operationatStatuses);

const regulatoryStatuses = [
  {
    facility_regulatory_status: "Registered",
    description: "This is a registered facility",
  },
  {
    facility_regulatory_status: "Registered (Pending Certification)",
    description: "This is a registered but waiting for a certificate",
  },
  {
    facility_regulatory_status: "Registration suspended",
    description: "This facility is currently suspended",
  },
  {
    facility_regulatory_status: "Registration cancelled",
    description: "The registration of this facility is cancelled",
  },
  {
    facility_regulatory_status: "Not Registered",
    description: "This is not a registered facility",
  },
];

const regulatoryStatus = RegulatoryStatus.create(regulatoryStatuses);

Promise.all([
  facilityType,
  owner,
  operationalStatus,
  regulatoryStatus,
])
  .then(values => {
    console.log(
      "fake data for facilityType,\
      owner, operationalStatus\
      , district, zone and regulatoryStatus are created"
    );
    // close here and disconnect...
    const resourceTypeTransport = {
      resource_type: "Transport",
      description: "This is a resource type has many sub elements",
    };
    const resourceTypeTrasnportPromise = ResourceType.create(
      resourceTypeTransport
    );

    const resourceTypeBeds = {
      resource_type: "Beds",
      description: "These are places on which patients rest",
    };
    const resourceTypeBedPromise = ResourceType.create(resourceTypeBeds);

    const resourceTypeGenerators = {
      resource_type: "Generators",
      description: "These are power sources",
    };
    const resourceTypeGeneratorPromise = ResourceType.create(
      resourceTypeGenerators
    );

    const resourceTypeComputers = {
      resource_type: "Computers",
      description: "These are data capturing tools on a facility",
    };
    const resourceTypeComputerPromise = ResourceType.create(
      resourceTypeComputers
    );

    const resourceTypeHousing = {
      resource_type: "Housing",
      description: "These are houses for the facility",
    };
    const resourceTypeHousingPromise = ResourceType.create(resourceTypeHousing);

    Promise.all([
      resourceTypeTrasnportPromise,
      resourceTypeBedPromise,
      resourceTypeGeneratorPromise,
      resourceTypeComputerPromise,
      resourceTypeHousingPromise,
    ])
      .then(values => {
        const resourceTypeTransportId = values[0].id;
        const transportData = [
          {
            resource_name: "Motor Vehicle Ambulances",
            description: "This facility has one ambulance that is operational",
            resource_type_id: resourceTypeTransportId,
          },
          {
            resource_name: "Vehicles/Cars",
            description: "This facility has no Vehicles or cars",
            resource_type_id: resourceTypeTransportId,
          },
          {
            resource_name: "Motor cycles",
            description: "This facility has four motor cycles",
            resource_type_id: resourceTypeTransportId,
          },
          {
            resource_name: "Motor Bike Ambulances",
            description: "This facility has no motor bike ambulances",
            resource_type_id: resourceTypeTransportId,
          },
          {
            resource_name: "Bicycles",
            description: "This facility has 10 bicycles",
            resource_type_id: resourceTypeTransportId,
          },
          {
            resource_name: "Other",
            description: "This facility has no Vehicles or cars",
            resource_type_id: resourceTypeTransportId,
          },
        ];
        const resourceTransport = Resource.create(transportData);

        const resourceTypeBedId = values[1].id;
        const bedsData = [
          {
            resource_name: "Maternity beds",
            description: "This facility needs more maternity beds",
            resource_type_id: resourceTypeBedId,
          },
          {
            resource_name: "Delivery beds",
            description: "This facility needs more delivery beds",
            resource_type_id: resourceTypeBedId,
          },
          {
            resource_name: "Other inpatient beds",
            description: "This facility needs more inpatient beds",
            resource_type_id: resourceTypeBedId,
          },
        ];
        const resourceBed = Resource.create(bedsData);

        const resourceTypeGeneratorId = values[2].id;
        const generatorData = [
          {
            resource_name: "20 watts generators",
            description: "These are small generators",
            resource_type_id: resourceTypeGeneratorId,
          },
          {
            resource_name: "30 watts generators",
            description: "These are good generators",
            resource_type_id: resourceTypeGeneratorId,
          },
          {
            resource_name: "40 watts generator",
            description: "These are better generators",
            resource_type_id: resourceTypeGeneratorId,
          },
          {
            resource_name: "50 watts generator",
            description: "These are biggest generators",
            resource_type_id: resourceTypeGeneratorId,
          },
        ];
        const resourceGenerator = Resource.create(generatorData);

        const resourceTypeComputerId = values[3].id;
        const computerData = [
          {
            resource_name: "Laptop",
            description: "These are portable computers",
            resource_type_id: resourceTypeComputerId,
          },
          {
            resource_name: "Desktop",
            description: "These are fixed computers",
            resource_type_id: resourceTypeComputerId,
          },
        ];
        const resourceComputer = Resource.create(computerData);

        const resourceTypeHousingId = values[4].id;
        const housingData = [
          {
            resource_name: "Staff houses",
            description: "These are occupied houses",
            resource_type_id: resourceTypeHousingId,
          },
        ];
        const resourceHousing = Resource.create(housingData);

        Promise.all([
          resourceTransport,
          resourceBed,
          resourceGenerator,
          resourceComputer,
          resourceHousing,
        ])
          .then(values => {
            console.log(
              "All transport, beds,\
              generator, housing and\
              computer resources are created"
            );
            const utilityTypeEnergyProvider = {
              utility_type: "Energy provider",
              description: "This is energy source",
            };
            const utilityTypeEnergyPromise = UtilityType.create(
              utilityTypeEnergyProvider
            );

            const utilityTypeWaterProvider = {
              utility_type: "Water provider",
              description: "This is water source",
            };
            const utilityTypeWaterPromise = UtilityType.create(
              utilityTypeWaterProvider
            );

            const utilityTypeWasteDisposal = {
              utility_type: "Waste disposal",
              description: "This is a disposal service",
            };
            const utilityTypeWasteDisposalPromise = UtilityType.create(
              utilityTypeWasteDisposal
            );

            const utilityTypeNetworkProvider = {
              utility_type: "Network provider",
              description: "This is a network provider utility",
            };

            const utilityTypeNetworkPromise = UtilityType.create(
              utilityTypeNetworkProvider
            );

            Promise.all([
              utilityTypeEnergyPromise,
              utilityTypeWaterPromise,
              utilityTypeWasteDisposalPromise,
              utilityTypeNetworkPromise,
            ])
              .then(values => {
                const utilityTypeEnergyId = values[0].id;
                const energyData = [
                  {
                    utility_name: "National Grid",
                    description: "This is national grid",
                    utility_type_id: utilityTypeEnergyId,
                  },
                  {
                    utility_name: "Generator",
                    description: "This is generator",
                    utility_type_id: utilityTypeEnergyId,
                  },
                  {
                    utility_name: "Solar panels",
                    description: "These are solar panels",
                    utility_type_id: utilityTypeEnergyId,
                  },
                  {
                    utility_name: "No electricity",
                    description: "There is no electricity yet",
                    utility_type_id: utilityTypeEnergyId,
                  },
                  {
                    utility_name: "Wired for electricity",
                    description: "This is wired electricity",
                    utility_type_id: utilityTypeEnergyId,
                  },
                  {
                    utility_name: "Connected to ESCOM Grid",
                    description: "This is connected to ESCOM grid",
                    utility_type_id: utilityTypeEnergyId,
                  },
                  {
                    utility_name: "Near ESCOM Grid",
                    description: "This is near ESCOM grid",
                    utility_type_id: utilityTypeEnergyId,
                  },
                ];
                const utilityEnergy = Utility.create(energyData);

                const utilityTypeWaterId = values[1].id;
                const waterData = [
                  {
                    utility_name: "Piped into health facility",
                    description: "This is piped water into health facility",
                    utility_type_id: utilityTypeWaterId,
                  },
                  {
                    utility_name: "Piped into facility ground",
                    description: "This is piped water into facility ground",
                    utility_type_id: utilityTypeWaterId,
                  },
                  {
                    utility_name: "Public tap/stand pipe",
                    description: "This is public/stand",
                    utility_type_id: utilityTypeWaterId,
                  },
                  {
                    utility_name: "Tube well/borehole",
                    description: "This is tube",
                    utility_type_id: utilityTypeWaterId,
                  },
                  {
                    utility_name: "Tanker truck",
                    description: "This is tanker",
                    utility_type_id: utilityTypeWaterId,
                  },
                  {
                    utility_name: "Rainwater harvesting",
                    description: "This is rainwater",
                    utility_type_id: utilityTypeWaterId,
                  },
                  {
                    utility_name: "Protected dug well",
                    description: "This is Protected dug well",
                    utility_type_id: utilityTypeWaterId,
                  },
                  {
                    utility_name: "Unprotected dug well",
                    description: "This is unprotected dug well",
                    utility_type_id: utilityTypeWaterId,
                  },
                  {
                    utility_name: "protected spring",
                    description: "This is protected spring",
                    utility_type_id: utilityTypeWaterId,
                  },
                  {
                    utility_name: "unprotected spring",
                    description: "This is unprotected spring",
                    utility_type_id: utilityTypeWaterId,
                  },
                  {
                    utility_name: "surface water(Dam/Lake/River/Pond",
                    description: "This is surface water",
                    utility_type_id: utilityTypeWaterId,
                  },
                  {
                    utility_name: "Other",
                    description: "This is other source",
                    utility_type_id: utilityTypeWaterId,
                  },
                ];
                const utilityWater = Utility.create(waterData);

                const utilityTypeWasteDisposalId = values[2].id;
                const wasteData = [
                  {
                    utility_name: "Incinerator",
                    description: "This is Incinerator",
                    utility_type_id: utilityTypeWasteDisposalId,
                  },
                  {
                    utility_name: "Placenta pit",
                    description: "This is placenta",
                    utility_type_id: utilityTypeWasteDisposalId,
                  },
                  {
                    utility_name: "Rubbish pit",
                    description: "This is Rubbish pit",
                    utility_type_id: utilityTypeWasteDisposalId,
                  },
                  {
                    utility_name: "Toilet/pit latrine",
                    description: "This is Toilet/pit latrine",
                    utility_type_id: utilityTypeWasteDisposalId,
                  },
                ];
                const utilityWasteDisposal = Utility.create(wasteData);

                const utilityTypeNetworkId = values[3].id;
                const networkData = [
                  {
                    utility_name: "Airtel",
                    description: "This is provided by airtel",
                    utility_type_id: utilityTypeNetworkId,
                  },
                  {
                    utility_name: "TNM",
                    description: "This is provided by TNM",
                    utility_type_id: utilityTypeNetworkId,
                  },
                  {
                    utility_name: "Access",
                    description: "This is provided by access",
                    utility_type_id: utilityTypeNetworkId,
                  },
                  {
                    utility_name: "MTL",
                    description: "This is provided by mtl",
                    utility_type_id: utilityTypeNetworkId,
                  },
                  {
                    utility_name: "Other",
                    description: "This is provided by other",
                    utility_type_id: utilityTypeNetworkId,
                  },
                  {
                    utility_name: "GWAN",
                    description: "This is provided by GWAN",
                    utility_type_id: utilityTypeNetworkId,
                  },
                  {
                    utility_name: "Skyband",
                    description: "This is provided by skyband",
                    utility_type_id: utilityTypeNetworkId,
                  },
                  {
                    utility_name: "Globe",
                    description: "This is provided by globe",
                    utility_type_id: utilityTypeNetworkId,
                  },
                ];
                const utilityNetwork = Utility.create(networkData);

                Promise.all([
                  utilityEnergy,
                  utilityWater,
                  utilityWasteDisposal,
                  utilityNetwork,
                ])
                  .then(values => {
                    console.log(
                      "All energy, water,\
                      waste disposal and\
                      network utilities are created"
                    );
                    const serviceTypeClinical = {
                      service_type: "Clinical services",
                      description: "These are clinical services",
                    };

                    const serviceTypeClinicalPromise = ServiceType.create(
                      serviceTypeClinical
                    );

                    const serviceTypeTherapeutics = {
                      service_type: "Therapeutics services",
                      description: "These are therapeutics services",
                    };

                    const serviceTypeTherapeuticsPromise = ServiceType
                    .create(
                      serviceTypeTherapeutics
                    );

                    const serviceTypeProsthetics = {
                      service_type: "Prosthetics and Medical Devices services",
                      description:
                        "These are Prosthetics and Medical Devices services",
                    };

                    const serviceTypeProstheticsPromise = ServiceType
                    .create(
                      serviceTypeProsthetics
                    );
                    const serviceTypeNutrition = {
                      service_type: "Nutrition",
                      description: "These are nutrition services",
                    };
                    const serviceTypeNutritionPromise = ServiceType
                    .create(
                      serviceTypeNutrition
                    );
                    const serviceTypeCommunityHealth = {
                      service_type: "Community health services",
                      description: "These are community health services",
                    };

                    const serviceTypeCommunityHealthPromise = ServiceType
                    .create(
                      serviceTypeCommunityHealth
                    );
                    const serviceTypeReproductiveAndChild = {
                      service_type:
                        "Reproductive and\
                        child Health Services",
                      description:
                        "These are reproductive\
                        and child health services",
                    };
                    const serviceTypeReproductiveAndChildPromise =
                    ServiceType.create(
                      serviceTypeReproductiveAndChild
                    );
                    const serviceTypeVaccination = {
                      service_type: "Vaccination",
                      description: "These are vaccination services",
                    };
                    const serviceTypeVaccinationPromise = ServiceType.create(
                      serviceTypeVaccination
                    );
                    const serviceTypeDiagnostic = {
                      service_type: "Diagnostic Services",
                      description: "These are diagnostic services",
                    };
                    const serviceTypeDiagnosticPromise = ServiceType.create(
                      serviceTypeDiagnostic
                    );

                    Promise.all([
                      serviceTypeClinicalPromise,
                      serviceTypeTherapeuticsPromise,
                      serviceTypeProstheticsPromise,
                      serviceTypeNutritionPromise,
                      serviceTypeCommunityHealthPromise,
                      serviceTypeReproductiveAndChildPromise,
                      serviceTypeVaccinationPromise,
                      serviceTypeDiagnosticPromise,
                    ])
                      .then(values => {
                        const serviceTypeClinicalId = values[0].id;
                        const opdData = {
                          service_name: "Out patient services (OPD)",
                          service_description: "This is out patient Service",
                          service_type_id: serviceTypeClinicalId,
                          service_category_id: 0,
                        };

                        const serviceOpd = Service.create(opdData);
                        const ipdData = {
                          service_name: "In patient services (IPD)",
                          service_description: "This is in patient Service",
                          service_type_id: serviceTypeClinicalId,
                          service_category_id: 0,
                        };

                        const serviceIpd = Service.create(ipdData);
                        const mciData = {
                          service_name:
                            "MCI-Integrated Mangement of child illiness",
                          service_description: "This is a child Service",
                          service_type_id: serviceTypeClinicalId,
                          service_category_id: 0,
                        };

                        const serviceMci = Service.create(mciData);
                        const serviceTypeTherapeuticsId = values[1].id;
                        const therapeuticsData = [
                          {
                            service_name: "Pharmacy",
                            service_description: "This is pharmacy service",
                            service_type_id: serviceTypeTherapeuticsId,
                            service_category_id: 0,
                          },
                          {
                            service_name: "Dispensing room",
                            service_description: "This is dispensing service",
                            service_type_id: serviceTypeTherapeuticsId,
                            service_category_id: 0,
                          },
                        ];
                        const serviceTherapeutics = Service.create(
                          therapeuticsData
                        );

                        const serviceTypeProstheticsId = values[2].id;
                        const prostheticsData = [
                          {
                            service_name: "Prosthetics",
                            service_description: "This is Prosthetics service",
                            service_type_id: serviceTypeProstheticsId,
                            service_category_id: 0,
                          },
                          {
                            service_name: "Medical devices",
                            service_description:
                              "This is medical devices service",
                            service_type_id: serviceTypeProstheticsId,
                            service_category_id: 0,
                          },
                        ];
                        const serviceProsthetics = Service.create(
                          prostheticsData
                        );
                        const malariaData = {
                          service_name: "Malaria Diagnosis and Treatment",
                          service_description: "This is malaria service",
                          service_type_id: serviceTypeClinicalId,
                          service_category_id: 0,
                        };
                        const serviceMalaria = Service.create(malariaData);
                        const serviceTypeNutritionId = values[3].id;
                        const nutritionData = [
                          {
                            service_name:
                              "Vitamin A supplementation in pregnat women",
                            service_description:
                              "This is Vitamin A\
                              supplementation in\
                              pregnat women service",
                            service_type_id: serviceTypeNutritionId,
                            service_category_id: 0,
                          },
                          {
                            service_name:
                              "Management of severe malnutrition (children)",
                            service_description:
                              "This is Management\
                              of severe malnutrition\
                              (children) service",
                            service_type_id: serviceTypeNutritionId,
                            service_category_id: 0,
                          },
                          {
                            service_name: "Deworming",
                            service_description: "This is deworming service",
                            service_type_id: serviceTypeNutritionId,
                            service_category_id: 0,
                          },
                          {
                            service_name:
                              "Vitamin A supplementation\
                              in infants and children 6-59 months",
                            service_description:
                              "This is Vitamin A supplementation\
                              in infants and children 6-59 months service",
                            service_type_id: serviceTypeNutritionId,
                            service_category_id: 0,
                          },
                        ];
                        const serviceNutrition = Service.create(nutritionData);
                        const serviceTypeCommunityHealthId = values[4].id;
                        const communityData = [
                          {
                            service_name: "Health education",
                            service_description:
                              "This is health education service",
                            service_type_id: serviceTypeCommunityHealthId,
                            service_category_id: 0,
                          },
                          {
                            service_name: "Growth monitoring",
                            service_description:
                              "This is  growth monitoring service",
                            service_type_id: serviceTypeCommunityHealthId,
                            service_category_id: 0,
                          },
                        ];
                        const serviceCommunity = Service.create(communityData);
                        const serviceTypeReproductiveAndChildId = values[5].id;
                        const familyplanningData = {
                          service_name: "Family planning",
                          service_description:
                            "This is family planning service",
                          service_type_id: serviceTypeReproductiveAndChildId,
                          service_category_id: 0,
                        };
                        const serviceFamilyPlanning = Service.create(
                          familyplanningData
                        );
                        const antenatalData = {
                          service_name: "Ante-natal Services",
                          service_description: "This is  ante-natal service",
                          service_type_id: serviceTypeReproductiveAndChildId,
                          service_category_id: 0,
                        };
                        const serviceAntenatal = Service.create(antenatalData);
                        const deliveryData = {
                          service_name: "Delivery Services",
                          service_description: "This is  delivery service",
                          service_type_id: serviceTypeReproductiveAndChildId,
                          service_category_id: 0,
                        };
                        const serviceDelivery = Service.create(deliveryData);
                        const serviceTypeVaccinationId = values[6].id;
                        const vaccinationData = [
                          {
                            service_name: "Rotavirus",
                            service_description: "This is rotavirus service",
                            service_type_id: serviceTypeVaccinationId,
                            service_category_id: 0,
                          },
                          {
                            service_name: "Measles Rubella",
                            service_description:
                              "This is  measles rubella service",
                            service_type_id: serviceTypeVaccinationId,
                            service_category_id: 0,
                          },
                        ];
                        const serviceVaccination = Service.create(
                          vaccinationData
                        );

                        const serviceTypeDiagnosticId = values[7].id;
                        const laboratoryData = {
                          service_name: "Laboratory",
                          service_description: "This is laboratory service",
                          service_type_id: serviceTypeDiagnosticId,
                          service_category_id: 0,
                        };
                        const serviceLaboratory = Service.create(
                          laboratoryData
                        );
                        const radiologyData = {
                          service_name: "Radiology",
                          service_description: "This is  radiology service",
                          service_type_id: serviceTypeDiagnosticId,
                          service_category_id: 0,
                        };
                        const serviceRadiology = Service.create(radiologyData);

                        Promise.all([
                          serviceOpd,
                          serviceIpd,
                          serviceMci,
                          serviceTherapeutics,
                          serviceProsthetics,
                          serviceMalaria,
                          serviceNutrition,
                          serviceCommunity,
                          serviceFamilyPlanning,
                          serviceAntenatal,
                          serviceDelivery,
                          serviceVaccination,
                          serviceLaboratory,
                          serviceRadiology,
                        ])
                          .then(values => {
                            console.log(
                              "OPD, IPD, Therapeutics,\
                              Prosthetics, Nutrition,\
                              Reproductive and Child Health,\
                              community health and MCI\
                              services are created"
                            );
                            const mciId = values[2].id;
                            const ariData = {
                              service_name: "ARI",
                              service_description: "This is ARI Service",
                              service_type_id: serviceTypeClinicalId,
                              service_category_id: mciId,
                            };
                            const serviceAri = Service.create(ariData);
                            const diarrhoeaData = {
                              service_name: "Diarrhoea diseases",
                              service_description: "This is diarrhoea Service",
                              service_type_id: serviceTypeClinicalId,
                              service_category_id: mciId,
                            };
                            const serviceDiarrhoea = Service.create(
                              diarrhoeaData
                            );
                            const serviceCommunityPeanutData = {
                              service_name:
                                "Community management \
                                of nutrition under-5: \
                                Plumpy peanut",
                              service_description:
                                "This is a nutrition under-5 peanut",
                              service_type_id: serviceTypeClinicalId,
                              service_category_id: mciId,
                            };
                            const serviceCommunityPeanut = Service.create(
                              serviceCommunityPeanutData
                            );
                            const serviceCommunityMicronutrientData = {
                              service_name:
                                "Community management \
                                of in under-5: Micronutrient \
                                provider",
                              service_description:
                                "This is a nutrition under-5 micronutrient",
                              service_type_id: serviceTypeClinicalId,
                              service_category_id: mciId,
                            };
                            const serviceCommunityMicronutrient =
                            Service.create(
                              serviceCommunityMicronutrientData
                            );
                            const serviceCommunityVitaminAData = {
                              service_name:
                                "Community management of \
                                nutrition in under-5: \
                                Vitamin A",
                              service_description:
                                "This is a nutrition under-5 vitamin A",
                              service_type_id: serviceTypeClinicalId,
                              service_category_id: mciId,
                            };
                            const serviceCommunityVitaminA =
                            Service.create(
                              serviceCommunityVitaminAData
                            );

                            const malariaId = values[5].id;
                            const slideData = {
                              service_name: "Slide Microscopy",
                              service_description: "This is a slice microscopy",
                              service_type_id: serviceTypeClinicalId,
                              service_category_id: malariaId,
                            };
                            const serviceSlide = Service.create(slideData);
                            const rapidData = {
                              service_name: "Rapid Diagnostic Test (MRDT)",
                              service_description:
                                "This is a rapid diagnostic test",
                              service_type_id: serviceTypeClinicalId,
                              service_category_id: malariaId,
                            };
                            const serviceRapid = Service.create(rapidData);
                            const rdtsData = {
                              service_name: "RDTs for under-5",
                              service_description: "This is RDTs for under-5",
                              service_type_id: serviceTypeClinicalId,
                              service_category_id: malariaId,
                            };
                            const serviceRdts = Service.create(rdtsData);
                            const firstlineData = {
                              service_name:
                                "First Line Uncomplicated Treatment",
                              service_description:
                                "This is a first line uncomplicated treatment",
                              service_type_id:
                              serviceTypeClinicalId,
                              service_category_id: malariaId,
                            };
                            const serviceFirstLine = Service.create(
                              firstlineData
                            );
                            const tocmData = {
                              service_name: "Treatment of Complicated Malaria",
                              service_description:
                                "This is a treatment of Complicated malaria",
                              service_type_id: serviceTypeClinicalId,
                              service_category_id: malariaId,
                            };
                            const serviceTocm = Service.create(tocmData);
                            const familyplanningId = values[8].id;
                            const familyplanningsubData = [
                              {
                                service_name: "Injectable",
                                service_description:
                                  "This is Injectable Service",
                                service_type_id:
                                serviceTypeReproductiveAndChildId,
                                service_category_id: familyplanningId,
                              },
                              {
                                service_name: "Implant",
                                service_description: "This is Implant service",
                                service_type_id:
                                serviceTypeReproductiveAndChildId,
                                service_category_id: familyplanningId,
                              },
                            ];
                            const serviceFamilyPlanningSub = Service.create(
                              familyplanningsubData
                            );
                            const antenatalId = values[9].id;
                            const antenatalsubData = [
                              {
                                service_name: "Tetanus Toxoid",
                                service_description:
                                  "This is Tetanus Toxoid Service",
                                service_type_id:
                                serviceTypeReproductiveAndChildId,
                                service_category_id: antenatalId,
                              },
                              {
                                service_name: "ITN Distribution",
                                service_description:
                                  "This is ITN\
                                  distribution service",
                                service_type_id:
                                serviceTypeReproductiveAndChildId,
                                service_category_id: antenatalId,
                              },
                            ];
                            const serviceAntenatalSub = Service.create(
                              antenatalsubData
                            );
                            const deliveryId = values[10].id;
                            const deliverysubData = [
                              {
                                service_name:
                                  "Neonatal resuscitation\
                                  (institutional)",
                                service_description:
                                  "This is neonatal\
                                  resuscitation Service",
                                service_type_id:
                                serviceTypeReproductiveAndChildId,
                                service_category_id: deliveryId,
                              },
                              {
                                service_name: "Post-natal consultation",
                                service_description:
                                  "This is post-natal\
                                  consultation service",
                                service_type_id:
                                serviceTypeReproductiveAndChildId,
                                service_category_id: deliveryId,
                              },
                            ];
                            const serviceDeliverySub = Service.create(
                              deliverysubData
                            );
                            const laboratoryId = values[12].id;
                            const laboratorysubData = [
                              {
                                service_name: "Parasitology",
                                service_description:
                                  "This is Parasitology Service",
                                service_type_id:
                                serviceTypeDiagnosticId,
                                service_category_id: laboratoryId,
                              },
                              {
                                service_name: "Clinical Chemistry",
                                service_description:
                                  "This is\
                                  clinical chemistry service",
                                service_type_id:
                                serviceTypeDiagnosticId,
                                service_category_id: laboratoryId,
                              },
                            ];
                            const serviceLaboratorySub = Service.create(
                              laboratorysubData
                            );
                            const radiologyId = values[13].id;
                            const radiologysubData = [
                              {
                                service_name: "X-ray",
                                service_description: "This is X-ray Service",
                                service_type_id:
                                serviceTypeDiagnosticId,
                                service_category_id: radiologyId,
                              },
                              {
                                service_name: "Ultrasound",
                                service_description:
                                  "This is\
                                  ultrasound service",
                                service_type_id:
                                serviceTypeDiagnosticId,
                                service_category_id: radiologyId,
                              },
                            ];
                            const serviceRadiologySub = Service.create(
                              radiologysubData
                            );

                            Promise.all([
                              serviceAri,
                              serviceDiarrhoea,
                              serviceCommunityPeanut,
                              serviceCommunityMicronutrient,
                              serviceCommunityVitaminA,
                              serviceSlide,
                              serviceRapid,
                              serviceRdts,
                              serviceFirstLine,
                              serviceTocm,
                              serviceFamilyPlanningSub,
                              serviceAntenatalSub,
                              serviceDeliverySub,
                              serviceLaboratorySub,
                              serviceRadiologySub,
                            ])
                              .then(values => {
                                console.log(
                                  "ARI, community management,\
                                  Radiology and Diarrhoea\
                                  services are created"
                                );
                                const ariId = values[0].id;
                                const arisubData = [
                                  {
                                    service_name: "Pneumonia treatment",
                                    service_description:
                                      "This is Pneumonia treatment Service",
                                    service_type_id:
                                    serviceTypeClinicalId,
                                    service_category_id: ariId,
                                  },
                                  {
                                    service_name:
                                      "Treatment of severe pneumonia(Oxygen)",
                                    service_description:
                                      "This is treatment\
                                      of severe pneumonia (Oxygen)",
                                    service_type_id:
                                    serviceTypeClinicalId,
                                    service_category_id: ariId,
                                  },
                                ];
                                const serviceSubAri = Service.create(
                                  arisubData
                                );

                                const diarrhoeaId = values[1].id;
                                const diarrhoeasubData = [
                                  {
                                    service_name: "ORS",
                                    service_description: "This is ORS Service",
                                    service_type_id:
                                    serviceTypeClinicalId,
                                    service_category_id: diarrhoeaId,
                                  },
                                  {
                                    service_name: "ZINC",
                                    service_description: "This is ZINC Service",
                                    service_type_id:
                                    serviceTypeClinicalId,
                                    service_category_id: diarrhoeaId,
                                  },
                                  {
                                    service_name:
                                      "Treatment of severe\
                                      diarrhoea (IV Fluids)",
                                    service_description:
                                      "This is IV Fluids Service",
                                    service_type_id:
                                    serviceTypeClinicalId,
                                    service_category_id: diarrhoeaId,
                                  },
                                ];
                                const serviceSubDiarrhoea = Service.create(
                                  diarrhoeasubData
                                );

                                const firstlineId = values[8].id;
                                const adultless36Data = {
                                  service_name: "Adult less than 36 kg",
                                  service_description:
                                    "This is adult less than 36 kgs",
                                  service_type_id:
                                  serviceTypeClinicalId,
                                  service_category_id: firstlineId,
                                };
                                const serviceAdultless36 = Service.create(
                                  adultless36Data
                                );
                                const adultmore36Data = {
                                  service_name: "Adult more than 36 kg",
                                  service_description:
                                    "This is adult more than 36 kgs",
                                  service_type_id:
                                  serviceTypeClinicalId,
                                  service_category_id: firstlineId,
                                };
                                const serviceAdultmore36 = Service.create(
                                  adultmore36Data
                                );
                                const childrenless15Data = {
                                  service_name: "Children less than 15 kg",
                                  service_description:
                                    "This is a service of\
                                    children less than 15 kgs",
                                  service_type_id:
                                  serviceTypeClinicalId,
                                  service_category_id: firstlineId,
                                };
                                const serviceChildrenless15 = Service.create(
                                  childrenless15Data
                                );
                                const childrenmore15Data = {
                                  service_name: "Children more than 15 kg",
                                  service_description:
                                    "This is a service\
                                    of children more than 15 kgs",
                                  service_type_id:
                                  serviceTypeClinicalId,
                                  service_category_id: firstlineId,
                                };
                                const serviceChildrenmore15 = Service.create(
                                  childrenmore15Data
                                );
                                const tocmId = values[9].id;
                                const adultiartData = {
                                  service_name: "Adult, Injectable Artesunate",
                                  service_description:
                                    "This is artesunate service for adult",
                                  service_type_id:
                                  serviceTypeClinicalId,
                                  service_category_id: tocmId,
                                };
                                const serviceAdultIArt = Service.create(
                                  adultiartData
                                );
                                const childreniartData = {
                                  service_name:
                                    "Children, Injectable Artesunate",
                                  service_description:
                                    "This is artesunate service for children",
                                  service_type_id:
                                  serviceTypeClinicalId,
                                  service_category_id: tocmId,
                                };
                                const serviceChildrenIArt = Service.create(
                                  childreniartData
                                );
                                Promise.all([
                                  serviceSubAri,
                                  serviceSubDiarrhoea,
                                  serviceAdultless36,
                                  serviceAdultmore36,
                                  serviceChildrenless15,
                                  serviceChildrenmore15,
                                  serviceAdultIArt,
                                  serviceChildrenIArt,
                                ])
                                  .then(values => {
                                    console.log(
                                      "ARI sub and diarrhoea\
                                      services are created"
                                    );
                                    dataSource.disconnect();
                                  })
                                  .catch(err => console.error(err));
                              })
                              .catch(err => console.error(err));
                          })
                          .catch(err => console.error(err));
                      })
                      .catch(err => console.error(err));
                  })
                  .catch(err => console.error(err));
              })
              .catch(err => console.error(err));
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));
