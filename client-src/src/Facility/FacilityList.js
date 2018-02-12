//@flow
import React from "react";
import MflDownload from "../common/MflDownload";
import Table from "../common/Table";
import Pagination from "../common/Pagination";
import { truncate } from "lodash";
import moment from "moment";
import type { Owner, FacilityType, OperationalStatus, District } from "../types/model-types";

type Props = {
    dataSource: Array<{
        id: number,
        facility_code: string,
        facility_name: string,
        common_name: string,
        owner: Owner,
        facilityType: FacilityType,
        operationalStatus: OperationalStatus,
        district: District,
        facility_date_opened: string,
    }>,
    downloadAction: Function,
    toggleAdvancedSearch: Function
}
export default class FacilityList extends React.Component<Props> {
    render() {
        const tableHeaders = ["CODE", "NAME", "COMMON NAME", "OWNERSHIP", "TYPE", "STATUS", "DISTRICT", "DATE OPENED"]
        const tableRecords = this.props.dataSource
            && this.props.dataSource.map(facility => {
                return [
                    facility.id,
                    facility.facility_code,
                    facility.facility_name.toUpperCase(),
                    "Common Name".toUpperCase(),
                    facility.owner.facility_owner.toUpperCase(),
                    facility.facilityType.facility_type.toUpperCase(),
                    truncate(
                        facility.operationalStatus.facility_operational_status.toUpperCase(),
                        { length: 12 }
                    ),
                    facility.district.district_name.toUpperCase(),
                    moment(facility.facility_date_opened).format("MMM Do YY")
                ];
            })

        return (
            <div className="mfl-container">
                <MflDownload
                    action={this.props.downloadAction}
                    fileName="facilities"
                />
                <a
                    class="btn-flat mfl-advanced-search left"
                    onClick={e => this.props.toggleAdvancedSearch(e)}
                >
                    Advanced Search
                </a>
                {/* <ul className="collection">
                    {
                        this.props.dataSource && this.props.dataSource.map(facility => {
                            const className = facility.id % 2 === 0 ? "collection-item avatar mfl-facility-list-details" : "collection-item avatar mfl-facility-list-details grey lighten-3"
                            let operationalIcon = "lock_outline";
                            let badgeClass = "new badge";
                            switch (facility.operationalStatus.facility_operational_status) {
                                case "Closed":
                                    badgeClass = "new badge red";
                                    operationalIcon = "lock_outline";
                                    break;
                                case "Closed (Temporary)":
                                    badgeClass = "new badge deep-orange";
                                    operationalIcon = "lock_outline";
                                    break;
                                case "Functional":
                                    badgeClass = "new badge green";
                                    operationalIcon = "lock_open";
                                    break;
                                case "Pending Operation (Under construction)":
                                    badgeClass = "new badge orange";
                                    operationalIcon = "lock_outline";
                                    break;
                                case "Pending Operation (Construction Complete)":
                                    badgeClass = "new badge brown";
                                    operationalIcon = "lock_outline";
                                    break;
                                default:
                                    break;
                            }
                            return (
                                <li class={className}>
                                    <div className="circle mfl-facility-code blue">#{facility.facility_code}</div>
                                    <span className="title mfl-facility-list-title blue-text"><i class="material-icons">account_balance</i>{facility.facility_name} ({facility.common_name})</span>
                                    <p><span className="mfl-facility-list-subtitle"><i class="material-icons">local_hospital</i>
                                        {facility.owner.facility_owner} {facility.facilityType.facility_type}, {facility.district.district_name}</span> <br />
                                        <span className="mfl-facility-list-date"><i class="material-icons">date_range</i>Opened 5 September, 1990</span>
                                    </p>
                                    <a href="#!" className="secondary-content"><span className={badgeClass}>{facility.operationalStatus.facility_operational_status}</span></a>
                                </li>
                            )
                        })
                    }
                </ul> */}
                <Table
                    data={{
                        headers: tableHeaders,
                        records: tableRecords
                    }}
                />

                <Pagination />
            </div>
        );
    }
}
