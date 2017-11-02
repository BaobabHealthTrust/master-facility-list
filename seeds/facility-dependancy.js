"use strict";

const server = require("../server/server");

const FacilityType = server.models.FacilityType;
const Owner = server.models.Owner;
const OperationalStatus = server.models.OperationalStatus;
const RegulatoryStatus = server.models.RegulatoryStatus;
const ResourceType = server.models.ResourceType;
const Resource = server.models.Resource;
const UtilityType = server.models.UtilityType;
const Utility = server.models.Utility;
const Service = server.models.Service;
const ServiceType = server.models.ServiceType;

const facilityTypes = [
  {
    facility_type: "District hospital",
    description: "These facilities belongs to districts"
  },
  {
    facility_type: "Hospital",
    description: "These facilities are second to district hospitals"
  },
  {
    facility_type: "Central Hospital",
    description: "These are governmental largest owned hospitals"
  },
  {
    facility_type: "Despensary",
    description: "These are middle class health facilities"
  },
  {
    facility_type: "Clinic",
    description: "These are middle class health facilities"
  },
  {
    facility_type: "health centers",
    description: "These are health centers facilities"
  },
  {
    facility_type: "Private",
    description: "These are private health facilities"
  }
];

const facilityType = FacilityType.create(facilityTypes);

const owners = [
  {
    facility_owner: "Private",
    description: "These are private hospital"
  },
  {
    facility_owner: "Government",
    description: "These are government health facilities"
  },
  {
    facility_owner: "Parastatal",
    description: "These are governmental institutional facilities"
  },
  {
    facility_owner: "CHAM",
    description: "These are organisational hospitals"
  },
  {
    facility_owner: "Non-Government",
    description: "These are NGO owned facilities"
  }
];

const owner = Owner.create(owners);

const operationatStatuses = [
  {
    facility_operational_status: "Functional",
    description: "This facility is now operational"
  },
  {
    facility_operational_status: "Pending Operation (Under construction)",
    description: "This facility is still being constructed"
  },
  {
    facility_operational_status: "Pending Operation (Construction Complete)",
    description: "This facility is about to be opened"
  },
  {
    facility_operational_status: "Closed (Temporary)",
    description: "This facility is temporarily closed"
  },
  {
    facility_operational_status: "Closed",
    description: "This facility is now closed"
  }
];

const operationalStatus = OperationalStatus.create(operationatStatuses);

const regulatoryStatuses = [
  {
    facility_regulatory_status: "Registered",
    description: "This is a registered facility"
  },
  {
    facility_regulatory_status: "Registered (Pending Certification)",
    description: "This is a registered but waiting for a certificate"
  },
  {
    facility_regulatory_status: "Registration suspended",
    description: "This facility is currently suspended"
  },
  {
    facility_regulatory_status: "Registration cancelled",
    description: "The registration of this facility is cancelled"
  },
  {
    facility_regulatory_status: "Not Registered",
    description: "This is not a registered facility"
  }
];

const regulatoryStatus = RegulatoryStatus.create(regulatoryStatuses);

Promise.all([
  facilityType,
  owner,
  operationalStatus,
  regulatoryStatus
]).then(values => {
  console.log(values[0]);
  console.log(
    "fake data for facilityType, owner, operationalStatus and regulatoryStatus are created"
  );
});

const resourceTypeTransport = {
  resource_type: "Transport",
  description: "This is a resource type has many sub elements"
};

ResourceType.create(resourceTypeTransport)
  .then(resp => {
    const resource_type_id = resp.id;
    const transportData = [
      {
        resource_name: "Motor Vehicle Ambulances",
        description: "This facility has one ambulance that is operational",
        resource_type_id: resource_type_id
      },
      {
        resource_name: "Vehicles/Cars",
        description: "This facility has no Vehicles or cars",
        resource_type_id: resource_type_id
      },
      {
        resource_name: "Motor cycles",
        description: "This facility has four motor cycles",
        resource_type_id: resource_type_id
      },
      {
        resource_name: "Motor Bike Ambulances",
        description: "This facility has no motor bike ambulances",
        resource_type_id: resource_type_id
      },
      {
        resource_name: "Bicycles",
        description: "This facility has 10 bicycles",
        resource_type_id: resource_type_id
      },
      {
        resource_name: "Other",
        description: "This facility has no Vehicles or cars",
        resource_type_id: resource_type_id
      }
    ];
    Resource.create(transportData)
      .then(values => {
        console.log("transport resources are created");
      })
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));

