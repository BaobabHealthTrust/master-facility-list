//@flow
import React, { Component, ReactElement, ReactNode } from "react";
import { MFLRevealButton } from "../../common";
import MflGrid from "../../common/MflGrid";
import { Facilities } from "../../types/list-types";
import { Link } from "react-router-dom";
import { ButtonConfiguration } from "../../types/helper-types";
import settings from "../../settings";
import { Card } from "react-materialize";
import { Redirect } from "react-router-dom";
import { HumanReadableFacility } from "../../types/model-types";
import styled from "styled-components";

type Props = {
  dataSource: Array<HumanReadableFacility>,
  title: string,
  filter: Array<number>
};

type State = {
  redirectLink: ?string
};

type whereClause = {
  id?: {
    inq?: Array<any>
  }
};

type MFLGridColumn = {
  name: string,
  title: string
};

type MFLGridSorting = {
  columnName: string,
  direction: ?string
};

const facilitiesGridColumns = [
  { name: "code", title: "CODE" },
  { name: "name", title: "NAME" },
  { name: "common", title: "COMMON NAME" },
  { name: "ownership", title: "OWNERSHIP" },
  { name: "type", title: "TYPE" },
  { name: "status", title: "STATUS" },
  { name: "district", title: "DISTRICT" },
  { name: "dateOpened", title: "DATE OPENED" }
];

const facilitiesGridSorting = [{ columnName: "name", direction: "asc" }];

const LandingPageWrapper = styled.div.attrs({
  className: "container facility-container"
})``;

const RevealButtonWrapper = styled.div.attrs({
  className: "hide-on-med-and-down"
})`
  margin-top: -10px;
`;
export default class FacilityList extends React.Component<Props, State> {
  state = {
    redirectLink: null
  };

  buttonConfiguration: ButtonConfiguration = [
    {
      icon: "file_copy",
      action: () => this._downloadFileIn("csv"),
      color: "blue",
      name: "Download CSV"
    },
    {
      icon: "grid_on",
      action: () => this._downloadFileIn("excel"),
      color: "green",
      name: "Download Excel"
    },
    {
      icon: "picture_as_pdf",
      action: () => this._downloadFileIn("pdf"),
      color: "red",
      name: "Download PDF"
    }
  ];

  _getWhereClause(): whereClause {
    const { filter } = this.props;
    return filter.length ? { id: { inq: filter } } : {};
  }

  _renderAddFacilityButton(): ReactElement<Link> {
    return (
      <Link className="ml-4 waves-effect waves-light btn" to="/facilities/add">
        <i class="material-icons left">add</i>Add NewFacility
      </Link>
    );
  }

  _downloadFileIn(format: string): VoidFunction {
    return window.open(
      `${settings.hostname}/api/facilities/download?data=` +
        JSON.stringify({
          where: this._getWhereClause(),
          format
        })
    );
  }

  _isAdmin(): Boolean {
    return sessionStorage.getItem("token");
  }

  _renderAdvancedSearchButton(): ReactElement<Link> {
    return (
      <Link className="btn-flat" to="/facilities/search">
        <i className="material-icons left">search</i>
        <span>Advanced Search</span>
      </Link>
    );
  }

  _redirect(facilityId): VoidFunction {
    this.setState({
      redirectLink: `/facilities/${facilityId}/summary`
    });
  }

  _renderFacilitiesLandingPage(
    tableRecords: Array<HumanReadableFacility>,
    columns: Array<MFLGridColumn>,
    defaultSorting: Array<MFLGridSorting>
  ): ReactElement<LandingPageWrapper> {
    return (
      <LandingPageWrapper>
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-row">
            {this._renderAdvancedSearchButton()}
            <div className="hide-on-small-only">
              {this._isAdmin() && this._renderAddFacilityButton()}
            </div>
          </div>
          <RevealButtonWrapper>
            <MFLRevealButton
              buttonConfiguration={this.buttonConfiguration}
              mainButtonConfiguration={{ color: "teal", icon: "file_download" }}
            />
          </RevealButtonWrapper>
        </div>

        <Card>
          <MflGrid
            rows={tableRecords}
            columns={columns}
            pageSize={10}
            defaultSorting={defaultSorting}
            rowSelected={facility => this._redirect(facility.id)}
            title={this.props.title}
          />
        </Card>
      </LandingPageWrapper>
    );
  }

  render() {
    const tableRecords = this.props.dataSource || [];
    const columns: Array<MFLGridColumn> = facilitiesGridColumns;
    const defaultSorting: Array<MFLGridSorting> = facilitiesGridSorting;

    let display: ReactNode;

    this.state.redirectLink
      ? (display = <Redirect to={this.state.redirectLink} />)
      : (display = this._renderFacilitiesLandingPage(
          tableRecords,
          columns,
          defaultSorting
        ));

    return <React.Fragment>{display}</React.Fragment>;
  }
}
