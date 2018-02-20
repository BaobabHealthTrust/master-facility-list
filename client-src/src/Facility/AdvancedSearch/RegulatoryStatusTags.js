import React, { Component } from "react";
import { connect } from "react-redux";
import SearchTag from "./SearchTag";
import { fetchBasicDetailsResults, removeSearchValues } from "../../actions";

class RegulatoryStatusTags extends Component {
    render() {
        return this.props
            .getObjectFromIds(
            this.props.searchValues.regulatoryStatusValues,
            this.props.regulatoryStatuses
            )
            .map(entity => {
                return (
                    <SearchTag
                        name={entity.facility_regulatory_status}
                        id={entity.id}
                        actionType={"REMOVE_REGULATORY_STATUS_VALUES"}
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
        regulatoryStatuses: state.dependancies.regulatoryStatuses
    };
};

export default connect(mapStateToProps, {
    removeSearchValues,
    fetchBasicDetailsResults
})(RegulatoryStatusTags);
