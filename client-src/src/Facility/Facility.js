//@flow
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { downloadFacilities } from "../actions";
import { FacilityList } from "./components";
import { Loader } from "../common";
import { Facilities } from "../types/list-types";
import styled from "styled-components";

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
    loading: true,
    containerHeight: 0
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading) this.setState({ loading: false });
  }

  componentDidMount() {
    const containerHeight = window.innerHeight - 120;
    this.setState({ containerHeight });
  }

  fetchFilteredFacilities = ids =>
    this.props.facilities.filter(facility => {
      return ids.includes(facility.id);
    });

  getDataSource = () => {
    const ids = this.props.filteredResults;
    return ids.length
      ? this.fetchFilteredFacilities(ids)
      : this.props.facilities;
  };

  getFacilityListTitle = () => {
    const ids = this.props.filteredResults;
    return ids.length
      ? "Showing Facilities from Search Results"
      : "Showing All Facilities";
  };

  _renderErrorMessage = () =>
    this.props.error.message === "Network Error" && <Loader />;

  _renderFacilityList = () =>
    this.state.isLoading ? (
      <Loader />
    ) : (
      <FacilityList
        dataSource={this.getDataSource()}
        title={this.getFacilityListTitle()}
        filter={this.props.filteredResults}
      />
    );

  render() {
    return (
      <Fragment>
        <Wrapper minHeight={this.state.containerHeight}>
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
    error: state.facilities.error,
    isLoading: state.facilities.isLoading,
    download: state.downloads.data,
    filteredResults:
      state.searchResults.advancedSearchFacilities.basicDetailsFacilities
  };
};

export default connect(
  mapStateToProps,
  { downloadFacilities }
)(FacilitiesHome);
