import React, { Component } from "react";
import { connect } from "react-redux";
import SearchTag from "./SearchTag";
import removeSearchValues from "../../actions/remove-search-values";
import fetchBasicDetailsResults from "../../actions/fetch-basic-details-results";

class OperationalStatusTag extends Component {
    render() {
        return this.props
            .getObjectFromIds(
                this.props.searchValues.operationalStatusValues,
                this.props.operationalStatuses
            )
            .map(entity => {
                return (
                    <SearchTag
                        name={entity.facility_operational_status}
                        id={entity.id}
                        actionType={"REMOVE_OPERATIONAL_STATUS_VALUES"}
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
        operationalStatuses: state.dependancies.operationalStatuses
    };
};

export default connect(mapStateToProps, {
    removeSearchValues,
    fetchBasicDetailsResults
})(OperationalStatusTag);
