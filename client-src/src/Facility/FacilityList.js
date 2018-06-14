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
import { ButtonConfiguration } from '../types/helper-types';

type Props = {
  dataSource: Facilities,
  toggleAdvancedSearch: Function,
  toggleAddFacility: Function
};

export default class FacilityList extends React.Component<Props> {

  buttonConfiguration: ButtonConfiguration = [
    {
      icon: 'file_copy',
      action: () => alert('Downloading Excel...'),
      color: 'blue',
      name: 'Download CSV'
    },
    {
      icon: 'grid_on',
      action: () => alert('Downloading Excel...'),
      color: 'green',
      name: 'Download Excel'
    },
    {
      icon: 'picture_as_pdf',
      action: () => alert('Downloading Excel...'),
      color: 'red',
      name: 'Download PDF'
    }
  ]

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
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-row w-full" style={{ marginTop: 20 }}>
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
          <div style={{ marginTop: -40 }}>
            <MflDownload
              buttonConfiguration={this.buttonConfiguration}
              mainButtonConfiguration={{ color: 'teal', icon: 'file_download' }}
            />
          </div>
        </div>

        <GridTable data={tableRecords} />
      </div>
    );
  }
}