const resourceTypeBeds = {
  resource_type: "Beds",
  description: "These are places on which patients rest"
};

ResourceType.create(resourceTypeBeds)
  .then(resp => {
    const resource_type_id = resp.id;
    const bedsData = [
      {
        resource_name: "Maternity beds",
        description: "This facility needs more maternity beds",
        resource_type_id: resource_type_id
      },
      {
        resource_name: "Delivery beds",
        description: "This facility needs more delivery beds",
        resource_type_id: resource_type_id
      },
      {
        resource_name: "Other inpatient beds",
        description: "This facility needs more inpatient beds",
        resource_type_id: resource_type_id
      }
    ];
    Resource.create(bedsData)
      .then(values => {
        console.log(" Beds resources created");
      })
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));

const resourceTypeGenerators = {
  resource_type: "Generators",
  description: "These are power sources"
};

ResourceType.create(resourceTypeGenerators)
  .then(resp => {
    const resource_type_id = resp.id;
    const generatorData = [
      {
        resource_name: "20 watts generators",
        description: "These are small generators",
        resource_type_id: resource_type_id
      },
      {
        resource_name: "30 watts generators",
        description: "These are good generators",
        resource_type_id: resource_type_id
      },
      {
        resource_name: "40 watts generator",
        description: "These are better generators",
        resource_type_id: resource_type_id
      },
      {
        resource_name: "50 watts generator",
        description: "These are biggest generators",
        resource_type_id: resource_type_id
      }
    ];
    Resource.create(generatorData)
      .then(values => {
        console.log("Generator resources created");
      })
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));

const resourceTypeComputers = {
  resource_type: "Computers",
  description: "These are data capturing tools on a facility"
};

ResourceType.create(resourceTypeComputers)
  .then(resp => {
    const resource_type_id = resp.id;
    const computerData = [
      {
        resource_name: "Laptop",
        description: "These are portable computers",
        resource_type_id: resource_type_id
      },
      {
        resource_name: "Desktop",
        description: "These are fixed computers",
        resource_type_id: resource_type_id
      }
    ];
    Resource.create(computerData)
      .then(values => {
        console.log("computer resources are created");
      })
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));

const resourceTypeHousing = {
  resource_type: "Housing",
  description: "These are houses for the facility"
};

ResourceType.create(resourceTypeHousing)
  .then(resp => {
    const resource_type_id = resp.id;
    const housingData = [
      {
        resource_name: "Staff houses",
        description: "These are occupied houses",
        resource_type_id: resource_type_id
      }
    ];
    Resource.create(housingData)
      .then(values => {
        console.log("Housing resource created");
      })
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));

const utilityTypeEnergyProvider = {
  utility_type: "Energy provider",
  description: "This is energy source"
};

UtilityType.create(utilityTypeEnergyProvider)
  .then(resp => {
    const utility_type_id = resp.id;
    const energyData = [
      {
        utility_name: "National Grid",
        description: "This is national grid",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "Generator",
        description: "This is generator",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "Solar panels",
        description: "These are solar panels",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "No electricity",
        description: "There is no electricity yet",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "Wired for electricity",
        description: "This is wired electricity",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "Connected to ESCOM Grid",
        description: "This is connected to ESCOM grid",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "Near ESCOM Grid",
        description: "This is near ESCOM grid",
        utility_type_id: utility_type_id
      }
    ];
    Utility.create(energyData)
      .then(values => {
        console.log("Energy sources utilities are created");
      })
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));

const utilityTypeWaterProvider = {
  utility_type: "Water provider",
  description: "This is water source"
};

