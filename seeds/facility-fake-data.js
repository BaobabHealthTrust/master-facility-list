"use strict";

const faker = require("faker");

const server = require("../server/server");
const dataSource = server.dataSources.db;

const Facility = server.models.Facility;
const OperationalStatus = server.models.OperationalStatus;
const RegulatoryStatus = server.models.RegulatoryStatus;
const Owner = server.models.Owner;
const FacilityType = server.models.FacilityType;
const FacilityResource = server.models.FacilityResource;
const Resource = server.models.Resource;
const Address = server.models.Address;
const ContactPeople = server.models.ContactPeople;
const Service = server.models.Service;
const FacilityService = server.models.FacilityService;
const Utility = server.models.Utility;
const FacilityUtility = server.models.FacilityUtility;
const Geolocation = server.models.Geolocation;
const District = server.models.District;
const Location = server.models.Location;

const operationalData = OperationalStatus.find();
const regulatoryData = RegulatoryStatus.find();
const ownerData = Owner.find();
const facilityTypeData = FacilityType.find();
const ResourceData = Resource.find();
const serviceData = Service.find();
const utilityData = Utility.find();
const districtData = District.find();

Promise.all([
	operationalData,
	regulatoryData,
	ownerData,
	facilityTypeData,
	ResourceData,
	serviceData,
	utilityData,
	districtData
]).then(val => {
	const maxValueOperational = val[0].length - 1;
	const maxValueRegulatory = val[1].length - 1;
	const maxValueOwner = val[2].length - 1;
	const maxValueFacilityType = val[3].length - 1;
	const maxValueResource = val[4].length - 1;
	const maxValueService = val[5].length - 1;
	const maxValueUtility = val[6].length - 1;
	const maxValueDistrict = val[7].length - 1;

	const numberOfFacilities = process.argv[2];
	console.log("Number of facilities are " + numberOfFacilities);

	for (let i = 0; i <= numberOfFacilities; i++) {
		const randOperationalIndex = faker.random.number({
			min: 0,
			max: maxValueOperational
		});
		const operationalStatusId = val[0][randOperationalIndex].id;

		const randRegulatoryIndex = faker.random.number({
			min: 0,
			max: maxValueRegulatory
		});
		const regulatoryStatusId = val[1][randRegulatoryIndex].id;

		const randOwnerIndex = faker.random.number({
			min: 0,
			max: maxValueOwner
		});
		const ownerId = val[2][randOwnerIndex].id;

		const randFacilityTypeIndex = faker.random.number({
			min: 0,
			max: maxValueFacilityType
		});
		const facilityTypeId = val[3][randFacilityTypeIndex].id;

		// address randomization
		const physicalAddress = faker.address.streetAddress();
		const postalAddress = faker.address.secondaryAddress();
		// end address

		// contact person
		const fullname = faker.name.findName();
		const phone = faker.phone.phoneNumber();
		const email = faker.internet.email();
		// end contact

		// Geolocation
		const datam = faker.random.number({
			min: 0,
			max: 50
		});
		const latval = faker.address.latitude();
		const longval = faker.address.longitude();
		const geopointData = {
			lat: latval,
			lng: longval
		};
		// end geolocation

		// location
		const catchmentArea = faker.address.streetName();
		const catchmentPopulation = faker.random.number({
			min: 100000,
			max: 1000000
		});
		const randDistrictIndex = faker.random.number({
			min: 0,
			max: maxValueDistrict
		});
		const districtId = val[7][randDistrictIndex].id;

		// end location
		const facilityCode = faker.random.number({
			min: 1000,
			max: 9000
		});

		const facilityData = {
			facility_name: faker.name.findName(),
			facility_code: facilityCode,
			facility_date_opened: "2017-10-25T13:27:53.703Z",
			facility_type_id: facilityTypeId,
			facility_owner_id: ownerId,
			facility_operational_status_id: operationalStatusId,
			facility_regulatory_status_id: regulatoryStatusId,
			district_id: districtId
		};

		const facilityFake = Facility.create(facilityData);
		if (i != numberOfFacilities) {
			Promise.all([facilityFake]).then(values => {
				for (let pivotValues = 0; pivotValues <= 9; pivotValues++) {
					// facilityresource id and quantity
					const randResourceIndex = faker.random.number({
						min: 0,
						max: maxValueResource
					});
					const resourceId = val[4][randResourceIndex].id;

					const resourceQuantity = faker.random.number({
						min: 0,
						max: 200
					});
					// close resource id and quantity
					const facilityResourceData = {
						facility_id: values[0].id,
						resource_id: resourceId,
						quantity: resourceQuantity,
						description: faker.lorem.sentence()
					};
					const facilityResources = FacilityResource.create(
						facilityResourceData
					);
					// service id
					const randServiceIndex = faker.random.number({
						min: 0,
						max: maxValueService
					});
					const serviceId = val[5][randServiceIndex].id;
					// end service
					const facilityServiceData = {
						service_id: serviceId,
						facility_id: values[0].id
					};
					const facilityServices = FacilityService.create(
						facilityServiceData
					);
					// utility id
					const randUtilityIndex = faker.random.number({
						min: 0,
						max: maxValueUtility
					});
					const utilityId = val[5][randUtilityIndex].id;
					// end utility
					const facilityUtilityData = {
						facility_id: values[0].id,
						utility_id: utilityId
					};
					const facilityUtilities = FacilityUtility.create(
						facilityUtilityData
					);
				}
				const addressData = {
					physical_address: physicalAddress,
					postal_address: postalAddress,
					facility_id: values[0].id
				};
				const addresses = Address.create(addressData);
				const contactData = {
					contact_person_fullname: fullname,
					contact_person_phone: phone,
					contact_person_email: email,
					facility_id: values[0].id
				};
				const contacts = ContactPeople.create(contactData);

				const geolocationData = {
					datum: datam,
					geolocation: geopointData,
					facility_id: values[0].id
				};
				const geolocations = Geolocation.create(geolocationData);
				const locationData = {
					catchment_area: catchmentArea,
					catchment_population: catchmentPopulation,
					facility_id: values[0].id
				};
				const locations = Location.create(locationData);

				Promise.all([
					addresses,
					contacts,
					geolocations,
					locations
				]).then(resvalues => {
					console.log(
						"All dependencies in association with\
					 facilities are created"
					);
				});
			});
		} else {
			Promise.all([facilityFake]).then(values => {
				for (let pivotValues = 0; pivotValues <= 10; pivotValues++) {
					// facilityresource id and quantity
					const randResourceIndex = faker.random.number({
						min: 0,
						max: maxValueResource
					});
					const resourceId = val[4][randResourceIndex].id;

					const resourceQuantity = faker.random.number({
						min: 0,
						max: 200
					});
					// close resource id and quantity
					const facilityResourceData = {
						facility_id: values[0].id,
						resource_id: resourceId,
						quantity: resourceQuantity,
						description: faker.lorem.sentence()
					};
					const facilityResources = FacilityResource.create(
						facilityResourceData
					);
					// service id
					const randServiceIndex = faker.random.number({
						min: 0,
						max: maxValueService
					});
					const serviceId = val[5][randServiceIndex].id;
					// end service
					const facilityServiceData = {
						service_id: serviceId,
						facility_id: values[0].id
					};
					const facilityServices = FacilityService.create(
						facilityServiceData
					);
					// utility id
					const randUtilityIndex = faker.random.number({
						min: 0,
						max: maxValueUtility
					});
					const utilityId = val[5][randUtilityIndex].id;
					// end utility
					const facilityUtilityData = {
						facility_id: values[0].id,
						utility_id: utilityId
					};
					const facilityUtilities = FacilityUtility.create(
						facilityUtilityData
					);
				}
				const addressData = {
					physical_address: physicalAddress,
					postal_address: postalAddress,
					facility_id: values[0].id
				};
				const addresses = Address.create(addressData);
				const contactData = {
					contact_person_fullname: fullname,
					contact_person_phone: phone,
					contact_person_email: email,
					facility_id: values[0].id
				};
				const contacts = ContactPeople.create(contactData);

				const geolocationData = {
					datum: datam,
					geolocation: geopointData,
					facility_id: values[0].id
				};
				const geolocations = Geolocation.create(geolocationData);
				const locationData = {
					catchment_area: catchmentArea,
					catchment_population: catchmentPopulation,
					facility_id: values[0].id
				};
				const locations = Location.create(locationData);

				Promise.all([
					addresses,
					contacts,
					geolocations,
					locations
				]).then(resvalues => {
					console.log(
						"All dependencies in association with\
					 facilities are created"
					);
					dataSource.disconnect();
				});
			});
		}
	}
});
