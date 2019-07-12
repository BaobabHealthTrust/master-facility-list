'use strict';

const refs = require('./refs');

module.exports.owners = [
  {
    facility_owner: refs.OWNERS.PRIVATE,
    description: 'These are private hospital',
  },
  {
    facility_owner: 'Government',
    description: 'These are government health facilities',
  },
  {
    facility_owner: 'Parastatal',
    description: 'These are governmental institutional facilities',
  },
  {
    facility_owner: 'Christian Health Association of Malawi (CHAM)',
    description: 'These are organisational hospitals',
  },
  {
    facility_owner: 'Non-Government',
    description: 'These are NGO owned facilities',
  },
  {
    facility_owner: 'Mission/Faith-based (other than CHAM)',
    description: 'Mission/Faith-based (other than CHAM)',
  },
  {
    facility_owner: 'Other',
    description: 'These are Other owned facilities',
  },
  {
    facility_owner: 'Aquaid Lifeline',
    description: 'These are Aquaid Lifeline owned facilities',
  },
];
module.exports.feedbackTypes = [
  {
    feedback_type: 'General feedback',
    description: 'General feedback',
  },
  {
    feedback_type: 'Feature request feedback',
    description: 'Feature request feedback',
  },
];

module.exports.facility = {
  facility_code: 'NB01042',
  facility_name: 'Nkhata-Bay Clinic',
  common_name: 'Jonilenge',
  facility_date_opened: '2017-10-25T13:27:53.703Z',
  facility_type_id: 1,
  facility_owner_id: 1,
  facility_operational_status_id: 1,
  facility_regulatory_status_id: 1,
  district_id: 1,
  client_id: 1,
};

module.exports.contactPeople = {
  contact_person_fullname: 'John Banda',
  contact_person_phone: '+265 999 21 30 85',
  facility_id: 1,
};

module.exports.facilityTypes = [
  {
    facility_type: 'District hospital',
    description: 'These facilities belongs to districts',
  },
  {
    facility_type: 'Central Hospital',
    description: 'These are governmental largest owned hospitals',
  },
  {
    facility_type: 'Rural Hospital',
    description: 'These facilities belongs to a rural area',
  },
  {
    facility_type: 'Community Hospital',
    description: 'These facilities belongs to a community',
  },
  {
    facility_type: 'Hospital',
    description: 'These facilities are second to district hospitals',
  },
  {
    facility_type: 'Health Centre',
    description: 'These are health centers facilities',
  },
  {
    facility_type: 'Health Post',
    description: 'These are Health Post facilities',
  },
  {
    facility_type: 'Dispensary',
    description: 'These are middle class health facilities',
  },
  {
    facility_type: 'Clinic',
    description: 'These are clinic facilities',
  },
  {
    facility_type: 'Pharmacy',
    description: 'These are pharmacies',
  },
  {
    facility_type: 'Maternity Facility',
    description: 'These are maternity facilities',
  },
  {
    // TODO: should be put under ownership.
    facility_type: 'Private',
    description: 'These are private health facilities',
  },
  {
    facility_type: 'Unclassified',
    description: 'These are Unclassified health facilities',
  },
];

module.exports.regulatoryStatuses = [
  {
    facility_regulatory_status: 'Registered',
    description: 'This is a registered facility',
  },
  {
    facility_regulatory_status: 'Registered (Pending Certification)',
    description: 'This is a registered but waiting for a certificate',
  },
  {
    facility_regulatory_status: 'Registration suspended',
    description: 'This facility is currently suspended',
  },
  {
    facility_regulatory_status: 'Registration cancelled',
    description: 'The registration of this facility is cancelled',
  },
  {
    facility_regulatory_status: 'Not Registered',
    description: 'This is not a registered facility',
  },
];

module.exports.operationalStatuses = [
  {
    facility_operational_status: 'Functional',
    description: 'This facility is now operational',
  },
  {
    facility_operational_status: 'Pending Operation (Under construction)',
    description: 'This facility is still being constructed',
  },
  {
    facility_operational_status: 'Pending Operation (Construction Complete)',
    description: 'This facility is about to be opened',
  },
  {
    facility_operational_status: 'Closed (Temporary)',
    description: 'This facility is temporarily closed',
  },
  {
    facility_operational_status: 'Closed',
    description: 'This facility is now closed',
  },
  {
    facility_operational_status: 'Non-functional',
    description: 'This facility is Non-functional',
  },
];

const zoneData = [
  {
    zone_name: refs.ZONES.CENTRAL_EAST,
  },
  {
    zone_name: refs.ZONES.CENTRAL_WEST,
  },
  {
    zone_name: refs.ZONES.NORTH,
  },
  {
    zone_name: refs.ZONES.SOUTH_EAST,
  },
  {
    zone_name: refs.ZONES.SOUTH_WEST,
  },
];

module.exports.zoneData = zoneData;

module.exports.users = {
  username: 'mfladminuser',
  password: 'admin',
  firstname: 'CMED',
  lastname: 'Malawi',
  email: 'administrator@gmail.com',
};

const utilityTypes = [
  {
    utility_type: refs.UTILITY_TYPES.ENERGY_PROVIDER,
    description: 'This is energy source',
  },
  {
    utility_type: refs.UTILITY_TYPES.WATER_PROVIDER,
    description: 'This is water source',
  },

  {
    utility_type: refs.UTILITY_TYPES.WASTE_DISPOSAL,
    description: 'This is a disposal service',
  },
  {
    utility_type: refs.UTILITY_TYPES.NETWORK_PROVIDER,
    description: 'This is a network provider utility',
  },
];

module.exports.utilityTypes = utilityTypes;

const resourceTypes = [
  {
    resource_type: refs.RESOURCE_TYPES.TRANSPORT,
    description: 'This is a resource type has many sub elements',
  },

  {
    resource_type: refs.RESOURCE_TYPES.BEDS,
    description: 'These are places on which patients rest',
  },

  {
    resource_type: refs.RESOURCE_TYPES.GENERATORS,
    description: 'These are power sources',
  },

  {
    resource_type: refs.RESOURCE_TYPES.COMPUTERS,
    description: 'These are data capturing tools on a facility',
  },
  {
    resource_type: refs.RESOURCE_TYPES.HOUSING,
    description: 'These are houses for the facility',
  },
];

module.exports.resourceTypes = resourceTypes;

const serviceTypes = [
  {
    service_type: refs.SERVICE_TYPES.CLINICAL,
    description: 'These are clinical services',
  },
  {
    service_type: refs.SERVICE_TYPES.THERAPEUTICS,
    description: 'These are therapeutics services',
  },
  {
    service_type: refs.SERVICE_TYPES.PROSTHETICS_AND_MEDICAL_DEVICES,
    description: 'These are Prosthetics and Medical Devices services',
  },
  {
    service_type: refs.SERVICE_TYPES.NUTRUTION,
    description: 'These are nutrition services',
  },
  {
    service_type: refs.SERVICE_TYPES.COMMUNITY_HEALTH,
    description: 'These are community health services',
  },
  {
    service_type: refs.SERVICE_TYPES.REPRODUCTIVE_AND_CHILD_HEALTH,
    description: 'These are reproductive and child health services',
  },
  {
    service_type: refs.SERVICE_TYPES.VACCINATION,
    description: 'These are vaccination services',
  },
  {
    service_type: refs.SERVICE_TYPES.DIAGNOSTICS,
    description: 'These are diagnostic services',
  },
];

module.exports.serviceTypes = serviceTypes;

module.exports.roles = [
  {
    name: 'admin',
  },
];

// Date for dependent models