UtilityType.create(utilityTypeWaterProvider)
  .then(resp => {
    const utility_type_id = resp.id;
    const waterData = [
      {
        utility_name: "Piped into health facility",
        description: "This is piped water into health facility",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "Piped into facility ground",
        description: "This is piped water into facility ground",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "Public tap/stand pipe",
        description: "This is public/stand",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "Tube well/borehole",
        description: "This is tube",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "Tanker truck",
        description: "This is tanker",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "Rainwater harvesting",
        description: "This is rainwater",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "Protected dug well",
        description: "This is Protected dug well",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "Unprotected dug well",
        description: "This is unprotected dug well",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "protected spring",
        description: "This is protected spring",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "unprotected spring",
        description: "This is unprotected spring",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "surface water(Dam/Lake/River/Pond",
        description: "This is surface water",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "Other",
        description: "This is other source",
        utility_type_id: utility_type_id
      }
    ];
    Utility.create(waterData)
      .then(values => {
        console.log("Water source utilities are created");
      })
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));

const utilityTypeWasteDisposal = {
  utility_type: "Waste disposal",
  description: "This is a disposal service"
};

UtilityType.create(utilityTypeWasteDisposal)
  .then(resp => {
    const utility_type_id = resp.id;
    const wasteData = [
      {
        utility_name: "Incinerator",
        description: "This is Incinerator",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "Placenta pit",
        description: "This is placenta",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "Rubbish pit",
        description: "This is Rubbish pit",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "Toilet/pit latrine",
        description: "This is Toilet/pit latrine",
        utility_type_id: utility_type_id
      }
    ];
    Utility.create(wasteData)
      .then(values => {
        console.log("Waste disposal utilities are created");
      })
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));

const utilityTypeNetwporkProvider = {
  utility_type: "Network provider",
  description: "This is a network provider utility"
};

UtilityType.create(utilityTypeNetwporkProvider)
  .then(resp => {
    const utility_type_id = resp.id;
    const networkData = [
      {
        utility_name: "Airtel",
        description: "This is provided by airtel",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "TNM",
        description: "This is provided by TNM",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "Access",
        description: "This is provided by access",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "MTL",
        description: "This is provided by mtl",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "Other",
        description: "This is provided by other",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "GWAN",
        description: "This is provided by GWAN",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "Skyband",
        description: "This is provided by skyband",
        utility_type_id: utility_type_id
      },
      {
        utility_name: "Globe",
        description: "This is provided by globe",
        utility_type_id: utility_type_id
      }
    ];
    Utility.create(networkData)
      .then(values => {
        console.log("Network utilities are created");
      })
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));

const serviceTypeClinical = {
  service_type: "Clinical services",
  description: "These are clinical services"
};

