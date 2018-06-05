//@flow
import React from "react";
import MflDownload from "../common/MflDownload";
import Table from "../common/Table";
import Pagination from "../common/Pagination";
import GridTable from "../common/GridTable";
import { truncate } from "lodash";
import moment from "moment";
import { Facilities } from '../types/list-types'

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
        <MflDownload
          action={this.props.downloadAction}
          fileName="facilities"
        />
        <div className="flex flex-row w-full">
          <div>
            <a
              style={{ marginTop: -80 }}
              class="btn-flat"
              onClick={e => this.props.toggleAdvancedSearch(e)}
            >Advanced Search</a>
          </div>
          <div>
            {
              sessionStorage.getItem('token') && (
                <a
                  style={{ marginTop: -80 }}
                  class="ml-4 waves-effect waves-light btn"
                  onClick={e => this.props.toggleAddFacility(e)}
                >
                  <i class="material-icons left">add</i>Add NewFacility
                </a>
              )
            }
          </div>
          {/* <div className="col s4 m4 l4 mfl-tm-2">
            {sessionStorage.getItem('token') && (
              <a
                class="waves-effect waves-light btn"
                onClick={e => this.props.toggleAddFacility(e)}
              >
                <i class="material-icons left">add</i>Add NewFacility
              </a>
            )}
          </div> */}
        </div>

        <GridTable data={tableRecords} />
      </div>
    );
  }
}
