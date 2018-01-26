import React, { Component } from "react";
import { connect } from "react-redux";
import SearchTag from "./SearchTag";
import removeSearchValues from "../../actions/remove-search-values";
import fetchBasicDetailsResults from "../../actions/fetch-basic-details-results";

class FacilityTypeTags extends Component {
    render() {
        return this.props
            .getObjectFromIds(
                this.props.searchValues.facilityTypeValues,
                this.props.facilityTypes
            )
            .map(entity => {
                return (
                    <SearchTag
                        name={entity.facility_type}
                        id={entity.id}
                        actionType={"REMOVE_FACILITY_TYPE_VALUES"}
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
        facilityTypes: state.dependancies.facilityTypes
    };
};

export default connect(mapStateToProps, {
    removeSearchValues,
    fetchBasicDetailsResults
})(FacilityTypeTags);