const districtZoneMapping = {
  [refs.ZONES.NORTH]: [
    {
      district_name: 'Nkhata Bay',
      district_code: 'KB',
    },
    {
      district_name: 'Chitipa',
      district_code: 'CP',
    },
    {
      district_name: 'Karonga',
      district_code: 'KA',
    },
    {
      district_name: 'Mzuzu Central',
      district_code: 'MU',
    },
    {
      district_name: 'Rumphi',
      district_code: 'RU',
    },
    {
      district_name: 'Mzimba',
      district_code: 'MZ',
    },
    {
      district_name: 'Likoma',
      district_code: 'LK',
    },
  ],

  [refs.ZONES.CENTRAL_EAST]: [
    {
      district_name: 'Dowa',
      district_code: 'DA',
    },
    {
      district_name: 'Kasungu',
      district_code: 'KU',
    },
    {
      district_name: 'Nkhotakota',
      district_code: 'NK',
    },
    {
      district_name: 'Ntchisi',
      district_code: 'NT',
    },
    {
      district_name: 'Salima',
      district_code: 'SA',
    },
  ],

  [refs.ZONES.CENTRAL_WEST]: [
    {
      district_name: 'Kamuzu Central',
      district_code: 'KC',
    },
    {
      district_name: 'Dedza',
      district_code: 'DE',
    },
    {
      district_name: 'Lilongwe',
      district_code: 'LL',
    },
    {
      district_name: 'Mchinji',
      district_code: 'MC',
    },
    {
      district_name: 'Ntcheu',
      district_code: 'NT',
    },
  ],

  [refs.ZONES.SOUTH_EAST]: [
    {
      district_name: 'Balaka',
      district_code: 'BK',
    },
    {
      district_name: 'Machinga',
      district_code: 'MC',
    },
    {
      district_name: 'Mangochi',
      district_code: 'MG',
    },
    {
      district_name: 'Mulanje',
      district_code: 'MU',
    },
    {
      district_name: 'Phalombe',
      district_code: 'PH',
    },
    {
      district_name: 'Zomba',
      district_code: 'ZA',
    },
  ],

  [refs.ZONES.SOUTH_WEST]: [
    {
      district_name: 'Blantyre',
      district_code: 'BT',
    },
    {
      district_name: 'Queens Elizabeth',
      district_code: 'QE',
    },
    {
      district_name: 'Chiradzulu',
      district_code: 'CR',
    },
    {
      district_name: 'Chikwawa',
      district_code: 'CK',
    },
    {
      district_name: 'Mwanza',
      district_code: 'MW',
    },
    {
      district_name: 'Neno',
      district_code: 'NE',
    },
    {
      district_name: 'Nsanje',
      district_code: 'NS',
    },
    {
      district_name: 'Thyolo',
      district_code: 'TH',
    },
  ],
};

module.exports.districtZoneMapping = districtZoneMapping;

module.exports.districts = {
  foreignKey: 'zone_id',
  referenceName: 'zone_name',
  schema: zoneData.map((zone) => {
    return {
      reference: zone.zone_name,
      data: districtZoneMapping[zone.zone_name],
    };
  }),
};

const resourceResourceTypeMapping = {
  [refs.RESOURCE_TYPES.TRANSPORT]: [
    {
      resource_name: 'Motor Vehicle Ambulances',
      description: 'This facility has one ambulance that is operational',
    },
    {
      resource_name: 'Vehicles/Cars',
      description: 'This facility has no Vehicles or cars',
    },
    {
      resource_name: 'Motor cycles',
      description: 'This facility has four motor cycles',
    },
    {
      resource_name: 'Motor Bike Ambulances',
      description: 'This facility has no motor bike ambulances',
    },
    {
      resource_name: 'Bicycles',
      description: 'This facility has 10 bicycles',
    },
    {
      resource_name: 'Other',
      description: 'This facility has no Vehicles or cars',
    },
  ],
  [refs.RESOURCE_TYPES.BEDS]: [
    {
      resource_name: 'Maternity beds',
      description: 'This facility needs more maternity beds',
    },
    {
      resource_name: 'Delivery beds',
      description: 'This facility needs more delivery beds',
    },
    {
      resource_name: 'Total overningt beds',
      description: 'This facility needs more delivery beds',
    },
    {
      resource_name: 'Other inpatient beds',
      description: 'This facility needs more inpatient beds',
    },
  ],
  [refs.RESOURCE_TYPES.GENERATORS]: [
    {
      resource_name: '20 watts generators',
      description: 'These are small generators',
    },
    {
      resource_name: '30 watts generators',
      description: 'These are good generators',
    },
    {
      resource_name: '40 watts generator',
      description: 'These are better generators',
    },
    {
      resource_name: '50 watts generator',
      description: 'These are biggest generators',
    },
  ],
  [refs.RESOURCE_TYPES.COMPUTERS]: [
    {
      resource_name: 'Laptop',
      description: 'These are portable computers',
    },
    {
      resource_name: 'Desktop',
      description: 'These are fixed computers',
    },
  ],
  [refs.RESOURCE_TYPES.HOUSING]: [
    {
      resource_name: 'Staff houses',
      description: 'These are occupied houses',
    },
  ],
};

module.exports.resources = {
  foreignKey: 'resource_type_id',
  referenceName: 'resource_type',
  schema: resourceTypes.map((resourceType) => {
    return {
      reference: resourceType.resource_type,
      data: resourceResourceTypeMapping[resourceType.resource_type],
    };
  }),
};

const utilityUtilityTypeMapping = {
  [refs.UTILITY_TYPES.ENERGY_PROVIDER]: [
    {
      utility_name: 'National Grid',
      description: 'This is national grid',
    },
    {
      utility_name: 'Generator',
      description: 'This is generator',
    },
    {
      utility_name: 'Solar panels',
      description: 'These are solar panels',
    },
    {
      utility_name: 'No electricity',
      description: 'There is no electricity yet',
    },
    {
      utility_name: 'Wired for electricity',
      description: 'This is wired electricity',
    },
    {
      utility_name: 'Connected to ESCOM Grid',
      description: 'This is connected to ESCOM grid',
    },
    {
      utility_name: 'Near ESCOM Grid',
      description: 'This is near ESCOM grid',
    },
  ],
  [refs.UTILITY_TYPES.WATER_PROVIDER]: [
    {
      utility_name: 'Piped into health facility',
      description: 'This is piped water into health facility',
    },
    {
      utility_name: 'Piped into facility ground',
      description: 'This is piped water into facility ground',
    },
    {
      utility_name: 'Public tap/stand pipe',
      description: 'This is public/stand',
    },
    {
      utility_name: 'Tube well/borehole',
      description: 'This is tube',
    },
    {
      utility_name: 'Tanker truck',
      description: 'This is tanker',
    },
    {
      utility_name: 'Rainwater harvesting',
      description: 'This is rainwater',
    },
    {
      utility_name: 'Protected dug well',
      description: 'This is Protected dug well',
    },
    {
      utility_name: 'Unprotected dug well',
      description: 'This is unprotected dug well',
    },
    {
      utility_name: 'protected spring',
      description: 'This is protected spring',
    },
    {
      utility_name: 'unprotected spring',
      description: 'This is unprotected spring',
    },
    {
      utility_name: 'surface water(Dam/Lake/River/Pond',
      description: 'This is surface water',
    },
    {
      utility_name: 'Other',
      description: 'This is other source',
    },
  ],
  [refs.UTILITY_TYPES.WASTE_DISPOSAL]: [
    {
      utility_name: 'Incinerator',
      description: 'This is Incinerator',
    },
    {
      utility_name: 'Placenta pit',
      description: 'This is placenta',
    },
    {
      utility_name: 'Rubbish pit',
      description: 'This is Rubbish pit',
    },
    {
      utility_name: 'Toilet',
      description: 'This is Toilet',
    },
    {
      utility_name: 'Pit latrine',
      description: 'This is pit latrine',
    },
    {
      utility_name: 'Staff training in waste management last 2 years',
      description: 'This is Staff training',
    },
    {
      utility_name: 'Chamber industrial',
      description: 'This is Chamber industrial',
    },
    {
      utility_name: 'Chamber drum',
      description: 'This is Chamber drum',
    },
    {
      utility_name: 'Flat ground',
      description: 'This is Flat ground',
    },
    {
      utility_name: 'Protected ground',
      description: 'This is Protected ground',
    },
    {
      utility_name: 'Pit no protection',
      description: 'This is Pit no protection',
    },
    {
      utility_name: 'Protected ground or pit',
      description: 'This is Protected ground or pit',
    },
    {
      utility_name: 'Covered container',
      description: 'This is Covered container',
    },
    {
      utility_name: 'Other protected environment',
      description: 'This is Other protected environment',
    },
    {
      utility_name: 'Other',
      description: 'This is other',
    },
    {
      utility_name: 'Non sharp chamber industrial',
      description: 'Non sharp chamber industrial',
    },
    {
      utility_name: 'Non sharp chamber drum',
      description: 'Non sharp chamber drum',
    },
    {
      utility_name: 'Non sharp flat ground',
      description: 'Non sharp flat ground',
    },
    {
      utility_name: 'Non sharp pit protected ground',
      description: 'Non sharp pit protected ground',
    },
    {
      utility_name: 'Non sharp covered pit',
      description: 'Non sharp covered pit',
    },
    {
      utility_name: 'Non sharp open pit',
      description: 'Non sharp open pit',
    },
    {
      utility_name: 'Non sharp protected_ground',
      description: 'Non sharp protected_ground',
    },
    {
      utility_name: 'Non sharp covered container',
      description: 'Non sharp covered container',
    },
    {
      utility_name: 'Non sharp other protected environment',
      description: 'Non sharp other protected environment',
    },
    {
      utility_name: 'Non sharp other',
      description: 'Non sharp other',
    },
  ],
  [refs.UTILITY_TYPES.NETWORK_PROVIDER]: [
    {
      utility_name: 'Airtel',
      description: 'This is provided by airtel',
    },
    {
      utility_name: 'TNM',
      description: 'This is provided by TNM',
    },
    {
      utility_name: 'Access',
      description: 'This is provided by access',
    },
    {
      utility_name: 'MTL',
      description: 'This is provided by mtl',
    },
    {
      utility_name: 'Other',
      description: 'This is provided by other',
    },
    {
      utility_name: 'GWAN',
      description: 'This is provided by GWAN',
    },
    {
      utility_name: 'Skyband',
      description: 'This is provided by skyband',
    },
    {
      utility_name: 'Globe',
      description: 'This is provided by globe',
    },
  ],
};