ServiceType.create(serviceTypeClinical)
  .then(resp => {
    const service_type_id = resp.id;
    const opdData = [
      {
        service_name: "Out patient services (OPD)",
        service_description: "This is out patient Service",
        service_type_id: service_type_id,
        service_category_id: ""
      }
    ];
    Service.create(opdData)
      .then(values => {
        console.log("OPD service is created");
      })
      .catch(err => console.error(err));
    const ipdData = [
      {
        service_name: "In patient services (IPD)",
        service_description: "This is in patient Service",
        service_type_id: service_type_id,
        service_category_id: ""
      }
    ];
    Service.create(ipdData)
      .then(values => {
        console.log("IPD service is created");
      })
      .catch(err => console.error(err));
    const mciData = [
      {
        service_name: "MCI-Integrated Mangement of child illiness",
        service_description: "This is a child Service",
        service_type_id: service_type_id,
        service_category_id: ""
      }
    ];
    Service.create(mciData)
      .then(mcivalues => {
        const mci_id = mcivalues.id;
        const ariData = [
          {
            service_name: "ARI",
            service_description: "This is ARI Service",
            service_type_id: service_type_id,
            service_category_id: mci_id
          }
        ];
        Service.create(ariData)
          .then(arivalues => {
            const ari_id = arivalues.id;
            const arisubData = [
              {
                service_name: "Pneumonia treatment",
                service_description: "This is Pneumonia treatment Service",
                service_type_id: service_type_id,
                service_category_id: ari_id
              },
              {
                service_name: "Treatment of severe pneumonia(Oxygen)",
                service_description:
                  "This is treatment of severe pneumonia (Oxygen)",
                service_type_id: service_type_id,
                service_category_id: ari_id
              }
            ];
            Service.create(arisubData)
              .then(arisubvalues => {
                console.log("ARI sub services are created");
              })
              .catch(err => console.error(err));
          })
          .catch(err => console.error(err));

        const diarrhoeaData = [
          {
            service_name: "Diarrhoea diseases",
            service_description: "This is diarrhoea Service",
            service_type_id: service_type_id,
            service_category_id: mci_id
          }
        ];
        Service.create(diarrhoeaData)
          .then(diarrhoeavalues => {
            const diarrhoeaId = diarrhoeavalues.id;
            const diarrhoeasubData = [
              {
                service_name: "ORS",
                service_description: "This is ORS Service",
                service_type_id: service_type_id,
                service_category_id: diarrhoeaId
              },
              {
                service_name: "ZINC",
                service_description: "This is ZINC Service",
                service_type_id: service_type_id,
                service_category_id: diarrhoeaId
              },
              {
                service_name: "Treatment of severe diarrhoea (IV Fluids)",
                service_description: "This is IV Fluids Service",
                service_type_id: service_type_id,
                service_category_id: diarrhoeaId
              }
            ];
            Service.create(diarrhoeasubData)
              .then(diarrhoeasubvalues => {
                console.log("diarrhoea services are created");
              })
              .catch(err => console.error(err));
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));

const serviceTypeTherapeutics = {
  service_type: "Therapeutics services",
  description: "These are therapeutics services"
};

ServiceType.create(serviceTypeTherapeutics)
  .then(resp => {
    const service_type_id = resp.id;
    const therapeuticsData = [
      {
        service_name: "Pharmacy",
        service_description: "This is pharmacy service",
        service_type_id: service_type_id,
        service_category_id: ""
      },
      {
        service_name: "Dispensing room",
        service_description: "This is dispensing service",
        service_type_id: service_type_id,
        service_category_id: ""
      }
    ];
    Service.create(therapeuticsData)
      .then(therapeuticsvalues => {
        console.log("Therapeutics services are created");
      })
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));

const serviceTypeProsthetics = {
  service_type: "Prosthetics and Medical Devices services",
  description: "These are Prosthetics and Medical Devices services"
};

ServiceType.create(serviceTypeProsthetics)
  .then(resp => {
    const service_type_id = resp.id;
    const prostheticsData = [
      {
        service_name: "Prosthetics",
        service_description: "This is Prosthetics service",
        service_type_id: service_type_id,
        service_category_id: ""
      },
      {
        service_name: "Medical devices",
        service_description: "This is medical devices service",
        service_type_id: service_type_id,
        service_category_id: ""
      }
    ];
    Service.create(prostheticsData)
      .then(prostheticsvalues => {
        console.log("Prosthetics services are created");
      })
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));

const serviceTypeNutrition = {
  service_type: "Nutrition services",
  description: "These are nutrition services"
};

ServiceType.create(serviceTypeNutrition)
  .then(resp => {
    const service_type_id = resp.id;
    const nutritionData = [
      {
        service_name: "Vitamin A supplementation in pregnat women",
        service_description:
          "This is Vitamin A supplementation in pregnat women service",
        service_type_id: service_type_id,
        service_category_id: ""
      },
      {
        service_name: "Management of severe malnutrition (children)",
        service_description:
          "This is Management of severe malnutrition (children) service",
        service_type_id: service_type_id,
        service_category_id: ""
      },
      {
        service_name: "Deworming",
        service_description: "This is deworming service",
        service_type_id: service_type_id,
        service_category_id: ""
      },
      {
        service_name:
          "Vitamin A supplementation in infants and children 6-59 months",
        service_description:
          "This is Vitamin A supplementation in infants and children 6-59 months service",
        service_type_id: service_type_id,
        service_category_id: ""
      }
    ];
    Service.create(nutritionData)
      .then(nutritionvalues => {
        console.log("Nutrition services are created");
      })
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));

const serviceTypeCommunityHealth = {
  service_type: "Community health services",
  description: "These are community health services"
};

ServiceType.create(serviceTypeCommunityHealth)
  .then(resp => {
    const service_type_id = resp.id;
    const communityData = [
      {
        service_name: "Health education",
        service_description: "This is health education service",
        service_type_id: service_type_id,
        service_category_id: ""
      },
      {
        service_name: "Growth monitoring",
        service_description: "This is  growth monitoring service",
        service_type_id: service_type_id,
        service_category_id: ""
      }
    ];
    Service.create(communityData)
      .then(communityvalues => {
        console.log("community health services are created");
      })
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));
