//@flow
import React from "react";
import MflDownload from "../common/MflDownload";
import Table from "../common/Table";
import Pagination from "../common/Pagination";
import GridTable from "../common/GridTable";
import { truncate } from "lodash";
import moment from "moment";
import type {
    Owner,
    FacilityType,
    OperationalStatus,
    District
} from "./types/model-types";

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
        facility_date_opened: string
    }>,
    downloadAction: Function,
    toggleAdvancedSearch: Function
};
export default class FacilityList extends React.Component<Props> {
    render() {
        const tableRecords =
            this.props.dataSource &&
            this.props.dataSource.map(facility => {
                return {
                    id: facility.id,
                    code: facility.facility_code,
                    name: facility.facility_name.toUpperCase(),
                    commonname: facility.common_name,
                    ownership: facility.owner.facility_owner.toUpperCase(),
                    type: facility.facilityType.facility_type.toUpperCase(),
                    status: truncate(
                        facility.operationalStatus.facility_operational_status.toUpperCase(),
                        { length: 12 }
                    ),
                    district: facility.district.district_name.toUpperCase(),
                    dateopened: moment(facility.facility_date_opened).format(
                        "MMM Do YY"
                    )
                };
            });

        return (
            <div className="mfl-container">
                <MflDownload
                    action={this.props.downloadAction}
                    fileName="facilities"
                />
                <div className="row">
                    <div className="col s4 m4 l4">
                        <a
                            class="btn-flat mfl-advanced-search left"
                            onClick={e => this.props.toggleAdvancedSearch(e)}
                        >
                            Advanced Search
                        </a>
                    </div>
                    <div className="col s4 m4 l4">
                        <a
                            class="btn-flat mfl-add-facility "
                            // onClick={e => this.props.toggleAdvancedSearch(e)}
                        >
                            Add New Facility
                        </a>
                    </div>
                </div>

                {/* <Table
                    data={{
                        headers: tableHeaders,
                        records: tableRecords
                    }}
                /> */}
                <GridTable data={tableRecords} />

                <Pagination />
            </div>
        );
    }
}
