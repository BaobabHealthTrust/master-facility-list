//@flow
import React, { Component, ReactElement, ReactNode } from "react";
import { FacilityListOptionsBar } from "./FacilityListOptionsBar";
import MflGrid from "../../common/MflGrid";
import classNames from "classnames";
import SearchDrawer from "./Search/SearchDrawer";
import { Redirect } from "react-router-dom";
import { HumanReadableFacility } from "../../types/model-types";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";
import { connect } from "react-redux";
import {
  addSearchValues,
  removeSearchValues,
  toggleAdvancedSearch
} from "../../actions";
import { Loader } from "../../common";
import { Progress } from "../../common/Progress";
import { isEqual } from "lodash";
import { Paper } from "@material-ui/core";
import SearchChips from "./Search/SearchChipsContainer";
import MobileView from "../components/FacilityMobileList";

const drawerWidth = 320;

const styles = theme => ({
  content: {
    flexGrow: 1,
    paddingLeft: drawerWidth,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

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

const LandingPageWrapper = styled.div.attrs({})`
  @media screen and (min-width: 1400px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const TableContainer = styled.div.attrs({
  className: "container"
})``;

class FacilityList extends React.Component<Props, State> {
  state = {
    redirectLink: null,
    filterOptions: []
  };

  searchTypes = { district: "ADD_DISTRICT_VALUES" };

  componentDidMount() {
    this.setState({
      filterOptions: this.props.filterValues
    });
    this.props.onFilter();
  }

  isLoading = () => {
    const loading = this.props.isLoading;
    if (
      loading.fetchAdvancedSearchBasic ||
      loading.fetchFacilityByResources ||
      loading.fetchFacilityByUtilities ||
      loading.fetchFacilityByServices
    )
      return true;

    return false;
  };

  updateFilterOptions = filterOptions => {
    this.props.onFilterUpdate(filterOptions);
  };

  onAddFilter = val => {
    const { type, id } = val;
    const isRange = val.range;
    if (id == -1) {
      let filterOptions =
        type == "utilities" || type == "services"
          ? this.state.filterOptions.filter(
              option =>
                option.type != type ||
                (option.type == type && !val.options.includes(option.id))
            )
          : this.state.filterOptions.filter(option => option.type != type);

      let filterOptionsToRemove =
        type == "utilities" || type == "services"
          ? this.state.filterOptions.filter(
              option => option.type == type && val.options.includes(option.id)
            )
          : this.state.filterOptions.filter(option => option.type == type);

      for (let valueForType of filterOptionsToRemove) {
        this.props.removeSearchValues(
          valueForType,
          "REMOVE_ADVANCED_SEARCH_VALUE"
        );
      }
      this.setState({
        filterOptions
      });
      this.props.onFilter();
      return;
    }

    const entryCount = this.state.filterOptions.filter(
      option => option.type == type && Number(option.id) == Number(id)
    ).length;

    if (entryCount == 0 || isRange) {
      if (isRange) {
        let filterOption = this.state.filterOptions.filter(
          option => option.type == type && Number(option.id) == Number(id)
        );
        if (filterOption.length > 0) this.onRemoveFilter(filterOption[0]);
      }

      const filterOptions = this.state.filterOptions;

      filterOptions.push(val);

      this.setState({
        filterOptions
      });
      this.props.addSearchValues(val, "ADD_ADVANCED_SEARCH_VALUE");
    }
    this.props.onFilter();
  };

  onClearFilter = () => {
    this.setState({
      filterOptions: []
    });
    this.props.removeSearchValues(null, "REMOVE_ALL_SEARCH_VALUES");
  };

  onRemoveFilter = val => {
    const { type, id } = val;
    const filterOptions = this.state.filterOptions;

    _.remove(
      filterOptions,
      option => option.type == type && Number(option.id) == Number(id)
    );

    this.setState({
      filterOptions
    });

    this.props.removeSearchValues(val, "REMOVE_ADVANCED_SEARCH_VALUE");

    if (this.state.filterOptions == 0) {
      this.props.removeSearchValues(null, "REMOVE_ALL_SEARCH_VALUES");
      return;
    }
    this.props.onFilter();
  };

  toggleSearchDrawer = () => {
    this.props.toggleAdvancedSearch();
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
    const { classes, theme } = this.props;
    return (
      <React.Fragment>
        <LandingPageWrapper
          className={classNames(classes.content, {
            [classes.contentShift]: this.props.drawerOpen
          })}
        >
          <TableContainer>
            <FacilityListOptionsBar
              filterOptions={this.props.filterValues}
              onClick={() => {
                this.toggleSearchDrawer();
              }}
              open={this.props.drawerOpen}
              filter={this.props.filter}
            />
            {this.props.filterValues.length > 0 && (
              <Paper>
                <SearchChips
                  filterOptions={this.props.filterValues}
                  onRemoveFilter={values => this.onRemoveFilter(values)}
                />
              </Paper>
            )}
            <SearchDrawer
              className="hide-on-small-only"
              filterOptions={this.props.filterValues}
              onAddFilter={values => this.onAddFilter(values)}
              onRemoveFilter={values => this.onRemoveFilter(values)}
              onFilter={() => this.props.onFilter()}
              onClearFilter={() => this.onClearFilter()}
              open={this.props.drawerOpen}
              width={drawerWidth}
            />
            {this.isLoading() ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  minHeight: "700px"
                }}
              >
                <Progress />
              </div>
            ) : (
              <div>
                <div className="hide-on-small-only">
                  <MflGrid
                    isLoading={true}
                    rows={tableRecords}
                    columns={columns}
                    pageSize={10}
                    defaultSorting={defaultSorting}
                    rowSelected={facility => this._redirect(facility.id)}
                    title={this.props.title}
                  />
                </div>
                <div className="hide-on-med-and-up">
                  <MobileView
                    facilities={tableRecords}
                    onClick={facility => this._redirect(facility.id)}
                  />
                </div>
              </div>
            )}
          </TableContainer>
        </LandingPageWrapper>
      </React.Fragment>
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

const mapStateToProps = state => {
  return {
    filterValues: state.advancedSearchValues.all,
    isLoading: state.statusErrors.isLoading,
    error: state.statusErrors.errors,
    drawerOpen: state.ui.advancedSearchOpen
  };
};

export default connect(
  mapStateToProps,
  { addSearchValues, removeSearchValues, toggleAdvancedSearch }
)(withStyles(styles, { withTheme: true })(FacilityList));
