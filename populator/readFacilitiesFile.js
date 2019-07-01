'use strict';

const { error, log } = console;
const parse = require('csv-parse');
const faker = require('faker');
const { existsSync, createReadStream, writeFile } = require('fs');
const server = require('../server/server');
const dataSource = server.dataSources.db;

const {
  Address,
  ContactPeople,
  District,
  Facility,
  FacilityType,
  FacilityService,
  FacilityUtility,
  FeedbackType,
  Geolocation,
  OperationalStatus,
  Owner,
  Utility,
  UtilityType,
  Location,
  RegulatoryStatus,
  Resource,
  ResourceType,
  Service,
  ServiceType,
  Zone,
  FacilityResource,
} = server.models;

module.exports = async (filePath = './../data/facilities.csv') => {
  await createReadStream(filePath).pipe(parser);
};

const truncate = async (Model) => {
  const dataSource = Model.dataSource;
  const query = `TRUNCATE TABLE ${Model.definition.name}`;

  await dataSource.connector.execute(query, [], function(err, model) {
    if (err) console.error(err);
  });
};

const getIds = async (Model, where, id = 1) => {
  const foundModel = await Model.findOne({ where });
  return foundModel ? foundModel.id : id;
};

const createFacility = async (facility) => {
  const district_name = facility[6].trim();
  const facility_type = facility[4].trim();
  const facility_owner = facility[5].trim();

  const registration_number = facility[14].trim();

  const facility_name = facility[8];

  if (!facility_name) {
    return null;
  }

  return await Facility.create({
    facility_code_mapping: [
      {
        system: 'DHIS2',
        code: facility[13],
        url: '',
      },
    ],
    registration_number,
    facility_name,
    common_name: facility[9],
    facility_date_opened: new Date('1975-01-01'),
    facility_type_id: await getIds(FacilityType, { facility_type }, 9),
    facility_owner_id: await getIds(Owner, { facility_owner }, 6),
    facility_operational_status_id: facility[21] ? 1 : 5,
    facility_regulatory_status_id: registration_number ? 1 : 2,
    district_id: await getIds(District, { district_name }),
    client_id: 1,
    published_date: new Date(Date.now()),
  }).catch((e) => console.error(e.message));
};

const createGeolocation = async (facility, id) => {
  await Geolocation.create({
    datum: facility[15],
    longitude: facility[17],
    latitude: facility[16],
    facility_id: id,
    client_id: 1,
  });
};

const addFacilityResource = async (resource_name, quantity, facility_id) => {
  const foundResource = await Resource.findOne({ where: { resource_name } });

  if (!foundResource || !quantity || isNaN(quantity) || quantity == 0) {
    return;
  }

  await FacilityResource.create({
    facility_id,
    resource_id: foundResource.id,
    quantity: quantity ? Number(quantity) : 0,
    description: resource_name,
    client_id: 1,
    created_date: new Date(Date.now()),
  });
};

const addFacilityService = async (service_name, value, facility_id) => {
  const foundService = await Service.findOne({ where: { service_name } });

  if (!foundService || !value || isNaN(value) || value == 0) {
    return;
  }

  await FacilityService.create({
    facility_id,
    client_id: 1,
    service_id: foundService.id,
  });
};

const addFacilityUtility = async (utility_name, value, facility_id) => {
  const foundUtility = await Utility.findOne({ where: { utility_name } });

  if (!foundUtility || !value || isNaN(value) || value == 0) {
    return;
  }

  await FacilityUtility.create({
    facility_id,
    client_id: 1,
    utility_id: foundUtility.id,
  });
};

const addFacilityResources = async (facility, id) => {
  // Beds
  await addFacilityResource('Maternity beds', facility[80], id);
  await addFacilityResource('Delivery beds', facility[81], id);
  await addFacilityResource('Other inpatient beds', facility[78], id);
  await addFacilityResource('Total overningt beds', facility[79], id); // TODO: ask the architect

  // Transport
  await addFacilityResource('Motor Vehicle Ambulances', facility[110], id);
  await addFacilityResource('Motor cycles', facility[109], id);
  await addFacilityResource('Vehicles/Cars', facility[108], id);
  await addFacilityResource('Motor cycles', facility[108], id);
  await addFacilityResource('Motor Bike Ambulances', facility[110], id);
  await addFacilityResource('Bicycles', facility[111], id);
  await addFacilityResource('Other', facility[112], id);

  // Computers
  await addFacilityResource('Desktop', facility[101], id);

  // HOUSEs
  await addFacilityResource('Staff houses', facility[101], id);
};