module.exports.utilities = {
  foreignKey: 'utility_type_id',
  referenceName: 'ulitity_type',
  schema: utilityTypes.map((utilityType) => {
    return {
      reference: utilityType.utility_type,
      data: utilityUtilityTypeMapping[utilityType.utility_type],
    };
  }),
};

const serviceServiceTypeMapping = {
  [refs.SERVICE_TYPES.CLINICAL]: [
    {
      service_name: 'Out patient services (OPD)',
      service_description: 'This is out patient Service',
      service_category_id: 0,
    },
    {
      service_name: 'In patient services (IPD)',
      service_description: 'This is in patient Service',
      service_category_id: 0,
    },
    {
      service_name: 'MCI-Integrated Mangement of child illiness',
      service_description: 'This is a child Service',
      service_category_id: 0,
      children: [
        {
          service_name: 'ARI',
          service_description: 'This is ARI Service',
          children: [
            {
              service_name: 'Pneumonia treatment',
              service_description: 'This is Pneumonia treatment Service',
            },
            {
              service_name: 'Treatment of severe pneumonia(Oxygen)',
              service_description:
                'This is treatment of severe pneumonia (Oxygen)',
            },
          ],
        },
        {
          service_name: 'Diarrhoea diseases',
          service_description: 'This is diarrhoea Service',
          children: [
            {
              service_name: 'ORS',
              service_description: 'This is ORS Service',
            },
            {
              service_name: 'ZINC',
              service_description: 'This is ZINC Service',
            },
            {
              service_name: 'Treatment of severe diarrhoea (IV Fluids)',
              service_description: 'This is IV Fluids Service',
            },
          ],
        },
        {
          service_name:
            'Community management of nutrition under-5:Plumpy peanut',
          service_description: 'This is a nutrition under-5 peanut',
        },
        {
          service_name:
            'Community management of in under-5: Micronutrient provider',
          service_description: 'This is a nutrition under-5 micronutrient',
        },
        {
          service_name:
            'Community management of nutrition in under-5: Vitamin A',
          service_description: 'This is a nutrition under-5 vitamin A',
        },
      ],
    },
    {
      service_name: 'Malaria Diagnosis and Treatment',
      service_description: 'This is malaria service',
      service_category_id: 0,
      children: [
        {
          service_name: 'Slide Microscopy',
          service_description: 'This is a slice microscopy',
        },
        {
          service_name: 'Rapid Diagnostic Test (MRDT)',
          service_description: 'This is a rapid diagnostic test',
        },
        {
          service_name: 'RDTs for under-5',
          service_description: 'This is RDTs for under-5',
        },
        {
          service_name: 'First Line Uncomplicated Treatment',
          service_description: 'This is a first line uncomplicated treatment',
          children: [
            {
              service_name: 'Adult less than 36 kg',
              service_description: 'This is adult less than 36 kgs',
            },
            {
              service_name: 'Adult more than 36 kg',
              service_description: 'This is adult more than 36 kgs',
            },
            {
              service_name: 'Children less than 15 kg',
              service_description:
                'This is a service of children less than 15 kgs',
            },
            {
              service_name: 'Children more than 15 kg',
              service_description:
                'This is a service of children more than 15 kgs',
            },
          ],
        },
        {
          service_name: 'Treatment of Complicated Malaria',
          service_description: 'This is a treatment of Complicated malaria',
          children: [
            {
              service_name: 'Children, Injectable Artesunate',
              service_description: 'This is artesunate service for children',
            },
            {
              service_name: 'Adult, Injectable Artesunate',
              service_description: 'This is artesunate service for adult',
            },
          ],
        },
      ],
    },
    {
      service_name: 'HIV and AIDS Treatment',
      service_description: 'This is HIV and AIDS Treatment service',
      service_category_id: 0,
      children: [
        {
          service_name: 'ART services',
          service_description: 'This is ART services service',
        },
        {
          service_name: 'ART providers',
          service_description: 'This is ART providers service',
        },
        {
          service_name: 'ART Pescriptions',
          service_description: 'This is ART Pescriptions service',
        },
        {
          service_name: 'ART follow up',
          service_description: 'This is a ART follow up service',
        },
        {
          service_name: 'National ART guidelines',
          service_description: 'This is National ART guidelines service',
        },
        {
          service_name: 'Staff trained in ART in last 2 years',
          service_description:
            'This is Staff trained in ART in last 2 years service',
        },
        {
          service_name: 'Treatment for Opportunistic infections',
          service_description:
            'This is treatment for Opportunistic infections service',
        },
        {
          service_name: 'Palliative care Services',
          service_description: 'This is Palliative care Services service',
        },
        {
          service_name: 'IV Treatment',
          service_description: 'This is IV Treatment service',
        },
        {
          service_name: 'Cancer Treatment',
          service_description: 'This is Cancer Treatment service',
        },
        {
          service_name: 'Nutrition services',
          service_description: 'This is Nutrition services service',
        },
        {
          service_name: 'Fortified Protein supplimentation',
          service_description:
            'This is  Fortified Protein supplimentation service',
        },
        {
          service_name: 'Paediatric-HIV servies',
          service_description: 'This is Paediatric-HIV servies service',
        },
        {
          service_name: 'TB Treatment',
          service_description: 'This is TB Treatment service',
        },
        {
          service_name: 'PrepP-Pre exposure prophylaxis',
          service_description: 'This is PrepP-Pre exposure prophylaxis service',
        },
        {
          service_name: 'Family planning for HIV clients',
          service_description:
            'This is Family planning for HIV clients service',
        },
        {
          service_name: 'Condoms',
          service_description: 'This is Condoms service',
        },
        {
          service_name: 'HIV and TB screening',
          service_description: 'This is HIV and TB screening service',
        },
        {
          service_name: 'HIV-AIDS national guidelines',
          service_description: 'This is HIV-AIDS national guidelines service',
        },
        {
          service_name: 'Palliative care guidelines',
          service_description: 'This is Palliative care guidelines service',
        },
        {
          service_name: 'Staff trained in HIV-AIDS clinical management',
          service_description:
            'This is Staff trained in HIV-AIDS clinical management service',
        },
      ],
    },
    {
      service_name: 'Sexully Transmitted infection',
      service_description: 'This is Sexully Transmitted infection service',
      service_category_id: 0,
      children: [
        {
          service_name: 'STI services',
          service_description: 'This is STI services',
        },
        {
          service_name: 'STI diagnosis and management',
          service_description: 'This is STI diagnosis and management',
        },
        {
          service_name: 'ST Treatment',
          service_description: 'This is ST Treatment',
        },
        {
          service_name: 'National STI guidelines',
          service_description: 'This is National STI guidelines',
        },
        {
          service_name: 'Staff trained in STI diagnosis and management',
          service_description:
            'This is Staff trained in STI diagnosis and management',
        },
        {
          service_name: 'Staff trained in STI last 2 years',
          service_description: 'This is a Staff trained in STI last 2 years',
        },
      ],
    },
    {
      service_name: 'TB Diagnosis/Testing',
      service_description: 'This is TB Diagnosis/Testing service',
      service_category_id: 0,
      children: [
        {
          service_name: 'TB Diagnosis using clinical symptomsservices',
          service_description:
            'This isTB Diagnosis using clinical symptoms service',
        },
        {
          service_name: 'Smear microscopy',
          service_description: 'This is Smear microscopy',
        },
        {
          service_name: 'Xpert',
          service_description: 'This is Xpert',
        },
        {
          service_name: 'X-Ray',
          service_description: 'This is X-Ray',
        },
        {
          service_name: 'Staff trained in TB Treatment',
          service_description: 'This is Staff trained in TB Treatment',
        },
        {
          service_name: 'Facility prescibes TB drugs',
          service_description: 'This is a Facility prescibes TB drugs',
        },
        {
          service_name: 'Facility provides TB drugs',
          service_description: 'This is facility provides TB drugs',
        },
        {
          service_name: 'TB Patient follow up',
          service_description: 'This is TB Patient follow up',
        },
        {
          service_name: 'TB Screening',
          service_description: 'This is TB Screening',
        },
        {
          service_name: 'TB Guideliness',
          service_description: 'This is TB Guideliness',
        },

        {
          service_name: 'National guidelines for TB- MDR',
          service_description: 'This is National guidelines for TB- MDR',
        },
        {
          service_name: 'MDR TB guidelines',
          service_description: 'This is MDR TB guidelines',
        },
        {
          service_name: 'TB infection control guidelines',
          service_description: 'This is TB infection control guidelines',
        },
        {
          service_name: 'Staff trained in TB Management',
          service_description: 'This is Staff trained in TB Management',
        },
        {
          service_name: 'Staff trained in HIV-TB coinfection',
          service_description: 'This is Staff trained in HIV-TB coinfection',
        },
        {
          service_name: 'Staff trained in MDR TB',
          service_description: 'This is Staff trained in MDR TB',
        },
        {
          service_name: 'Staff trained in TB Infection control',
          service_description: 'This is Staff trained in TB Infection control',
        },
      ],
    },
    {
      service_name: 'Non-Communicable Diseases',
      service_description: 'This is Non-Communicable Diseases service',
      service_category_id: 0,
      children: [
        {
          service_name: 'Cardivascular diseases management',
          service_description:
            'This is Cardivascular diseases management service',
        },
        {
          service_name: 'Chronic Respiratory diseases management',
          service_description:
            'This is Chronic Respiratory diseases management',
        },
        {
          service_name: 'Chronic Respiratory diseases',
          service_description: 'This is Chronic Respiratory diseases',
        },
        {
          service_name: 'Peak flow meters',
          service_description: 'This is Peak flow meters',
        },
        {
          service_name: 'Inhalers',
          service_description: 'This is Inhalers',
        },
        {
          service_name: 'Cervical cancer Diagnosis',
          service_description: 'This is a Cervical cancer Diagnosis',
        },
        {
          service_name: 'National guidelines for Cervical cancer',
          service_description:
            'This is National guidelines for Cervical cancer',
        },
        {
          service_name:
            'Staff trained in Cervical cancer prevention and control',
          service_description:
            'This is Staff trained in Cervical cancer prevention and control',
        },
        {
          service_name: 'Laparatomy provided',
          service_description: 'This is Laparatomy provided',
        },
        {
          service_name: 'Hernia Repair',
          service_description: 'This is Hernia Repair',
        },

        {
          service_name: 'Neonatal surgery',
          service_description: 'This is Neonatal surgery',
        },
        {
          service_name: 'Cleft Lip repair',
          service_description: 'This is Cleft Lip repair',
        },
        {
          service_name: 'Contacture release',
          service_description: 'This is Contacture release',
        },
        {
          service_name: 'Skin grafting',
          service_description: 'This is Skin grafting',
        },
        {
          service_name: 'Fracture',
          service_description: 'This is Fracture',
        },
        {
          service_name: 'Amputation',
          service_description: 'This is Amputation',
        },
        {
          service_name: 'Cataract Surgery',
          service_description: 'This is Cataract Surgery',
        },
        {
          service_name: 'Rescucitation for adults',
          service_description: 'This is Rescucitation for adults',
        },
        {
          service_name: 'Rescucitation for peadiatric patients',
          service_description: 'This is Rescucitation for peadiatric patients',
        },
        {
          service_name: 'Needle holders',
          service_description: 'This is Needle holders',
        },
        {
          service_name: 'Surgical Blades',
          service_description: 'This is Surgical Blades',
        },
        {
          service_name: 'Retractor',
          service_description: 'This is Retractor',
        },
        {
          service_name: 'Surgical Scissors',
          service_description: 'This is Surgical Scissors',
        },
        {
          service_name: 'Feeding tubes',
          service_description: 'This is Feeding tubes',
        },
        {
          service_name: 'Tourniquet',
          service_description: 'This is Tourniquet',
        },
        {
          service_name: 'Suction Pump and catheter',
          service_description: 'This is Suction Pump and catheter',
        },
        {
          service_name: 'Cardiovascular disease management guidelines',
          service_description:
            'This is cardiovascular disease management guidelines',
        },
        {
          service_name: 'Staff trained in cardiovascular diseases',
          service_description:
            'This is Staff trained in cardiovascular diseases',
        },
      ],
    },
    {
      service_name: ' Surgical services provided',
      service_description: 'This is  Surgical services provided service',
      service_category_id: 0,
      children: [
        {
          service_name: 'Running water',
          service_description: 'This is Running water',
        },
        {
          service_name: 'Hand waship soap',
          service_description: 'This is Hand waship soap',
        },
        {
          service_name: 'Hand sanitiser',
          service_description: 'This is Hand sanitiser',
        },
        {
          service_name: 'Disposable gloves',
          service_description: 'This is Disposable gloves',
        },
        {
          service_name: 'Bin',
          service_description: 'This is Bin',
        },
        {
          service_name: 'Sharp container',
          service_description: 'This is Sharp container',
        },
        {
          service_name: 'Disinfectant',
          service_description: 'This is Disinfectant',
        },
        {
          service_name: 'Disposable syringes',
          service_description: 'This is Disposable syringes',
        },
        {
          service_name: 'Auto disposable syringes',
          service_description: 'This is Auto disposable syringes',
        },

        {
          service_name: 'National guidelines for Surgical care',
          service_description: 'This is National guidelines for Surgical care',
        },
        {
          service_name: 'IMEESC trained staff',
          service_description: 'This is IMEESC trained staff',
        },
        {
          service_name: 'Staff trained in surgery',
          service_description: 'This is Staff trained in surgery',
        },
        {
          service_name: 'Staff trained in anaesthesia',
          service_description: 'This is Staff trained in anaesthesia',
        },
      ],
    },
    {
      service_name: ' Malaria facility offer diagnosis and malaria treatment',
      service_description:
        'This is  Malaria facility offer diagnosis and malaria treatment service',
      service_category_id: 0,
      children: [
        {
          service_name: 'Malaria diagnosis',
          service_description: 'This is Malaria diagnosis',
        },
        {
          service_name: 'Malaria diagnosis through symptoms',
          service_description: 'This is Malaria diagnosis through symptoms',
        },
        {
          service_name: 'Malaria rapid diagnostic test (MRDT)',
          service_description: 'This is Malaria rapid diagnostic test (MRDT)',
        },
        {
          service_name: 'Slide microscopy',
          service_description: 'This is Slide microscopy',
        },
      ],
    },
    {
      service_name: ' Blood Transfusion',
      service_description: 'This is  Blood Transfusion service',
      service_category_id: 0,
      children: [
        {
          service_name: 'Blood transfusion',
          service_description: 'This is Blood transfusion',
        },
        {
          service_name: 'Blood stock outs',
          service_description: 'This is Blood stock outs',
        },
        {
          service_name: 'Blood ordered from national/regional centre',
          service_description:
            'This is Blood ordered from national/regional centre',
        },
        {
          service_name: 'Blood obtained from other sources',
          service_description: 'This is Blood obtained from other sources',
        },
        {
          service_name: 'Blood screened for Syphillis',
          service_description: 'This is Blood screened for Syphillis',
        },
        {
          service_name: 'Blood screened for Hepatitis  B',
          service_description: 'This is Blood screened for Hepatitis  B',
        },
        {
          service_name: 'Blood screened for HIV',
          service_description: 'This is Blood screened for HIV',
        },
        {
          service_name: 'Blood screened for Hepatitis C',
          service_description: 'This is Blood screened for Hepatitis C',
        },
        {
          service_name: 'Refrigerator for storing blood',
          service_description: 'This is Refrigerator for storing blood',
        },
        {
          service_name: 'Blood screening',
          service_description: 'This is Blood screening',
        },
        {
          service_name: 'Guidleines for blood transfusion',
          service_description: 'This is Guidleines for blood transfusion',
        },
        {
          service_name: 'Staff trained in blood transfusion last 2 years',
          service_description:
            'This is Staff trained in blood transfusion last 2 years',
        },
      ],
    },
  ],
  [refs.SERVICE_TYPES.THERAPEUTICS]: [
    {
      service_name: 'Pharmacy',
      service_description: 'This is pharmacy service',
      service_category_id: 0,
    },
    {
      service_name: 'Dispensing room',
      service_description: 'This is dispensing service',
      service_category_id: 0,
    },
  ],
  [refs.SERVICE_TYPES.PROSTHETICS_AND_MEDICAL_DEVICES]: [
    {
      service_name: 'Prosthetics',
      service_description: 'This is Prosthetics service',
      service_category_id: 0,
    },
    {
      service_name: 'Medical devices',
      service_description: 'This is medical devices service',
      service_category_id: 0,
    },
  ],
  [refs.SERVICE_TYPES.NUTRUTION]: [
    {
      service_name: 'Vitamin A supplementation in pregnat women',
      service_description:
        'This is Vitamin A supplementation in pregnat women service',
      service_category_id: 0,
    },
    {
      service_name: 'Management of severe malnutrition (children)',
      service_description:
        'This is Management of severe malnutrition (children) service',
      service_category_id: 0,
    },
    {
      service_name: 'Deworming',
      service_description: 'This is deworming service',
      service_category_id: 0,
    },
    {
      service_name:
        'Vitamin A supplementation in infants and children 6-59 months',
      service_description:
        'This is Vitamin A supplementation in infants and children 6-59 months service',
      service_category_id: 0,
    },
  ],
  [refs.SERVICE_TYPES.COMMUNITY_HEALTH]: [
    {
      service_name: 'Health education',
      service_description: 'This is health education service',
      service_category_id: 0,
    },
    {
      service_name: 'Growth monitoring',
      service_description: 'This is  growth monitoring service',
      service_category_id: 0,
    },
  ],
  [refs.SERVICE_TYPES.REPRODUCTIVE_AND_CHILD_HEALTH]: [
    {
      service_name: 'Family planning',
      service_description: 'This is family planning service',
      service_category_id: 0,
      children: [
        {
          service_name: 'Injectable',
          service_description: 'This is Injectable Service',
        },
        {
          service_name: 'Implant',
          service_description: 'This is Implant service',
        },
        {
          service_name: 'Pill',
          service_description: 'This is pill Service',
        },
        {
          service_name: 'Progesterone only injectable',
          service_description: 'This is Progesterone only injectable Service',
        },
        {
          service_name: 'Male condoms',
          service_description: 'This is Male condoms Service',
        },
        {
          service_name: 'Female condoms',
          service_description: 'This is Female condoms',
        },
        {
          service_name: 'Intrauterine Device (IUD)',
          service_description: 'This is Intrauterine Device (IUD) Service',
        },
        {
          service_name: 'Cycle Beads',
          service_description: 'This is Cycle Beads Service',
        },
        {
          service_name: 'Emergency Contraception',
          service_description: 'This is Emergency Contraception Service',
        },
        {
          service_name: 'Male Sterilisation',
          service_description: 'This is Male Sterilisation Service',
        },
        {
          service_name: 'Female Sterilisation',
          service_description: 'This is Female Sterilisation Service',
        },
        {
          service_name: 'Depoprovera',
          service_description: 'This is Depoprovera Service',
        },
        {
          service_name: 'Family planning services for un married persons',
          service_description:
            'This is  Family planning services for un married persons Service',
          children: [
            {
              service_name: 'Oral Contraceptives',
              service_description: 'This is Oral Contraceptives Service',
            },
            {
              service_name: 'Progesterone oral Contraceptive',
              service_description:
                'This is Progesterone oral Contraceptive Service',
            },
            {
              service_name: 'Injectable Contraceptive',
              service_description: 'This is Injectable Contraceptive Service',
            },
            {
              service_name: 'Injectable Contraceptive ',
              service_description: 'This is Injectable Contraceptive  Service',
            },
            {
              service_name: 'Male condoms',
              service_description: 'This is Male condoms Service',
            },
            {
              service_name: 'Female condoms',
              service_description: 'This is Female condoms Service',
            },
            {
              service_name: 'Intrauterine Device (IUCD)',
              service_description: 'This is Intrauterine Device (IUCD) Service',
            },
            {
              service_name: 'Implants',
              service_description: 'This is Implants Service',
            },
            {
              service_name: 'Cycle Beads',
              service_description: 'This is Cycle Beads Service',
            },
            {
              service_name: 'Emergency Contraceptives',
              service_description: 'This is Emergency Contraceptives Service',
            },
            {
              service_name: 'Male Sterilisation',
              service_description: 'This is Male Sterilisation Service',
            },
            {
              service_name: 'Male Sterilisation',
              service_description: 'This is OMale SterilisationService',
            },
            {
              service_name: 'Depoprovera',
              service_description: 'This is Depoprovera Service',
            },
            {
              service_name: 'Levonorgestrel',
              service_description: 'This is Levonorgestrel Service',
            },
            {
              service_name: 'Ulipristal Acetate',
              service_description: 'This is Ulipristal Acetate Service',
            },
          ],
        },
      ],
    },
    {
      service_name: 'Ante-natal Services',
      service_description: 'This is  ante-natal service',
      service_category_id: 0,
      children: [
        {
          service_name: 'Tetanus Toxoid',
          service_description: 'This is Tetanus Toxoid Service',
        },
        {
          service_name: 'ITN Distribution',
          service_description: 'This is ITN distribution service',
        },
        {
          service_name: 'Iron Supplimentation',
          service_description: 'This is Iron Supplimentation Service',
        },
        {
          service_name: 'Folic acid supplimentation',
          service_description: 'This is Folic acid supplimentation Service',
        },
        {
          service_name: 'Fansidar for malaria prevention (IPT)',
          service_description:
            'This is Fansidar for malaria prevention (IPT) Service',
        },
        {
          service_name: 'Management of High Blood Pressure in Pregnant women',
          service_description:
            'This is Management of High Blood Pressure in Pregnant women Service',
        },
        {
          service_name: 'Misoprostol',
          service_description: 'This is Misoprostol Service',
        },
        {
          service_name: 'ANC guidelines',
          service_description: 'This is ANC guidelines Service',
        },
        {
          service_name: 'ANC job aid',
          service_description: 'This is ANC job aid Service',
        },
        {
          service_name: 'IPT guidelines',
          service_description: 'This is IPT guidelines Service',
        },
        {
          service_name: 'Staff trained in ANC last 2 years',
          service_description:
            'This is Staff trained in ANC last 2 years Service',
        },
        {
          service_name: 'Staff trained in IPT last 2 years',
          service_description:
            'This is Staff trained in IPT last 2 years Service',
        },
      ],
    },
    {
      service_name: 'Prevention of Mother to Child Transmission of HIV (PMTCT)',
      service_description:
        'This is Prevention of Mother to Child Transmission of HIV (PMTCT)',
      service_category_id: 0,
      children: [
        {
          service_name: 'HIV Counselling for Pregnant women',
          service_description:
            'This is HIV Counselling for Pregnant women Service',
        },
        {
          service_name: 'HIV Testing',
          service_description: 'This is HIV Testing service',
        },
        {
          service_name: 'ARV Prophylaxis',
          service_description: 'This is ARV Prophylaxis service',
        },
        {
          service_name: 'ART for Pregnant women',
          service_description: 'This is ART for Pregnant women service',
        },
        {
          service_name: 'ARV prohpylaxis  for newborn',
          service_description: 'This is ARV prohpylaxis  for newborn service',
        },
        {
          service_name: 'Breastfeeding/feeding options Counselling',
          service_description:
            'This is Breastfeeding/feeding options Counselling service',
        },
        {
          service_name: 'Nutrition Counselling',
          service_description: 'This is Nutrition Counselling service',
        },
        {
          service_name:
            'Family planning  counselling to HIV positve pregnant women',
          service_description:
            'This is Family planning  counselling to HIV positve pregnant women service',
        },
        {
          service_name: 'PMTCT guideines',
          service_description: 'This is PMTCT guideines service',
        },
        {
          service_name: 'Staff trained in PMTCT last 2 years',
          service_description:
            'This is Staff trained in PMTCT last 2 years service',
        },
        {
          service_name:
            'Staff trained in infant and young child feeding last 2 years',
          service_description:
            'This is Staff trained in infant and young child feeding last 2 years service',
        },
        {
          service_name: 'Infant and young child feeding last 2 years',
          service_description:
            'This is Infant and young child feeding last 2 years service',
        },
        {
          service_name: 'PMTCT room',
          service_description: 'This is PMTCT room service',
        },
      ],
    },
    {
      service_name: 'Delivery Services',
      service_description: 'This is  delivery service',
      service_category_id: 0,
      children: [
        {
          service_name: 'Neonatal resuscitation (institutional)',
          service_description: 'This is neonatal resuscitation Service',
        },
        {
          service_name: 'Post-natal consultation',
          service_description: 'This is post-natal consultation service',
        },
        {
          service_name: 'Active management of third stage of labor',
          service_description:
            'This is Active management of third stage of labor service',
        },
        {
          service_name: 'Antibiotics',
          service_description: 'This is Antibiotics service',
        },
        {
          service_name: 'Parentel oxytocin',
          service_description: 'This is Parentel oxytocin service',
        },
        {
          service_name: 'Magnesium sulphate',
          service_description: 'This is Magnesium sulphate service',
        },
        {
          service_name: 'Assisted vaginal',
          service_description: 'This is Assisted vaginal service',
        },
        {
          service_name: 'Manual removal of placenta',
          service_description: 'This is Manual removal of placenta service',
        },
        {
          service_name: 'Removal of concetpion products',
          service_description: 'This is Removal of concetpion products service',
        },
        {
          service_name: 'Neonatal Rescucitation',
          service_description: 'This is Neonatal Rescucitation service',
        },
        {
          service_name: 'Caesarian section',
          service_description: 'This is Caesarian section service',
        },
        {
          service_name: 'Blood transfusion',
          service_description: 'This is Blood transfusion service',
        },
        {
          service_name: 'Successiful Deliveries',
          service_description: 'This is Successiful Deliveries service',
        },
        {
          service_name: 'Maternal Deaths',
          service_description: 'This is Maternal Deaths service',
        },
        {
          service_name: 'Obstetric Referrals',
          service_description: 'This is Obstetric Referrals service',
        },
        {
          service_name: 'Ceasarian section', // spelling
          service_description: 'This is Ceasarian section service',
        },
        {
          service_name: 'Emergencey Ceasarian Section',
          service_description: 'This is Emergencey Ceasarian Section service',
        },
        {
          service_name: 'Obstetric Guidelines',
          service_description: 'This is Obstetric Guidelines service',
        },
        {
          service_name: 'Obstetrics Job aid in maternal and neonatal care',
          service_description:
            'This is Obstetrics Job aid in maternal and neonatal care service',
        },
        {
          service_name: 'Obstetric Job aid',
          service_description: 'This is Obstetric Job aid service',
        },
        {
          service_name: 'New born rescucitation',
          service_description: 'This is New born rescucitation service',
        },
        {
          service_name: 'Neonatal sucntion bulb single use/multiuse',
          service_description:
            'This is Neonatal sucntion bulb single use/multiuse service',
        },
        {
          service_name: 'Sucntion bulb single use',
          service_description: 'This is Sucntion bulb single use service',
        },
        {
          service_name: 'Sunction bulb multiuse',
          service_description: 'This is Sunction bulb multiuse service',
        },
        {
          service_name: 'Obstetric care medicines',
          service_description: 'This is Obstetric care medicines service',
        },
        {
          service_name: 'Eye ointment',
          service_description: 'This is Eye ointment service',
        },
        {
          service_name: 'Gentamycin injectable 40mg',
          service_description: 'This is Gentamycin injectable 40mg service',
        },
        {
          service_name: 'Gentamycin injectable 20mg',
          service_description: 'This is Gentamycin injectable 20mg service',
        },
        {
          service_name: 'Gentamycin 10mg',
          service_description: 'This is Gentamycin 10mg service',
        },
        {
          service_name: 'Ampicilin',
          service_description: 'This is Ampicilin service',
        },
        {
          service_name: 'Hydralazine',
          service_description: 'This is Hydralazine service',
        },
        {
          service_name: 'Metronidazole',
          service_description: 'This is Metronidazole service',
        },
        {
          service_name: 'Azithromycin',
          service_description: 'This is Azithromycin service',
        },
        {
          service_name: 'Cefixime',
          service_description: 'This is Cefixime service',
        },
        {
          service_name: 'Benzathine/Benzylpenicin',
          service_description: 'This is Benzathine/Benzylpenicin service',
        },
        {
          service_name: 'Nifedipe',
          service_description: 'This is Nifedipe service',
        },
        {
          service_name: 'Methyldopa',
          service_description: 'This is Methyldopa service',
        },
        {
          service_name: 'Calcium gluconate',
          service_description: 'This is Calcium gluconate service',
        },
        {
          service_name: 'Magnesium Sulphate',
          service_description: 'This is Magnesium Sulphate service',
        },
        {
          service_name: 'Skin disinfectant',
          service_description: 'This is Skin disinfectant service',
        },
        {
          service_name: 'Chlorhexidine',
          service_description: 'This is Chlorhexidine service',
        },
        {
          service_name: 'IV Solutions',
          service_description: 'This is IV Solutions service',
        },
        {
          service_name: 'Sodium chloride injection solution',
          service_description:
            'This is Sodium chloride injection solution service',
        },
        {
          service_name: 'Betamethasone injectable',
          service_description: 'This is Betamethasone injectable service',
        },
        {
          service_name: 'Dexamethasone injectable',
          service_description: 'This is Dexamethasone injectable service',
        },
        {
          service_name: 'Oxytocin',
          service_description: 'This is Oxytocin service',
        },
        {
          service_name: 'Postnatal services',
          service_description: 'This is Postnatal services service',
        },
        {
          service_name: 'Guidleines for Management of Obstetric Complications',
          service_description: 'This is post-natal consultation service',
        },
        {
          service_name:
            'Staff trained in  management of complicated Obstetric Cases',
          service_description:
            'This is Staff trained in  management of complicated Obstetric Cases service',
        },
        {
          service_name: 'Staff trained in Caesarain section',
          service_description:
            'This is Staff trained in Caesarain section service',
        },
        {
          service_name: 'Anaesthetist',
          service_description: 'This is Anaesthetist service',
        },
      ],
    },
  ],
  [refs.SERVICE_TYPES.VACCINATION]: [
    {
      service_name: 'Rotavirus',
      service_description: 'This is rotavirus service',
      service_category_id: 0,
    },
    {
      service_name: 'Measles Rubella',
      service_description: 'This is  measles rubella service',
      service_category_id: 0,
    },
    {
      service_name: 'Child immunisation',
      service_description: 'This is Child immunisation service',
      service_category_id: 0,
    },
    {
      service_name: 'Vaccine storage',
      service_description: 'This is Vaccine storage service',
      service_category_id: 0,
    },
    {
      service_name: 'Refridgerator',
      service_description: 'This is Refridgerator service',
      service_category_id: 0,
    },
    {
      service_name: 'Refridgerator temperature monitoring',
      service_description:
        'This is Refridgerator temperature monitoring service',
      service_category_id: 0,
    },
    {
      service_name: 'Power source',
      service_description: 'This is Power source service',
      service_category_id: 0,
    },
    {
      service_name: 'Measles vaccine',
      service_description: 'This is Measles vaccine service',
      service_category_id: 0,
    },
    {
      service_name: 'DPT-Hib + Hep B/Pentavalet vaccine',
      service_description: 'This is DPT-Hib + Hep B/Pentavalet vaccine service',
      service_category_id: 0,
    },
    {
      service_name: 'Polio vaccine',
      service_description: 'This is Polio vaccine service',
      service_category_id: 0,
    },
    {
      service_name: 'BCG vaccine',
      service_description: 'This is BCG vaccine service',
      service_category_id: 0,
    },
    {
      service_name: 'Rotavirus Vaccine',
      service_description: 'This is Rotavirus Vaccine service',
      service_category_id: 0,
    },
    {
      service_name: 'Skilled vaccine  providers',
      service_description: 'This is Skilled vaccine  providers service',
      service_category_id: 0,
    },
    {
      service_name: 'Staff trained  in vaccine management',
      service_description:
        'This is Staff trained  in vaccine management service',
      service_category_id: 0,
    },
    {
      service_name: 'staff trained in monitoring',
      service_description: 'This is staff trained in monitoring service',
      service_category_id: 0,
    },
    {
      service_name: 'Staff trained in disease surveillance',
      service_description:
        'This is staff trained in disease surveillance service',
      service_category_id: 0,
    },
    {
      service_name: 'Staff trained in injection safety',
      service_description: 'This is staff trained in injection safety service',
      service_category_id: 0,
    },
    {
      service_name: 'Disposable syringes',
      service_description: 'This is Disposable syringes service',
      service_category_id: 0,
    },
    {
      service_name: 'Auto-disable syringes',
      service_description: 'This is auto-disable syringes service',
      service_category_id: 0,
    },
    {
      service_name: 'Polio vaccine diluent',
      service_description: 'This is polio vaccine diluent service',
      service_category_id: 0,
    },
    {
      service_name: 'BCG vaccine diluent',
      service_description: 'This is BCG vaccine diluent service',
      service_category_id: 0,
    },
    {
      service_name: 'Pneumococcol vaccine',
      service_description: 'This is pneumococcol vaccine service',
      service_category_id: 0,
    },
    {
      service_name: 'DPT Vaccine',
      service_description: 'This is DPT Vaccine service',
      service_category_id: 0,
    },
    {
      service_name: 'Measles vaccine',
      service_description: 'This is Measles vaccine service',
      service_category_id: 0,
    },
    {
      service_name: 'Measles vaccine stock out',
      service_description: 'This is Measles vaccine stock out service',
      service_category_id: 0,
    },
    {
      service_name: 'Pentavalet vaccine stock out',
      service_description: 'This is Pentavalet vaccine stock out service',
      service_category_id: 0,
    },
    {
      service_name: 'Polio vaccine stock out',
      service_description: 'This is polio vaccine stock out service',
      service_category_id: 0,
    },
    {
      service_name: 'BCG vaccine stock out',
      service_description: 'This is BCG vaccine stock out service',
      service_category_id: 0,
    },
    {
      service_name: 'Rota vaccine stock out',
      service_description: 'This is Rota vaccine stock out service',
      service_category_id: 0,
    },
    {
      service_name: 'Penuomoccocal vaccine stock out',
      service_description: 'This is Penuomoccocal vaccine stock out service',
      service_category_id: 0,
    },
    {
      service_name: 'Child care services',
      service_description: 'This is Child care services service',
      service_category_id: 0,
      children: [
        {
          service_name: 'Management of malnutrition',
          service_description: 'This is Management of malnutrition Service',
        },
        {
          service_name: 'Vitamin A supplimentation in infants and children',
          service_description:
            'This is Vitamin A supplimentation in infants and children Service',
        },
        {
          service_name: 'ORS provision',
          service_description: 'This is ORS provision Service',
        },
        {
          service_name: 'Zinc supplimentation',
          service_description: 'This is Zinc supplimentation Service',
        },
        {
          service_name: 'Growth monitoring',
          service_description: 'This is Growth monitoring Service',
        },
        {
          service_name: 'Pneumonia Treatment',
          service_description: 'This is Pneumonia Treatment Service',
        },
        {
          service_name: 'Amoxixillin Treatment',
          service_description: 'This is Amoxixillin Treatment Service',
        },
        {
          service_name: 'Malaria Treatment',
          service_description: 'This is Malaria Treatment Service',
        },
        {
          service_name: 'Iron Suppliment',
          service_description: 'This is Iron Suppliment Service',
        },
        {
          service_name: 'HTC for minor adolescents',
          service_description: 'This is HTC for minor adolescents Service',
        },
        {
          service_name: 'HTC room',
          service_description: 'This is HTC room Service',
        },
        {
          service_name: 'RDTS',
          service_description: 'This is RDTS Service',
        },
        {
          service_name: 'Condoms',
          service_description: 'This is Condoms Service',
        },
        {
          service_name: 'Running water',
          service_description: 'This is Running water Service',
        },
        {
          service_name: 'Hand washing soap',
          service_description: 'This is Hand washing soap Service',
        },
        {
          service_name: 'Hand sanitiser',
          service_description: 'This is Hand sanitiser Service',
        },
        {
          service_name: 'Disposable gloves',
          service_description: 'This is Disposable gloves Service',
        },
        {
          service_name: 'Bin',
          service_description: 'This is Bin Service',
        },
        {
          service_name: 'Shaprs Container',
          service_description: 'This is Shaprs Container Service',
        },
        {
          service_name: 'Disinfectant',
          service_description: 'This is Disinfectant Service',
        },
        {
          service_name: 'Disposable syringes',
          service_description: 'This is Disposable syringes Service',
        },
        {
          service_name: 'Auto disposable Syringes',
          service_description: 'This is Auto disposable Syringes Service',
        },
        {
          service_name: 'Staff trained in VCT',
          service_description: 'This is staff trained in VCT Service',
        },
        {
          service_name: 'Staff trained in HIV-AIDS prevention',
          service_description:
            'This is Staff trained in HIV-AIDS prevention Service',
        },
        {
          service_name: 'IMCI Guidelines',
          service_description: 'This is IMCI Guidelines Service',
        },
      ],
    },
  ],
  [refs.SERVICE_TYPES.DIAGNOSTICS]: [
    {
      service_name: 'Laboratory',
      service_description: 'This is laboratory service',
      service_category_id: 0,
      children: [
        {
          service_name: 'Parasitology',
          service_description: 'This is Parasitology Service',
        },
        {
          service_name: 'Clinical Chemistry',
          service_description: 'This is clinical chemistry service',
        },
      ],
    },
    {
      service_name: 'Radiology',
      service_description: 'This is  radiology service',
      service_category_id: 0,
      children: [
        {
          service_name: 'X-ray',
          service_description: 'This is X-ray Service',
        },
        {
          service_name: 'Ultrasound',
          service_description: 'This is ultrasound service',
        },
      ],
    },
    {
      service_name: 'Diagnostic testing',
      service_description: 'Diagnostic testing service',
      service_category_id: 0,
    },
    {
      service_name: 'Rapid Syphillis',
      service_description: 'Rapid Syphillis service',
      service_category_id: 0,
    },
    {
      service_name: 'Rapid HIV Testing',
      service_description: 'Rapid HIV Testing service',
      service_category_id: 0,
    },
    {
      service_name: 'Urine rapid test for pregnancy',
      service_description: 'Urine rapid test for pregnancy service',
      service_category_id: 0,
    },
    {
      service_name: 'Urine protein dip stick test',
      service_description: 'Urine protein dip stick test service',
      service_category_id: 0,
    },
    {
      service_name: 'Urine glucose test',
      service_description: 'Urine glucose test service',
      service_category_id: 0,
    },
    {
      service_name: 'Urine keton test',
      service_description: 'Urine keton test service',
      service_category_id: 0,
    },
    {
      service_name: 'DBS',
      service_description: 'DBS service',
      service_category_id: 0,
    },
    {
      service_name: 'Malaria rapid test',
      service_description: 'Malaria rapid test service',
      service_category_id: 0,
    },
    {
      service_name: 'MRDT available',
      service_description: 'MRDT available service',
      service_category_id: 0,
    },
    {
      service_name: 'Syphillis rpid test',
      service_description: 'Syphillis rpid test service',
      service_category_id: 0,
    },
    {
      service_name: 'Pregnancy test',
      service_description: 'Pregnancy test service',
      service_category_id: 0,
    },
    {
      service_name: 'Urine protein test',
      service_description: 'Urine protein test service',
      service_category_id: 0,
    },
    {
      service_name: 'Blood glucose test',
      service_description: 'Blood glucose test service',
      service_category_id: 0,
    },
    {
      service_name: 'Ketone test',
      service_description: 'Ketone test service',
      service_category_id: 0,
    },
    {
      service_name: 'DBS',
      service_description: 'DBS service',
      service_category_id: 0,
    },
    {
      service_name: 'RDTS stock out',
      service_description: 'RDTS stock out service',
      service_category_id: 0,
    },
    {
      service_name: 'Days with stock out',
      service_description: 'Days with stock out service',
      service_category_id: 0,
    },
    {
      service_name: 'Blood sugar test',
      service_description: 'Blood sugar test service',
      service_category_id: 0,
    },
    {
      service_name: 'Full blood count',
      service_description: 'Full blood count service',
      service_category_id: 0,
    },
    {
      service_name: 'Microscopy',
      service_description: 'Microscopy service',
      service_category_id: 0,
    },
    {
      service_name: 'HIV test',
      service_description: 'HIV test service',
      service_category_id: 0,
    },
    {
      service_name: 'Elisa-HIV antibody test',
      service_description: 'Elisa-HIV antibody test service',
      service_category_id: 0,
    },
    {
      service_name: 'Glass slides and cover slips',
      service_description: 'Glass slides and cover slips service',
      service_category_id: 0,
    },
    {
      service_name: 'Refridgerator',
      service_description: 'Refridgerator service',
      service_category_id: 0,
    },
    {
      service_name: 'Glucometer',
      service_description: 'Glucometer service',
      service_category_id: 0,
    },
    {
      service_name: 'Glucometer test strips',
      service_description: 'Glucometer test strips service',
      service_category_id: 0,
    },
    {
      service_name: 'Calorimeter and haemoglobinometer',
      service_description: 'Calorimeter and haemoglobinometer service',
      service_category_id: 0,
    },
    {
      service_name: 'Wright giemsa stain',
      service_description: 'Wright giemsa stain service',
      service_category_id: 0,
    },
    {
      service_name: 'Elisa washer',
      service_description: 'Elisa washer service',
      service_category_id: 0,
    },
    {
      service_name: 'Elisa reader',
      service_description: 'Elisa reader service',
      service_category_id: 0,
    },
    {
      service_name: 'Incubator',
      service_description: 'Incubator service',
      service_category_id: 0,
    },
    {
      service_name: 'Elisa Assay kit',
      service_description: 'Elisa Assay kit service',
      service_category_id: 0,
    },
    {
      service_name: 'Acredited microscopist',
      service_description: 'Acredited microscopist service',
      service_category_id: 0,
    },
    {
      service_name: 'Zienl Neelsen available and functional',
      service_description: 'Zienl Neelsen available and functional service',
      service_category_id: 0,
    },
    {
      service_name: 'Fluorescence microscope available and functional',
      service_description:
        'Fluorescence microscope available and functional service',
      service_category_id: 0,
    },
    {
      service_name: 'Auramine ohodamine stain for TB microscopy available',
      service_description:
        'Auramine ohodamine stain for TB microscopy available service',
      service_category_id: 0,
    },
    {
      service_name: 'Xpert mtb testing',
      service_description: 'Xpert mtb testing service',
      service_category_id: 0,
    },
    {
      service_name: 'Laptop for mtb testing',
      service_description: 'Laptop for mtb testing service',
      service_category_id: 0,
    },
    {
      service_name: 'Cartilage for mtb testing',
      service_description: 'Cartilage for mtb testing service',
      service_category_id: 0,
    },
    {
      service_name: 'Liver function test',
      service_description: 'Liver function test service',
      service_category_id: 0,
    },
    {
      service_name: 'Alt testing',
      service_description: 'Alt testing service',
      service_category_id: 0,
    },
    {
      service_name: 'Serum creatine test',
      service_description: 'Serum creatine test service',
      service_category_id: 0,
    },
    {
      service_name: 'Renal function test',
      service_description: 'Renal function test service',
      service_category_id: 0,
    },
    {
      service_name: 'Biochemistry analyser for kidney and liver function',
      service_description:
        'Biochemistry analyser for kidney and liver function service',
      service_category_id: 0,
    },
    {
      service_name: 'Centrifuge',
      service_description: 'Centrifuge service',
      service_category_id: 0,
    },
    {
      service_name: 'Assay kit for kidney and liver functional',
      service_description: 'Assay kit for kidney and liver functional service',
      service_category_id: 0,
    },
    {
      service_name: 'FBC-Full blood count',
      service_description: 'FBC-Full blood count service',
      service_category_id: 0,
    },
    {
      service_name: 'Functional haematology analyzer',
      service_description: 'Functional haematology analyzer service',
      service_category_id: 0,
    },
    {
      service_name: 'Reagent for FBC',
      service_description: 'Reagent for FBC service',
      service_category_id: 0,
    },
    {
      service_name: 'Functional CD4 count',
      service_description: 'Functional CD4 count service',
      service_category_id: 0,
    },
    {
      service_name: 'Assay kit for CD4 count testing',
      service_description: 'Assay kit for CD4 count testing service',
      service_category_id: 0,
    },
    {
      service_name: 'Blood group serology',
      service_description: 'Blood group serology service',
      service_category_id: 0,
    },
    {
      service_name: 'Blood group testing',
      service_description: 'Blood group testing service',
      service_category_id: 0,
    },
    {
      service_name: 'Rhesus blood group testing',
      service_description: 'Rhesus blood group testing service',
      service_category_id: 0,
    },
    {
      service_name: 'Agglutination test',
      service_description: 'Agglutination test service',
      service_category_id: 0,
    },
    {
      service_name: 'Anti globin testing',
      service_description: 'Anti globin testing service',
      service_category_id: 0,
    },
    {
      service_name: 'Centrifuge and cross match',
      service_description: 'Centrifuge and cross match service',
      service_category_id: 0,
    },
    {
      service_name: 'Grouping  and cross match',
      service_description: 'Grouping  and cross match service',
      service_category_id: 0,
    },
    {
      service_name: 'Urine microscopy',
      service_description: 'Urine microscopy service',
      service_category_id: 0,
    },
    {
      service_name: 'Syphilis serology testing',
      service_description: 'Syphilis serology testing service',
      service_category_id: 0,
    },
    {
      service_name: 'Gram stain testing',
      service_description: 'Gram stain testing service',
      service_category_id: 0,
    },
    {
      service_name: 'Csf body fluid count',
      service_description: 'Csf body fluid count service',
      service_category_id: 0,
    },
    {
      service_name: 'Molecular biological technique for HIV Viral load',
      service_description:
        'Molecular biological technique for HIV Viral load service',
      service_category_id: 0,
    },
    {
      service_name: 'Serum eletrcolyte',
      service_description: 'Serum eletrcolyte service',
      service_category_id: 0,
    },
    {
      service_name: 'Syphillis serology',
      service_description: 'Syphillis serology service',
      service_category_id: 0,
    },
    {
      service_name: 'Gram stain',
      service_description: 'Gram stain service',
      service_category_id: 0,
    },
    {
      service_name: 'White blood counting chamber',
      service_description: 'White blood counting chamber service',
      service_category_id: 0,
    },
    {
      service_name: 'Cryptoccocol antigen testing',
      service_description: 'Cryptoccocol antigen testing service',
      service_category_id: 0,
    },
    {
      service_name: 'Functional assay automated systems for HIV viral load',
      service_description:
        'Functional assay automated systems for HIV viral load service',
      service_category_id: 0,
    },
    {
      service_name: 'Functional diagnostic centrifuge',
      service_description: 'Functional diagnostic centrifuge service',
      service_category_id: 0,
    },
    {
      service_name: 'Vortex mixer',
      service_description: 'Vortex mixer service',
      service_category_id: 0,
    },
    {
      service_name: 'Pipettes',
      service_description: 'Pipettes service',
      service_category_id: 0,
    },
    {
      service_name: 'Functional biochemistry analyzer',
      service_description: 'Functional biochemistry analyzer service',
      service_category_id: 0,
    },
    {
      service_name: 'Tomography',
      service_description: 'Tomography service',
      service_category_id: 0,
    },
    {
      service_name: 'X-Ray',
      service_description: 'X-Ray service',
      service_category_id: 0,
    },
    {
      service_name: 'USS',
      service_description: 'USS service',
      service_category_id: 0,
    },
    {
      service_name: 'Functional ECG',
      service_description: 'Functional ECG service',
      service_category_id: 0,
    },
  ],
};

module.exports.services = {
  foreignKey: 'service_type_id',
  referenceName: 'service_type',
  schema: serviceTypes.map((serviceType) => {
    return {
      reference: serviceType.service_type,
      data: serviceServiceTypeMapping[serviceType.service_type],
    };
  }),
};
