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
  isError: boolean,
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

  componentWillReceiveProps(props) {
    if (props.searchResults.length > 0) {
      this.setState(prevState => {
        prevState.isShowSearchResults = true;
      });
    } else {
      this.setState(prevState => {
        prevState.isShowSearchResults = false;
      });
    }

    const isShowSearchResults = this.state.isShowSearchResults;

    footerResizer();
  }

  handleClose = () => { this.setState({ isAdvancedSearch: false }); }

  toggleAdvancedSearch = () => {
    this.setState({ isAdvancedSearch: true, isShowSearchResults: false });
    footerResizer();
  }

  toggleAddFacility = () => {
    this.setState({ isAddFacility: true });
    footerResizer();
  }

  handleCancelAddFacility = () => {
    this.setState({ isAddFacility: false });
    footerResizer();
  }

  render() {
    const isShowFacilityList = !(this.state.isAddFacility || this.state.isAdvancedSearch || this.state.isShowSearchResults)
    const isLoadingOrError = this.props.isLoading || this.props.isError
    return (
      <div>
        <FetchAllDependancies />

        {/* Only show filters when Faclity List is showing */}
        {
          // !(this.state.isAddFacility || this.state.isAdvancedSearch) &&
          // <FacilityFilters
          //   url="/facilities"
          //   isFilteredResults={true}
          // />
        }

        <div className="container mfl-container">
          <br />
          {/* Show Progress Bar */}
          {this.props.isLoading && <ProgressBar />}

          {/* Show Error Message */}
          {this.props.isError && <ShowError />}

          {/* {
            (!isLoadingOrError && this.state.isAdvancedSearch)
            && (
              <SearchModal
                handleClose={this.handleClose}
              />
            )
          } */}

          <FacilityList
            downloadAction={this.props.downloadFacilities}
            dataSource={this.props.facilities}
            toggleAdvancedSearch={this.toggleAdvancedSearch}
            toggleAddFacility={this.toggleAddFacility}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    facilities: state.facilities.list,
    isError: state.facilities.isNetworkError,
    isLoading: state.facilities.isLoading,
    download: state.downloads.data,
    searchResults: state.searchResults.advancedSearchResults,
    filteredResults:
      state.searchResults.advancedSearchFacilities.basicDetailsFacilities
  };
};

export default connect(mapStateToProps, {
  downloadFacilities,
})(FacilitiesHome);