const addFacilityUtilities = async (facility, id) => {
  await addFacilityUtility('TNM', facility[89], id);
  await addFacilityUtility('Access', facility[90], id);
  await addFacilityUtility('MTL', facility[91], id);
  await addFacilityUtility('Other', facility[92], id);
  await addFacilityUtility('GWAN', facility[94], id);
  await addFacilityUtility('Skyband', facility[95], id);
  await addFacilityUtility('Globe', facility[96], id);
  await addFacilityUtility('Airtel', facility[88], id);

  await addFacilityUtility(
    'Toilet',
    facility[162] == 'YES' || facility[162] == 'Yes' ? 1 : 0,
    id,
  );

  await addFacilityUtility('Incinerator', facility[202], id);
  await addFacilityUtility('Chamber industrial', facility[175], id);
  await addFacilityUtility('Chamber drum', facility[176], id);
  await addFacilityUtility('Flat ground', facility[178], id);
  await addFacilityUtility('Protected ground', facility[179], id);
  await addFacilityUtility('Pit latrine', facility[180], id);
  await addFacilityUtility('Pit no protection', facility[181], id);
  await addFacilityUtility('Protected ground or pit', facility[182], id);
  await addFacilityUtility('Covered container', facility[183], id);
  await addFacilityUtility('Other protected environment', facility[184], id);
  await addFacilityUtility('Other', facility[186], id);
  await addFacilityUtility('Non sharp chamber industrial', facility[189], id);
  await addFacilityUtility('Non sharp chamber drum', facility[190], id);
  await addFacilityUtility('Non sharp flat ground', facility[191], id);
  await addFacilityUtility('Non sharp pit protected ground', facility[192], id);
  await addFacilityUtility('Non sharp covered_pit', facility[193], id);
  await addFacilityUtility('Non sharp open pit', facility[194], id);
  await addFacilityUtility('Non sharp protected_ground', facility[195], id);
  await addFacilityUtility('Non sharp covered container', facility[196], id);

  await addFacilityUtility(
    'Non sharp other protected environment',
    facility[197],
    id,
  );

  await addFacilityUtility('Non sharp other', facility[200], id);

  await addFacilityUtility('Wired for electricity', facility[118], id);
  // await addFacilityUtility('National Grid', facility[118], id);
};

