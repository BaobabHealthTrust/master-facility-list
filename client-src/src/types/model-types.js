//@flow

export type District = {
  district_name: string,
  zone_id: number,
  id: number
}

export type FacilityService = {
  service_id: number,
  facility_id: number,
  id: number
}

export type Facility = {
  facility_name: string,
  facility_code: string,
  facility_date_opened: string,
  facility_type_id: number,
  facility_owner_id: number,
  facility_operational_status_id: number,
  facility_regulatory_status_id: number,
  district_id: number,
  id: number
}

export type Owner = {
  facility_owner: string,
  description: string,
  id: number
}

export type OperationalStatus = {
  facility_operational_status: string,
  description: string,
  id: number
}

export type RegulatoryStatus = {
  facility_regulatory_status: string,
  description: string,
  id: number
}

export type FacilityType = {
  facility_type: string,
  description: string,
  id: number
}

export type Resource = {
  resource_name: string,
  description: string,
  resource_type_id: number,
  id: number
}

export type ResourceType = {
  resource_type: string,
  description: string,
  id: number
}

export type FacilityResource = {
  facility_id: number,
  resource_id: number,
  quantity: number,
  description: string,
  id: number
}

export type Utility = {
  utility_name: string,
  description: string,
  utility_type_id: number,
  id: number
}

export type UtilityType = {
  utility_type: string,
  description: string,
  id: number
}

export type ServiceType = {
  service_type: string,
  description: string,
  id: number
}

export type Service = {
  service_name: string,
  service_description: string,
  service_type_id: number,
  service_category_id: number,
  id: number
}
