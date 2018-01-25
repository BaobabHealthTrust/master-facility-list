import React, { Component } from "react";
import { connect } from "react-redux";
import SearchTag from "./SearchTag";
import removeSearchValues from "../../actions/remove-search-values";
import fetchBasicDetailsResults from "../../actions/fetch-basic-details-results";

class DistrictTag extends Component {
    render() {
        return this.props
            .getObjectFromIds(
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
        districts: state.dependancies.districts
    };
};

export default connect(mapStateToProps, {
    removeSearchValues,
    fetchBasicDetailsResults
})(DistrictTag);
