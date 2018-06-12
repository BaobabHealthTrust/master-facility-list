//@flow
import React from "react";
import MflDownload from "../common/MflDownload";
import Table from "../common/Table";
import Pagination from "../common/Pagination";
import GridTable from "../common/GridTable";
import { truncate } from "lodash";
import moment from "moment";
import { Facilities } from '../types/list-types';
import { Link } from 'react-router-dom';

type Props = {
  dataSource: Facilities,
  downloadAction: Function,
  toggleAdvancedSearch: Function,
  toggleAddFacility: Function
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
      <div className="container">
        {/* TODO: Come back and add a buttonConfiguration for Downloads */}
        <div className="flex flex-row w-full" style={{ marginTop: 64 }}>
          <div>
            <Link
              style={{ marginTop: -80 }}
              class="btn-flat"
              to='/facilities/search'
            >
              <i class="material-icons left">search</i> Advanced Search
            </Link>
          </div>
          <div>
            {
              // TODO: Only allowed for a token whose user ID is an admin
              sessionStorage.getItem('token') && (
                <Link
                  style={{ marginTop: -80 }}
                  class="ml-4 waves-effect waves-light btn"
                  to='/facilities/add'
                >
                  <i class="material-icons left">add</i>Add NewFacility
                </Link>
              )
            }
          </div>
        </div>

        <GridTable data={tableRecords} />
      </div>
    );
  }
}
