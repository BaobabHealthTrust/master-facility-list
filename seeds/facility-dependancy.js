"use strict";

const server = require("../server/server");

const FacilityType = server.models.FacilityType;

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
	}
]

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
   }
]

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
]

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
   }
]