const addFacilityServices = async (facility, id) => {
  // TODO:  Family Planning
  await addFacilityService('Pill', facility[241], id);
  await addFacilityService('Pill', facility[242], id);
  await addFacilityService('Injectable', facility[243], id);
  await addFacilityService('Progesterone only injectable', facility[244], id);
  await addFacilityService('Male condoms', facility[245], id);
  await addFacilityService('Female condoms', facility[246], id);
  await addFacilityService('Intrauterine Device (IUD)', facility[247], id);
  await addFacilityService('Implant', facility[248], id);
  await addFacilityService('Cycle Beads', facility[249], id);
  await addFacilityService('Emergency Contraception', facility[250], id);
  await addFacilityService('Male Sterilisation', facility[251], id);
  await addFacilityService('Female Sterilisation', facility[252], id);
  await addFacilityService('Depoprovera', facility[253], id);

  // TODO: antenatal Services
  await addFacilityService('Iron Supplimentation', facility[274], id);
  await addFacilityService('Folic acid supplimentation', facility[275], id);

  await addFacilityService(
    'Fansidar for malaria prevention (IPT)',
    facility[276],
    id,
  );

  await addFacilityService('Tetanus Toxoid', facility[277], id);

  await addFacilityService(
    'Management of High Blood Pressure in Pregnant women',
    facility[278],
    id,
  );

  await addFacilityService('Misoprostol', facility[279], id);
  await addFacilityService('ANC guidelines', facility[280], id);
  await addFacilityService('ANC job aid', facility[281], id);
  await addFacilityService('IPT guidelines', facility[282], id);

  await addFacilityService(
    'Staff trained in ANC last 2 years',
    facility[283],
    id,
  );

  await addFacilityService(
    'Staff trained in IPT last 2 years',
    facility[284],
    id,
  );

  // TODO: Prevention of Mother to Child Transmission of HIV (PMTCT)
  await addFacilityService(
    'HIV Counselling for Pregnant women',
    facility[286],
    id,
  );

  await addFacilityService('HIV Testing', facility[287], id);
  await addFacilityService('ARV Prophylaxis', facility[288], id);
  await addFacilityService('ART for Pregnant women', facility[289], id);
  await addFacilityService('ARV prohpylaxis  for newborn', facility[290], id);

  await addFacilityService(
    'Breastfeeding/feeding options Counselling ',
    facility[291],
    id,
  );

  await addFacilityService('Nutrition Counselling', facility[292], id);

  await addFacilityService(
    'Family planning  counselling to HIV positve pregnant women',
    facility[293],
    id,
  );

  await addFacilityService('PMTCT guideines', facility[294], id);

  await addFacilityService(
    'Staff trained in PMTCT last 2 years',
    facility[295],
    id,
  );

  await addFacilityService(
    'Staff trained in infant and young child feeding last 2 years',
    facility[296],
    id,
  );

  await addFacilityService(
    'Infant and young child feeding last 2 years',
    facility[297],
    id,
  );

  await addFacilityService('PMTCT room', facility[298], id);

  // TODO:  Delivery Services
  await addFacilityService(
    'Active management of third stage of labor',
    facility[300],
    id,
  );

  await addFacilityService('Antibiotics', facility[301], id);
  await addFacilityService('Parentel oxytocin', facility[302], id);
  await addFacilityService('Magnesium sulphate', facility[303], id);
  await addFacilityService('Assisted vaginal', facility[304], id);
  await addFacilityService('Manual removal of placenta', facility[305], id);
  await addFacilityService('Removal of concetpion products', facility[306], id);
  await addFacilityService('Neonatal Rescucitation', facility[307], id);
  await addFacilityService('Caesarian section', facility[308], id);
  await addFacilityService('Blood transfusion', facility[309], id);
  await addFacilityService('Successiful Deliveries', facility[310], id);
  await addFacilityService('Maternal Deaths', facility[311], id);
  await addFacilityService('Obstetric Referrals', facility[312], id);
  await addFacilityService('Ceasarian section', facility[313], id);
  await addFacilityService('Emergencey Ceasarian Section', facility[315], id);
  await addFacilityService('Obstetric Guidelines', facility[316], id);

  await addFacilityService(
    'Obstetrics Job aid in maternal and neonatal care ',
    facility[317],
    id,
  );

  await addFacilityService('Obstetric Job aid', facility[318], id);
  await addFacilityService('New born rescucitation', facility[319], id);

  await addFacilityService(
    'Neonatal sucntion bulb single use/multiuse ',
    facility[320],
    id,
  );

  await addFacilityService('Sucntion bulb single use', facility[321], id);
  await addFacilityService('Sunction bulb multiuse', facility[322], id);
  await addFacilityService('Obstetric care medicines', facility[324], id);
  await addFacilityService('Eye ointment', facility[325], id);
  await addFacilityService('Gentamycin injectable 40mg', facility[326], id);
  await addFacilityService('Gentamycin injectable 20mg', facility[327], id);
  await addFacilityService('Gentamycin 10mg', facility[328], id);
  await addFacilityService('Ampicilin', facility[329], id);
  await addFacilityService('Hydralazine', facility[330], id);
  await addFacilityService('Metronidazole', facility[331], id);
  await addFacilityService('Azithromycin', facility[332], id);
  await addFacilityService('Cefixime', facility[333], id);
  await addFacilityService('Benzathine/Benzylpenicin', facility[334], id);
  await addFacilityService('Nifedipe', facility[335], id);
  await addFacilityService('Methyldopa', facility[336], id);
  await addFacilityService('Calcium gluconate', facility[337], id);
  await addFacilityService('Magnesium Sulphate', facility[338], id);
  await addFacilityService('Skin disinfectant', facility[339], id);
  await addFacilityService('Chlorhexidine', facility[340], id);
  await addFacilityService('IV Solutions', facility[341], id);

  await addFacilityService(
    'Sodium chloride injection solution',
    facility[342],
    id,
  );

  await addFacilityService('Betamethasone injectable', facility[343], id);
  await addFacilityService('Dexamethasone injectable', facility[344], id);
  await addFacilityService('Oxytocin', facility[345], id);
  await addFacilityService('Postnatal services', facility[349], id);
  await addFacilityService(
    'Guidleines for Management of Obstetric Complications',
    facility[350],
    id,
  );
  await addFacilityService(
    'Staff trained in  management of complicated Obstetric Cases',
    facility[351],
    id,
  );

  await addFacilityService(
    'Staff trained in Caesarain section',
    facility[352],
    id,
  );

  await addFacilityService('Anaesthetist', facility[353], id);

  // TODO: Vaccination
  await addFacilityService('Child immunisation', facility[354], id);
  await addFacilityService('Vaccine storage', facility[355], id);
  await addFacilityService('Refridgerator', facility[356], id);

  await addFacilityService(
    'Refridgerator temperature monitoring',
    facility[358],
    id,
  );

  await addFacilityService('Power source', facility[359], id);
  await addFacilityService('Measles vaccine', facility[362], id);

  await addFacilityService(
    'DPT-Hib + Hep B/Pentavalet vaccine',
    facility[363],
    id,
  );

  await addFacilityService('Polio vaccine', facility[364], id);

  await addFacilityService('BCG vaccine', facility[365], id);
  await addFacilityService('Rotavirus Vaccine', facility[366], id);
  await addFacilityService('Skilled vaccine  providers', facility[368], id);

  await addFacilityService(
    'Staff trained  in vaccine management',
    facility[369],
    id,
  );

  await addFacilityService('Staff trained in monitoring', facility[370], id);
  await addFacilityService(
    'Staff trained in disease surveillance',
    facility[371],
    id,
  );

  await addFacilityService(
    'Staff trained in injection safety',
    facility[372],
    id,
  );

  await addFacilityService('Disposable syringes', facility[373], id);
  await addFacilityService('Auto-disable syringes', facility[374], id);
  await addFacilityService('Polio vaccine diluent', facility[375], id);
  await addFacilityService('BCG vaccine diluent', facility[376], id);
  await addFacilityService('Pneumococcol vaccine ', facility[378], id);
  await addFacilityService('DPT Vaccine', facility[379], id);
  await addFacilityService('Measles vaccine', facility[380], id);
  await addFacilityService('Measles vaccine stock out', facility[381], id);
  await addFacilityService('Pentavalet vaccine stock out', facility[383], id);
  await addFacilityService('Polio vaccine stock out', facility[385], id);
  await addFacilityService('BCG vaccine stock out', facility[386], id);
  await addFacilityService('Rota vaccine stock out', facility[389], id);

  await addFacilityService(
    'Penuomoccocal vaccine stock out',
    facility[391],
    id,
  );

  // TODO: Child care services
  await addFacilityService('Management of malnutrition', facility[394], id);
  await addFacilityService(
    'Vitamin A supplimentation in infants and children',
    facility[395],
    id,
  );
  await addFacilityService('ORS provision', facility[396], id);
  await addFacilityService('Zinc supplimentation', facility[397], id);
  await addFacilityService('Growth monitoring', facility[398], id);
  await addFacilityService('Pneumonia Treatment', facility[499], id);
  await addFacilityService('Amoxixillin Treatment', facility[400], id);
  await addFacilityService('Malaria Treatment', facility[401], id);
  await addFacilityService('Iron Suppliment', facility[402], id);
  await addFacilityService('HTC for minor adolescents', facility[406], id);
  await addFacilityService('HTC room', facility[407], id);
  await addFacilityService('RDTS', facility[408], id);
  await addFacilityService('Condoms', facility[409], id);
  await addFacilityService('Running water', facility[410], id);
  await addFacilityService('Hand washing soap', facility[411], id);
  await addFacilityService('Hand sanitiser', facility[412], id);
  await addFacilityService('Disposable gloves', facility[413], id);
  await addFacilityService('Bin', facility[414], id);
  await addFacilityService('Shaprs Container', facility[415], id);
  await addFacilityService('Disinfectant', facility[416], id);
  await addFacilityService('Disposable syringes', facility[417], id);
  await addFacilityService('Auto disposable Syringes', facility[418], id);
  await addFacilityService('Staff trained in VCT', facility[404], id);
  await addFacilityService(
    'Staff trained in HIV-AIDS prevention',
    facility[405],
    id,
  );
  await addFacilityService('IMCI Guidelines', facility[403], id);

  // TODO: HIVand AIDS Treatment services
  await addFacilityService('ART services', facility[419], id);
  await addFacilityService('ART providers', facility[420], id);
  await addFacilityService('ART Pescriptions', facility[421], id);
  await addFacilityService('ART follow up', facility[422], id);
  await addFacilityService('National ART guidelines', facility[423], id);
  await addFacilityService(
    'Staff trained in ART in last 2 years',
    facility[424],
    id,
  );
  await addFacilityService(
    'Treatment for Opportunistic infections',
    facility[426],
    id,
  );
  await addFacilityService('Palliative care Services', facility[427], id);
  await addFacilityService('IV Treatment', facility[428], id);
  await addFacilityService('Cancer Treatment', facility[429], id);
  await addFacilityService('Nutrition services', facility[430], id);
  await addFacilityService(
    'Fortified Protein supplimentation',
    facility[431],
    id,
  );
  await addFacilityService('Paediatric-HIV servies', facility[432], id);
  await addFacilityService('TB Treatment', facility[433], id);
  await addFacilityService('PrepP-Pre exposure prophylaxis', facility[434], id);
  await addFacilityService(
    'Family planning for HIV clients',
    facility[435],
    id,
  );
  await addFacilityService('Condoms', facility[436], id);
  await addFacilityService('HIV and TB screening', facility[437], id);
  await addFacilityService('HIV-AIDS national guidelines', facility[438], id);
  await addFacilityService('Palliative care guidelines', facility[439], id);
  await addFacilityService(
    'Staff trained in HIV-AIDS clinical management',
    facility[440],
    id,
  );

  // TODO: Sexully Transmitted infections
  await addFacilityService('STI services', facility[441], id);
  await addFacilityService('STI diagnosis and management', facility[442], id);
  await addFacilityService('ST Treatment', facility[443], id);
  await addFacilityService('National STI guidelines', facility[444], id);
  await addFacilityService(
    'Staff trained in STI diagnosis and management',
    facility[445],
    id,
  );

  //TODO: TB Diagnosis/Testing
  await addFacilityService(
    'TB Diagnosis using clinical symptoms',
    facility[448],
    id,
  );
  await addFacilityService('Smear microscopy', facility[449], id);
  await addFacilityService('Tuberculosis Culture', facility[450], id);
  await addFacilityService('Xpert', facility[451], id);
  await addFacilityService('X-Ray', facility[452], id);
  await addFacilityService('Facility prescibes TB drugs', facility[455], id);
  await addFacilityService('Facility provides TB drugs', facility[456], id);
  await addFacilityService('TB Patient follow up', facility[457], id);
  await addFacilityService('TB Screening', facility[458], id);
  await addFacilityService('TB Guideliness', facility[459], id);

  await addFacilityService(
    'National guidelines for TB- MDR',
    facility[460],
    id,
  );

  await addFacilityService('MDR TB guidelines', facility[461], id);

  await addFacilityService(
    'TB infection control guidelines',
    facility[462],
    id,
  );

  await addFacilityService('Staff trained in TB Management', facility[463], id);

  await addFacilityService(
    'Staff trained in HIV-TB coinfection',
    facility[464],
    id,
  );

  await addFacilityService('Staff trained in MDR TB', facility[465], id);

  await addFacilityService(
    'Staff trained in TB Infection control',
    facility[466],
    id,
  );

  //TODO: Non-Communicable Diseases
  await addFacilityService(
    'Cardivascular diseases management',
    facility[467],
    id,
  );

  await addFacilityService(
    'Chronic Respiratory diseases management',
    facility[470],
    id,
  );
  await addFacilityService('Chronic Respiratory diseases', facility[469], id);
  await addFacilityService(
    'Staff trained in Respiratory Diseases',
    facility[471],
    id,
  );
  await addFacilityService('Peak flow meters', facility[473], id);
  await addFacilityService('Inhalers', facility[474], id);
  await addFacilityService('Cervical cancer Diagnosis', facility[475], id);
  await addFacilityService(
    'National guidelines for Cervical cancer',
    facility[476],
    id,
  );

  await addFacilityService(
    'Staff trained in Cervical cancer prevention and control',
    facility[477],
    id,
  );
  await addFacilityService(' Laparatomy provided', facility[478], id);
  await addFacilityService('Hernia Repair', facility[479], id);
  await addFacilityService('Neonatal surgery', facility[480], id);
  await addFacilityService('Cleft Lip repair', facility[481], id);
  await addFacilityService('Contacture release', facility[482], id);
  await addFacilityService('Skin grafting', facility[483], id);
  await addFacilityService('Fracture', facility[484], id);
  await addFacilityService('Amputation', facility[485], id);
  await addFacilityService('Cataract Surgery', facility[486], id);
  await addFacilityService('Rescucitation for adults', facility[487], id);

  await addFacilityService(
    'Rescucitation for peadiatric patients',
    facility[588],
    id,
  );

  await addFacilityService('Needle holders', facility[489], id);
  await addFacilityService('Surgical Blades', facility[490], id);
  await addFacilityService('Retractor', facility[491], id);
  await addFacilityService('Surgical Scissors', facility[492], id);
  await addFacilityService('Feeding tubes', facility[493], id);
  await addFacilityService('Tourniquet', facility[494], id);
  await addFacilityService('Suction Pump and catheter', facility[495], id);
  await addFacilityService(
    'Cardiovascular disease management guidelines',
    facility[468],
    id,
  );
  await addFacilityService(
    'Staff trained in cardiovascular diseases',
    facility[469],
    id,
  );

  // TODO: Surgical_services_provided
  await addFacilityService('Running water', facility[500], id);
  await addFacilityService('Hand waship soap', facility[501], id);
  await addFacilityService('Hand sanitiser', facility[502], id);
  await addFacilityService('Disposable gloves', facility[503], id);
  await addFacilityService('Bin', facility[504], id);
  await addFacilityService('Sharp container', facility[505], id);
  await addFacilityService('Disinfectant', facility[506], id);
  await addFacilityService('Disposable syringes', facility[507], id);
  await addFacilityService('Auto disposable syringes', facility[508], id);
  await addFacilityService(
    'National guidelines for Surgical care',
    facility[496],
    id,
  );
  await addFacilityService('IMEESC trained staff', facility[497], id);
  await addFacilityService('Staff trained in surgery', facility[498], id);
  await addFacilityService('Staff trained in anaesthesia', facility[499], id);

  // TODO: Malaria_facility_offer_diagnosis_and_malaria_treatment
  await addFacilityService('Malaria diagnosis', facility[510], id);

  await addFacilityService(
    'Malaria diagnosis through symptoms',
    facility[511],
    id,
  );

  await addFacilityService(
    'Malaria rapid diagnostic test (MRDT)',
    facility[512],
    id,
  );

  await addFacilityService('Slide microscopy', facility[413], id);

  // TODO:
  await addFacilityService('Blood transfusion', facility[514], id);
  await addFacilityService('Blood stock outs', facility[515], id);
  await addFacilityService(
    'Blood ordered from national/regional centre',
    facility[516],
    id,
  );
  await addFacilityService(
    'Blood obtained from other sources',
    facility[517],
    id,
  );
  await addFacilityService('Blood screening', facility[518], id);
  await addFacilityService('Blood screened for HIV', facility[519], id);
  await addFacilityService('Blood screened for Syphillis', facility[520], id);
  await addFacilityService(
    'Blood screened for Hepatitis  B',
    facility[521],
    id,
  );
  await addFacilityService('Blood screened for Hepatitis C', facility[522], id);
  await addFacilityService('Refrigerator for storing blood', facility[523], id);
  await addFacilityService(
    'Guidleines for blood transfusion',
    facility[524],
    id,
  );
  await addFacilityService(
    'Staff trained in blood transfusion last 2 years',
    facility[525],
    id,
  );

  // TODO:
  await addFacilityService('Diagnostic testing', facility[526], id);
  await addFacilityService('Rapid Syphillis', facility[527], id);
  await addFacilityService('Rapid HIV Testing', facility[528], id);

  await addFacilityService(
    'Urine rapid test  for pregnancy',
    facility[529],
    id,
  );

  await addFacilityService('Urine protein dip stick test', facility[530], id);
  await addFacilityService('Urine glucose test', facility[531], id);
  await addFacilityService('Urine keton test', facility[532], id);
  await addFacilityService('DBS', facility[533], id);
  await addFacilityService('Malaria rapid test', facility[534], id);
  await addFacilityService('MRDT available', facility[535], id);
  await addFacilityService('Syphillis rpid test', facility[536], id);
  await addFacilityService('Pregnancy test', facility[537], id);
  await addFacilityService('Pregnancy test', facility[538], id);
  await addFacilityService('Urine protein test', facility[539], id);
  await addFacilityService('Blood glucose test', facility[540], id);
  await addFacilityService('Ketone test', facility[541], id);
  await addFacilityService('DBS', facility[542], id);
  await addFacilityService('RDTS stock out', facility[543], id);
  await addFacilityService('Days with stock out', facility[544], id);
  await addFacilityService('Blood sugar test', facility[545], id);
  await addFacilityService('Full blood count', facility[546], id);
  await addFacilityService('Microscopy', facility[547], id);
  await addFacilityService('HIV test', facility[548], id);
  await addFacilityService('Elisa-HIV antibody test', facility[549], id);
  await addFacilityService('Glass slides and cover slips', facility[550], id);
  await addFacilityService('Refridgerator', facility[552], id);
  await addFacilityService('Glucometer', facility[553], id);
  await addFacilityService('Glucometer test strips', facility[554], id);
  await addFacilityService(
    'Calorimeter and haemoglobinometer',
    facility[555],
    id,
  );
  await addFacilityService('Wright giemsa stain', facility[556], id);
  await addFacilityService('Elisa washer', facility[557], id);
  await addFacilityService('Elisa reader', facility[558], id);
  await addFacilityService('Incubator', facility[559], id);
  await addFacilityService('Elisa Assay kit', facility[560], id);
  await addFacilityService('Acredited microscopist', facility[561], id);
  await addFacilityService(
    'Zienl Neelsen available and functional',
    facility[562],
    id,
  );
  await addFacilityService(
    'Fluorescence microscope available and functional ',
    facility[563],
    id,
  );
  await addFacilityService(
    'Auramine ohodamine stain for TB microscopy available',
    facility[565],
    id,
  );
  await addFacilityService('Xpert mtb testing', facility[566], id);
  await addFacilityService('Laptop for mtb testing', facility[567], id);
  await addFacilityService('Cartilage for mtb testing', facility[568], id);
  await addFacilityService('Liver function test', facility[569], id);
  await addFacilityService('Alt testing', facility[570], id);
  await addFacilityService('Serum creatine test', facility[572], id);
  await addFacilityService('Renal function test', facility[573], id);
  await addFacilityService(
    'Biochemistry analyser for kidney and liver function',
    facility[574],
    id,
  );
  await addFacilityService('Centrifuge', facility[575], id);
  await addFacilityService(
    'Assay kit for kidney and liver functional',
    facility[576],
    id,
  );
  await addFacilityService('FBC-Full blood count', facility[578], id);
  await addFacilityService(
    'Functional haematology analyzer',
    facility[579],
    id,
  );
  await addFacilityService('Reagent for FBC', facility[580], id);
  await addFacilityService('Functional CD4 count', facility[581], id);
  await addFacilityService(
    'Assay kit for CD4 count testing',
    facility[583],
    id,
  );
  await addFacilityService('Blood group serology', facility[584], id);
  await addFacilityService('Blood group testing ', facility[585], id);
  await addFacilityService('Rhesus blood group testing', facility[586], id);
  await addFacilityService('Agglutination test', facility[587], id);
  await addFacilityService('Anti globin testing', facility[588], id);
  await addFacilityService('Centrifuge and cross match', facility[589], id);
  await addFacilityService('Grouping  and cross match', facility[590], id);
  await addFacilityService('Urine microscopy', facility[593], id);
  await addFacilityService('Syphilis serology testing', facility[594], id);
  await addFacilityService('Gram stain testing', facility[595], id);
  await addFacilityService('Csf body fluid count', facility[596], id);
  await addFacilityService('Csf body fluid count', facility[597], id);
  await addFacilityService(
    'Molecular biological technique for HIV Viral load',
    facility[598],
    id,
  );
  await addFacilityService('Serum eletrcolyte', facility[599], id);
  await addFacilityService('Syphillis serology', facility[600], id);
  await addFacilityService('Gram stain', facility[601], id);
  await addFacilityService('White blood counting chamber', facility[602], id);
  await addFacilityService('Cryptoccocol antigen testing', facility[603], id);
  await addFacilityService(
    'Functional assay automated systems for HIV viral load',
    facility[604],
    id,
  );
  await addFacilityService(
    'Functional diagnostic centrifuge',
    facility[605],
    id,
  );
  await addFacilityService('Vortex mixer', facility[606], id);
  await addFacilityService('Pipettes', facility[607], id);
  await addFacilityService(
    'Functional biochemistry analyzer',
    facility[608],
    id,
  );
  await addFacilityService('Tomography', facility[609], id);
  await addFacilityService('X-Ray', facility[610], id);
  await addFacilityService('USS', facility[611], id);
  await addFacilityService('Functional ECG', facility[612], id);

  await addFacilityService('Oral Contraceptives', facility[256], id);
  await addFacilityService(
    'Progesterone oral Contraceptive',
    facility[257],
    id,
  );
  await addFacilityService('Injectable Contraceptive', facility[258], id);
  await addFacilityService('Injectable Contraceptive ', facility[259], id);
  await addFacilityService('Male condoms', facility[260], id);
  await addFacilityService('Female condoms', facility[261], id);
  await addFacilityService('Intrauterine Device (IUCD)', facility[262], id);
  await addFacilityService('Implants', facility[263], id);
  await addFacilityService('Cycle Beads', facility[264], id);
  await addFacilityService('Emergency Contraceptives', facility[265], id);
  await addFacilityService('Male Sterilisation', facility[266], id);
  await addFacilityService('Male Sterilisation', facility[267], id);
  await addFacilityService('Depoprovera', facility[268], id);
  await addFacilityService('Levonorgestrel', facility[271], id);
  await addFacilityService('Ulipristal Acetate', facility[272], id);
};

