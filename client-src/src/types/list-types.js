//@flow
import { FacilityType, OperationalStatus, District, Owner } from './model-types'

export type Facilities = Array<{
    id: number,
    facility_code: string,
    facility_name: string,
    common_name: string,
    owner: Owner,
    facilityType: FacilityType,
    operationalStatus: OperationalStatus,
    district: District,
    facility_date_opened: string
}>
