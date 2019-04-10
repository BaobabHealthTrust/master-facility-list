//@flow
import React, { Component, ReactElement, ReactNode } from "react";
import { FacilityListOptionsBar } from "./FacilityListOptionsBar";
import MflGrid from "../../common/MflGrid";
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
  className: "container"
})``;

export default class FacilityList extends React.Component<Props, State> {
  state = {
    redirectLink: null
  };

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
        <FacilityListOptionsBar filter={this.props.filter} />

        <MflGrid
          rows={tableRecords}
          columns={columns}
          pageSize={10}
          defaultSorting={defaultSorting}
          rowSelected={facility => this._redirect(facility.id)}
          title={""}
        />
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
