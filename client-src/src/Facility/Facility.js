//@flow
import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  downloadFacilities,
  fetchFacilities,
  fetchAdvancedSearchResults,
  filterFacilities,
  filterFacilitiesByResources,
  filterFacilitiesByUtilities,
  filterFacilitiesByServices
} from "../actions";
import { FacilityList } from "./components";
import { Loader } from "../common";
import { Progress } from "../common/Progress";
import { Facilities } from "../types/list-types";
import styled from "styled-components";
import { map, intersection, slice, flattenDeep, uniq } from "lodash";

type Props = {
  isLoading: boolean,
  error: any,
  searchResults: Facilities,
  facilities: Facilities,
  downloadFacilities: Function
};

type State = {
  isAdvancedSearch: boolean,
  isShowSearchResults: boolean,
  isAddFacility: boolean
};

const Wrapper = styled.div.attrs({ className: "container  mfl-container" })``;

class FacilitiesHome extends React.Component<Props, State> {
  state = {
    isAdvancedSearch: false,
    isShowSearchResults: false,
    loading: false,
    containerHeight: 0
  };

  isLoading = () => {
    for (let dependancyStateId in this.props.loading) {
      if (this.props.loading[dependancyStateId] == true) return true;
    }
    return false;
  };

  isAdvancedSearch = () => {
    for (let searchGroupIndex in this.props.filteredResults
      .advancedSearchFacilities) {
      if (
        this.props.filteredResults.advancedSearchFacilities[searchGroupIndex]
          .length > 0
      )
        return true;
    }
    return false;
  };

  isLoadingAdvanced = () => {
    const loading = this.props.loading;
    return (
      loading.fetchAdvancedSearchBasic ||
      loading.fetchFacilityByResources ||
      loading.fetchFacilityByUtilities ||
      loading.fetchFacilityByServices
    );
  };

  getFilterValues = (type = "all") => {
    if (type == "all") return this.props.filterValues;
    else
      return this.props.filterValues.filter(
        filterValue => filterValue.type == type
      );
  };

  getFilterResults = (filterIndex, type, searchGroups) => {
    let filterValues = this.getFilterValues(type);
    if (filterValues.length == 0) {
      return [searchGroups.basicDetailsFacilities];
    }
    return filterValues.map(filter => {
      if (
        searchGroups[filterIndex][filter.id] == null ||
        typeof searchGroups[filterIndex][filter.id] === "undefined"
      )
        return [];

      return searchGroups[filterIndex][filter.id];
    });
  };

  filterFacilities = () => {
    if (this.isLoadingAdvanced()) return;

    this.props.filterFacilities(this.props.filterValues);
    this.props.filterFacilitiesByResources(this.props.filterValues);
    this.props.filterFacilitiesByUtilities(this.props.filterValues);
    this.props.filterFacilitiesByServices(this.props.filterValues);
  };

  fetchFacilities = () => {
    if (this.isAdvancedSearch()) {
      const searchGroups = this.props.filteredResults.advancedSearchFacilities;
      const resourcesFilter = this.getFilterResults(
        "basicDetailsFacilityResources",
        "resources",
        searchGroups
      );
      const utilitiesFilter = this.getFilterResults(
        "basicDetailsFacilityUtilities",
        "utilities",
        searchGroups
      );

      const servicesFilter = this.getFilterResults(
        "basicDetailsFacilityServices",
        "services",
        searchGroups
      );

      const facilityIds = intersection(
        searchGroups.basicDetailsFacilities,
        groupIntersect(resourcesFilter),
        groupIntersect(utilitiesFilter),
        groupIntersect(servicesFilter)
      );

      return this.props.facilities.filter(facility => {
        return facilityIds.includes(facility.id);
      });
    }
    return this.props.facilities;
  };

  getDataSource = () => {
    return this.isAdvancedSearch()
      ? this.props.filteredResults.advancedSearchResults
      : this.props.facilities;
  };

  getFacilityListTitle = () => {
    return this.props.filterValues.length > 0
      ? "Showing Facilities from Search Results"
      : "Showing All Facilities";
  };

  _renderErrorMessage = () =>
    this.props.error.message === "Network Error" && <Loader />;

  _renderFacilityList = () => {
    const facilities = this.props.facilities ? this.fetchFacilities() : [];
    return (
      <React.Fragment>
        <FacilityList
          onFilter={() => {
            this.filterFacilities();
          }}
          dataSource={facilities}
          title={this.getFacilityListTitle()}
          filter={facilities}
        />
      </React.Fragment>
    );
  };

  render() {
    return (
      <Fragment>
        <Wrapper>
          <br />
          {this._renderErrorMessage()}

          {this._renderFacilityList()}
        </Wrapper>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    facilities: state.facilities.all.data,
    resources: state.facilities.resources,
    utilities: state.facilities.utilities,
    utilityTypes: state.dependancies.utilityTypes,
    services: state.facilities.services,
    serviceTypes: state.dependancies.serviceTypes,
    error: state.facilities.error,
    loading: state.statusErrors,
    download: state.downloads.data,
    filteredResults: state.searchResults,
    filterValues: state.advancedSearchValues.all
  };
};

export default connect(
  mapStateToProps,
  {
    downloadFacilities,
    fetchFacilities,
    fetchAdvancedSearchResults,
    filterFacilities,
    filterFacilitiesByResources,
    filterFacilitiesByUtilities,
    filterFacilitiesByServices
  }
)(FacilitiesHome);

const groupIntersect = val => {
  const mapped = val.filter(value => value != null);

  if (mapped.length <= 1) {
    if (mapped.length == 0) return [];
    return mapped[0];
  }

  return intersection(
    mapped[0],
    groupIntersect(slice(mapped, 1, mapped.length))
  );
};
