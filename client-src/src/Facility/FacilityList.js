//@flow
import React from "react";
import MflDownload from "../common/MflDownload";
import Table from "../common/Table";
import Pagination from "../common/Pagination";
import GridTable from "../common/GridTable";
import MflGrid from '../common/MflGrid';
import { truncate } from "lodash";
import moment from "moment";
import { Facilities } from '../types/list-types';
import { Link } from 'react-router-dom';
import { ButtonConfiguration } from '../types/helper-types';
import settings from '../settings';
import { Card } from "react-materialize";
import { Redirect } from 'react-router-dom';

type Props = {
  dataSource: Facilities,
  title: string,
  toggleAdvancedSearch: Function,
  toggleAddFacility: Function
};

export default class FacilityList extends React.Component<Props> {

  state = {
    redirectLink: null
  }

  buttonConfiguration: ButtonConfiguration = [
    {
      icon: 'file_copy',
      action: () => window.open(
        `${settings.hostname}/api/facilities/download?data=` + JSON.stringify({
          "where": {},
          "format": "csv"
        })
      ),
      color: 'blue',
      name: 'Download CSV'
    },
    {
      icon: 'grid_on',
      action: () => window.open(
        `${settings.hostname}/api/facilities/download?data=` + JSON.stringify({
          "where": {},
          "format": "excel"
        })
      ),
      color: 'green',
      name: 'Download Excel'
    },
    {
      icon: 'picture_as_pdf',
      action: () => window.open(
        `${settings.hostname}/api/facilities/download?data=` + JSON.stringify({
          "where": {},
          "format": "pdf"
        })
      ),
      color: 'red',
      name: 'Download PDF'
    }
  ]

  redirect = facilityId => {
    this.setState({
      redirectLink: `/facilities/${facilityId}/summary`
    })
  }

  render() {
    const tableRecords = this.props.dataSource || []


    const columns = [
      { name: 'code', title: 'CODE' },
      { name: 'name', title: 'NAME' },
      { name: 'common', title: 'COMMON NAME' },
      { name: 'ownership', title: 'OWNERSHIP' },
      { name: 'type', title: 'TYPE' },
      { name: 'status', title: 'STATUS' },
      { name: 'district', title: 'DISTRICT' },
      { name: 'dateOpened', title: 'DATE OPENED' },
    ]

    const defaultSorting = [{ columnName: 'name', direction: 'asc' }];

    const defaultView = (
      <div className="container">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-row">
            <div>
              <Link
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
                    class="ml-4 waves-effect waves-light btn"
                    to='/facilities/add'
                  >
                    <i class="material-icons left">add</i>Add NewFacility
                </Link>
                )
              }
            </div>
          </div>
          <div style={{ marginTop: -10 }}>
            <MflDownload
              buttonConfiguration={this.buttonConfiguration}
              mainButtonConfiguration={{ color: 'teal', icon: 'file_download' }}
            />
          </div>
        </div>

        {/* <GridTable data={tableRecords} /> */}
        <Card>
          <MflGrid
            rows={tableRecords}
            columns={columns}
            pageSize={10}
            defaultSorting={defaultSorting}
            rowSelected={facility => this.redirect(facility.id)}
            title={this.props.title}
          />
        </Card>
      </div>
    )

    return (
      <React.Fragment>
        {this.state.redirectLink ? <Redirect to={this.state.redirectLink} /> : defaultView}
      </React.Fragment>
    );
  }
}
