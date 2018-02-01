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