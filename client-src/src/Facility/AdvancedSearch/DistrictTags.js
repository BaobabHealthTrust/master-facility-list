import React, { Component } from "react";
import { connect } from "react-redux";
import SearchTag from "./SearchTag";
import { fetchAdvancedSearchResults, fetchBasicDetailsResults, removeSearchValues } from "../../actions";

class DistrictTags extends Component {
  render() {
    return this.props.getObjectFromIds(
      this.props.searchValues.districtValues,
      this.props.districts
    )
      .map(entity => {
        return (
          <SearchTag
            name={entity.district_name}
            id={entity.id}
            actionType={"REMOVE_DISTRICT_VALUES"}
            removeSearchValues={async (id, actionType) => {
              await this.props.removeSearchValues(id, actionType);
              await this.props.fetchBasicDetailsResults(
                this.props.searchValues
              );
            }}
          />
        );
      });
  }
}
const mapStateToProps = state => {
  return {
    searchValues: state.advancedSearchValues,
    districts: state.dependancies.districts,
    filteredResults: state.searchResults.advancedSearchFacilities.basicDetailsFacilities,
  };
};

export default connect(mapStateToProps, {
  removeSearchValues,
  fetchBasicDetailsResults,
  fetchAdvancedSearchResults
})(DistrictTags);
