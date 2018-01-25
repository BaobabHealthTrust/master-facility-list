import React, { Component } from "react";
import { connect } from "react-redux";
import SearchTag from "./SearchTag";
import removeSearchValues from "../../actions/remove-search-values";
import fetchBasicUtilityDetailsResults from "../../actions/fetch-basic-utility-details-results";

class UtilityTag extends Component {
    render() {
        return this.props
            .getObjectFromIds(
                this.props.searchValues.typeUtilityInstanceValues,
                this.props.utilities
            )
            .map(entity => {
                return (
                    <SearchTag
                        name={entity.utility_name}
                        id={entity.id}
                        actionType={"REMOVE_UTILITY_TYPE_INSTANCES"}
                        removeSearchValues={async (id, actionType) => {
                            await this.props.removeSearchValues(id, actionType);
                            await this.props.fetchBasicUtilityDetailsResults(
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
        utilities: state.facilities.utilities
    };
};

export default connect(mapStateToProps, {
    removeSearchValues,
    fetchBasicUtilityDetailsResults
})(UtilityTag);
