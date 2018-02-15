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
                    facility.common_name,
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
