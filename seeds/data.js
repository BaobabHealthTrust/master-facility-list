"use strict";

const refs = require("./refs");

module.exports.owners = [{
    facility_owner: refs.OWNERS.PRIVATE,
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

module.exports.facilityTypes = [{
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

module.exports.regulatoryStatuses = [{
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

module.exports.operationalStatuses = [{
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

const zoneData = [{
    zone_name: refs.ZONES.CENTRAL_EAST
  },
  {
    zone_name: refs.ZONES.CENTRAL_WEST
  },
  {
    zone_name: refs.ZONES.NORTH
  },
  {
    zone_name: refs.ZONES.SOUTH_EAST
  },
  {
    zone_name: refs.ZONES.SOUTH_WEST
  }
];

module.exports.zoneData = zoneData;

module.exports.users = [{
    username: "haroon123",
    password: "haxy",
    firstname: "Haroon",
    lastname: "Twalibu",
    email: "haroon@gmail.com"
  },
  {
    username: "chisomo123",
    password: "momo",
    firstname: "Chisomo",
    lastname: "Liabunya",
    email: "joymvula@yahoo.com"
  }
];
const utilityTypes = [{
    utility_type: refs.UTILITY_TYPES.ENERGY_PROVIDER,
    description: "This is energy source"
  },
  {
    utility_type: refs.UTILITY_TYPES.WATER_PROVIDER,
    description: "This is water source"
  },

  {
    utility_type: refs.UTILITY_TYPES.WASTE_DISPOSAL,
    description: "This is a disposal service"
  },
  {
    utility_type: refs.UTILITY_TYPES.NETWORK_PROVIDER,
    description: "This is a network provider utility"
  }
];

module.exports.utilityTypes = utilityTypes;

const resourceTypes = [{
    resource_type: refs.RESOURCE_TYPES.TRANSPORT,
    description: "This is a resource type has many sub elements"
  },

  {
    resource_type: refs.RESOURCE_TYPES.BEDS,
    description: "These are places on which patients rest"
  },

  {
    resource_type: refs.RESOURCE_TYPES.GENERATORS,
    description: "These are power sources"
  },

  {
    resource_type: refs.RESOURCE_TYPES.COMPUTERS,
    description: "These are data capturing tools on a facility"
  },
  {
    resource_type: refs.RESOURCE_TYPES.HOUSING,
    description: "These are houses for the facility"
  }
];

module.exports.resourceTypes = resourceTypes;

const serviceTypes = [{
    service_type: refs.SERVICE_TYPES.CLINICAL,
    description: "These are clinical services"
  },
  {
    service_type: refs.SERVICE_TYPES.THERAPEUTICS,
    description: "These are therapeutics services"
  },
  {
    service_type: refs.SERVICE_TYPES.PROSTHETICS_AND_MEDICAL_DEVICES,
    description: "These are Prosthetics and Medical Devices services"
  },
  {
    service_type: refs.SERVICE_TYPES.NUTRUTION,
    description: "These are nutrition services"
  },
  {
    service_type: refs.SERVICE_TYPES.COMMUNITY_HEALTH,
    description: "These are community health services"
  },
  {
    service_type: refs.SERVICE_TYPES.REPRODUCTIVE_AND_CHILD_HEALTH,
    description: "These are reproductive and child health services"
  },
  {
    service_type: refs.SERVICE_TYPES.VACCINATION,
    description: "These are vaccination services"
  },
  {
    service_type: refs.SERVICE_TYPES.DIAGNOSTICS,
    description: "These are diagnostic services"
  }
];

module.exports.serviceTypes = serviceTypes;

module.exports.roles = [{
  name: "admin"
}];

// Date for dependent models

const districtZoneMapping = {
  [refs.ZONES.NORTH]: [{
      district_name: "Nkhata Bay"
    },
    {
      district_name: "Chitipa"
    },
    {
      district_name: "Karonga"
    },
    {
      district_name: "Mzuzu Central"
    },
    {
      district_name: "Rumphi"
    },
    {
      district_name: "Neno"
    },
    {
      district_name: "Mzimba"
    },
    {
      district_name: "Likoma"
    }
  ],

  [refs.ZONES.CENTRAL_EAST]: [{
      district_name: "Dowa"
    },
    {
      district_name: "Kasungu"
    },
    {
      district_name: "Nkhotakota"
    },
    {
      district_name: "Ntchisi"
    },
    {
      district_name: "Salima"
    }
  ],

  [refs.ZONES.CENTRAL_WEST]: [{
      district_name: "Kamuzu Central"
    },
    {
      district_name: "Dedza"
    },
    {
      district_name: "Lilongwe"
    },
    {
      district_name: "Mchinji"
    },
    {
      district_name: "Ntcheu"
    }
  ],

  [refs.ZONES.SOUTH_EAST]: [{
      district_name: "Balaka"
    },
    {
      district_name: "Machinga"
    },
    {
      district_name: "Mangochi"
    },
    {
      district_name: "Mulanje"
    },
    {
      district_name: "Phalombe"
    }
  ],

  [refs.ZONES.SOUTH_WEST]: [{
      district_name: "Blantyre"
    },
    {
      district_name: "Queens Elizabeth"
    },
    {
      district_name: "Chiradzulu"
    },
    {
      district_name: "Chikwawa"
    },
    {
      district_name: "Mwanza"
    },
    {
      district_name: "Neno"
    },
    {
      district_name: "Nsanje"
    },
    {
      district_name: "Thyolo"
    }
  ]
};

module.exports.districts = {
  foreignKey: "zone_id",
  referenceName: "zone_name",
  schema: zoneData.map(zone => {
    return {
      reference: zone.zone_name,
      data: districtZoneMapping[zone.zone_name]
    };
  })
};

const resourceResourceTypeMapping = {
  [refs.RESOURCE_TYPES.TRANSPORT]: [{
      resource_name: "Motor Vehicle Ambulances",
      description: "This facility has one ambulance that is operational"
    },
    {
      resource_name: "Vehicles/Cars",
      description: "This facility has no Vehicles or cars"
    },
    {
      resource_name: "Motor cycles",
      description: "This facility has four motor cycles"
    },
    {
      resource_name: "Motor Bike Ambulances",
      description: "This facility has no motor bike ambulances"
    },
    {
      resource_name: "Bicycles",
      description: "This facility has 10 bicycles"
    },
    {
      resource_name: "Other",
      description: "This facility has no Vehicles or cars"
    }
  ],
  [refs.RESOURCE_TYPES.BEDS]: [{
      resource_name: "Maternity beds",
      description: "This facility needs more maternity beds"
    },
    {
      resource_name: "Delivery beds",
      description: "This facility needs more delivery beds"
    },
    {
      resource_name: "Other inpatient beds",
      description: "This facility needs more inpatient beds"
    }
  ],
  [refs.RESOURCE_TYPES.GENERATORS]: [{
      resource_name: "20 watts generators",
      description: "These are small generators"
    },
    {
      resource_name: "30 watts generators",
      description: "These are good generators"
    },
    {
      resource_name: "40 watts generator",
      description: "These are better generators"
    },
    {
      resource_name: "50 watts generator",
      description: "These are biggest generators"
    }
  ],
  [refs.RESOURCE_TYPES.COMPUTERS]: [{
      resource_name: "Laptop",
      description: "These are portable computers"
    },
    {
      resource_name: "Desktop",
      description: "These are fixed computers"
    }
  ],
  [refs.RESOURCE_TYPES.HOUSING]: [{
    resource_name: "Staff houses",
    description: "These are occupied houses"
  }]
};

module.exports.resources = {
  foreignKey: "resource_type_id",
  referenceName: "resource_type",
  schema: resourceTypes.map(resourceType => {
    return {
      reference: resourceType.resource_type,
      data: resourceResourceTypeMapping[resourceType.resource_type]
    };
  })
};

const utilityUtilityTypeMapping = {
  [refs.UTILITY_TYPES.ENERGY_PROVIDER]: [{
      utility_name: "National Grid",
      description: "This is national grid"
    },
    {
      utility_name: "Generator",
      description: "This is generator"
    },
    {
      utility_name: "Solar panels",
      description: "These are solar panels"
    },
    {
      utility_name: "No electricity",
      description: "There is no electricity yet"
    },
    {
      utility_name: "Wired for electricity",
      description: "This is wired electricity"
    },
    {
      utility_name: "Connected to ESCOM Grid",
      description: "This is connected to ESCOM grid"
    },
    {
      utility_name: "Near ESCOM Grid",
      description: "This is near ESCOM grid"
    }
  ],
  [refs.UTILITY_TYPES.WATER_PROVIDER]: [{
      utility_name: "Piped into health facility",
      description: "This is piped water into health facility"
    },
    {
      utility_name: "Piped into facility ground",
      description: "This is piped water into facility ground"
    },
    {
      utility_name: "Public tap/stand pipe",
      description: "This is public/stand"
    },
    {
      utility_name: "Tube well/borehole",
      description: "This is tube"
    },
    {
      utility_name: "Tanker truck",
      description: "This is tanker"
    },
    {
      utility_name: "Rainwater harvesting",
      description: "This is rainwater"
    },
    {
      utility_name: "Protected dug well",
      description: "This is Protected dug well"
    },
    {
      utility_name: "Unprotected dug well",
      description: "This is unprotected dug well"
    },
    {
      utility_name: "protected spring",
      description: "This is protected spring"
    },
    {
      utility_name: "unprotected spring",
      description: "This is unprotected spring"
    },
    {
      utility_name: "surface water(Dam/Lake/River/Pond",
      description: "This is surface water"
    },
    {
      utility_name: "Other",
      description: "This is other source"
    }
  ],
  [refs.UTILITY_TYPES.WASTE_DISPOSAL]: [{
      utility_name: "Incinerator",
      description: "This is Incinerator"
    },
    {
      utility_name: "Placenta pit",
      description: "This is placenta"
    },
    {
      utility_name: "Rubbish pit",
      description: "This is Rubbish pit"
    },
    {
      utility_name: "Toilet/pit latrine",
      description: "This is Toilet/pit latrine"
    }
  ],
  [refs.UTILITY_TYPES.NETWORK_PROVIDER]: [{
      utility_name: "Airtel",
      description: "This is provided by airtel"
    },
    {
      utility_name: "TNM",
      description: "This is provided by TNM"
    },
    {
      utility_name: "Access",
      description: "This is provided by access"
    },
    {
      utility_name: "MTL",
      description: "This is provided by mtl"
    },
    {
      utility_name: "Other",
      description: "This is provided by other"
    },
    {
      utility_name: "GWAN",
      description: "This is provided by GWAN"
    },
    {
      utility_name: "Skyband",
      description: "This is provided by skyband"
    },
    {
      utility_name: "Globe",
      description: "This is provided by globe"
    }
  ]
};

module.exports.utilities = {
  foreignKey: "utility_type_id",
  referenceName: "ulitity_type",
  schema: utilityTypes.map(utilityType => {
    return {
      reference: utilityType.utility_type,
      data: utilityUtilityTypeMapping[utilityType.utility_type]
    };
  })
};

const serviceServiceTypeMapping = {
    [refs.SERVICE_TYPES.CLINICAL]: [{
            service_name: "Out patient services (OPD)",
            service_description: "This is out patient Service",
            service_category_id: 0
        },
        {
            service_name: "In patient services (IPD)",
            service_description: "This is in patient Service",
            service_category_id: 0
        },
        {
            service_name: "MCI-Integrated Mangement of child illiness",
            service_description: "This is a child Service",
            service_category_id: 0
        },
        {
            service_name: "Malaria Diagnosis and Treatment",
            service_description: "This is malaria service",
            service_category_id: 0
        }
    ],
    [refs.SERVICE_TYPES.THERAPEUTICS]: [{
            service_name: "Pharmacy",
            service_description: "This is pharmacy service",
            service_category_id: 0
        },
        {
            service_name: "Dispensing room",
            service_description: "This is dispensing service",
            service_category_id: 0
        }
    ],
    [refs.SERVICE_TYPES.PROSTHETICS_AND_MEDICAL_DEVICES]: [{
            service_name: "Prosthetics",
            service_description: "This is Prosthetics service",
            service_category_id: 0
        },
        {
            service_name: "Medical devices",
            service_description: "This is medical devices service",
            service_category_id: 0
        }
    ],
    [refs.SERVICE_TYPES.NUTRUTION]: [{
            service_name: "Vitamin A supplementation in pregnat women",
            service_description: "This is Vitamin A supplementation in pregnat women service",
            service_category_id: 0
        },
        {
            service_name: "Management of severe malnutrition (children)",
            service_description: "This is Management of severe malnutrition (children) service",
            service_category_id: 0
        },
        {
            service_name: "Deworming",
            service_description: "This is deworming service",
            service_category_id: 0
        },
        {
            service_name: "Vitamin A supplementation in infants and children 6-59 months",
            service_description: "This is Vitamin A supplementation in infants and children 6-59 months service",
            service_category_id: 0
        }
    ],
    [refs.SERVICE_TYPES.COMMUNITY_HEALTH]: [{
            service_name: "Health education",
            service_description: "This is health education service",
            service_category_id: 0
        },
        {
            service_name: "Growth monitoring",
            service_description: "This is  growth monitoring service",
            service_category_id: 0
        }
    ],
    [refs.SERVICE_TYPES.REPRODUCTIVE_AND_CHILD_HEALTH]: [{
            service_name: "Family planning",
            service_description: "This is family planning service",
            service_category_id: 0,
            children: [
                {
                    service_name: 'dude',
                    service_description: 'nnnnfnfn',
                }
            ]
        },
        {
            service_name: "Ante-natal Services",
            service_description: "This is  ante-natal service",
            service_category_id: 0
        },
        {
            service_name: "Delivery Services",
            service_description: "This is  delivery service",
            service_category_id: 0
        }
    ],
    [refs.SERVICE_TYPES.VACCINATION]: [{
            service_name: "Rotavirus",
            service_description: "This is rotavirus service",
            service_category_id: 0
        },
        {
            service_name: "Measles Rubella",
            service_description: "This is  measles rubella service",
            service_category_id: 0
        }
    ],
    [refs.SERVICE_TYPES.DIAGNOSTICS]: [{
            service_name: "Laboratory",
            service_description: "This is laboratory service",
            service_category_id: 0
        },
        {
            service_name: "Radiology",
            service_description: "This is  radiology service",
            service_category_id: 0
        }
    ]
};

module.exports.services = {
  foreignKey: "service_type_id",
  referenceName: "service_type",
  schema: serviceTypes.map(serviceType => {
    return {
      reference: serviceType.service_type,
      data: serviceServiceTypeMapping[serviceType.service_type]
    };
  })
};
