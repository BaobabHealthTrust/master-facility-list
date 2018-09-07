//@flow
import React from "react";
import { connect } from "react-redux";
import SearchModal from "./SearchModal";
import { AddFacilityHome } from "./AddFacility";
import {
  hideSearchContainer,
  downloadFacilities,
} from "../actions";
import SecondaryMenu from "../common/SecondaryMenu";
import FacilityList from "./FacilityList";
import footerResizer from "../helpers/footerResize";
import { ProgressBar, ShowError, FetchAllDependancies, FacilityFilters } from '../common'
import { Facilities } from '../types/list-types'
import { Route, Switch } from 'react-router-dom';

type Props = {
  isLoading: boolean,
  error: any,
  searchResults: Facilities,
  facilities: Facilities,
  downloadFacilities: Function
}

type State = {
  isAdvancedSearch: boolean,
  isShowSearchResults: boolean,
  isAddFacility: boolean,
}

class FacilitiesHome extends React.Component<Props, State> {
  state = {
    isAdvancedSearch: false,
    isShowSearchResults: false
  };

  fetchFilteredFacilities = (ids) => this.props.facilities.filter(facility => {
    return ids.includes(facility.id)
  })

  getDataSource = () => {
    const ids = this.props.filteredResults
    return ids.length
      ? this.fetchFilteredFacilities(ids)
      : this.props.facilities
  }

  getFacilityListTitle = () => {
    const ids = this.props.filteredResults
    return ids.length ? "Showing Facilities from Search Results" : "Showing All Facilities"
  }

  render() {
    const isShowFacilityList = !(this.state.isAddFacility || this.state.isAdvancedSearch || this.state.isShowSearchResults)
    const isLoadingOrError = this.props.isLoading || this.props.isError
    return (
      <div>
        <FetchAllDependancies />
        <div className="container mfl-container">
          <br />
          {/* Show Progress Bar */}
          {this.props.error.message == "Network Error" && <ProgressBar />}

          {/* Show Error Message */}
          {
            this.props.isLoading
              ? <ProgressBar />
              : <FacilityList dataSource={this.getDataSource()} title={this.getFacilityListTitle()} />
          }
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    facilities: state.facilities.list.data,
    error: state.facilities.error,
    isLoading: state.facilities.isLoading,
    download: state.downloads.data,
    filteredResults:
      state.searchResults.advancedSearchFacilities.basicDetailsFacilities
  };
};

export default connect(mapStateToProps, {
  downloadFacilities,
})(FacilitiesHome);