const parser = parse({ delimiter: ',' }, async (err, facilities) => {
  if (err) {
    error(err.message);
    process.exit(1);
    return;
  }

  await truncate(Facility);
  await truncate(ContactPeople);
  await truncate(Geolocation);
  await truncate(FacilityUtility);
  await truncate(FacilityResource);
  await truncate(FacilityService);

  console.log();
  for (const facility of facilities) {
    const [firstElement] = facility;

    const createdFacility = await createFacility(facility);
    if (!createdFacility || firstElement === '#') {
      // var fs = require('fs');
      // fs.writeFile('temp.txt', facility.join('\n'), (err) => {
      //   if (err) console.log(err);
      //   console.log('Successfully Written to File.');
      // });
      continue;
    }

    const { id } = createdFacility;
    await createGeolocation(facility, id);

    await ContactPeople.create({
      contact_person_fullname: 'John Banda',
      contact_person_phone: '0111234567',
      contact_person_email: 'johnbanda@kuunika.org',
      facility_id: id,
      client_id: 1,
      postal_address: 'P. O. box 1234, Kuunika',
    });

    await Address.create({
      physical_address: 'Kuunika',
      postal_address: 'p.o. box 1234, Kuunika',
      village: 'Kuunika',
      ta: facility[28],
      facility_id: id,
    });

    await Location.create({
      catchment_area: 'urban',
      catchment_population: 0,
      client_id: 1,
      facility_id: id,
    });

    await addFacilityResources(facility, id);
    await addFacilityServices(facility, id);
    await addFacilityUtilities(facility, id);
    console.log(`✅  ${id}: ${createdFacility.facility_name}`);
  }

  await dataSource.disconnect();
});
