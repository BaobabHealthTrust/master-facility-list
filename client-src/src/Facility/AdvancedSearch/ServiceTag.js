import React, { Component } from "react";
import { connect } from "react-redux";
import SearchTag from "./SearchTag";
import removeSearchValues from "../../actions/remove-search-values";
import fetchBasicServiceDetailsResults from "../../actions/fetch-basic-service-details-results";

class ServiceTag extends Component {
    render() {
        return this.props
            .getObjectFromIds(
                this.props.searchValues.typeServiceInstanceValues,
                this.props.services
            )
            .map(entity => {
                return (
                    <SearchTag
                        name={entity.service_name}
                        id={entity.id}
                        actionType={"REMOVE_SERVICE_TYPE_INSTANCES"}
                        removeSearchValues={async (id, actionType) => {
                            await this.props.removeSearchValues(id, actionType);
                            await this.props.fetchBasicServiceDetailsResults(
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
        services: state.facilities.services
    };
};

export default connect(mapStateToProps, {
    removeSearchValues,
    fetchBasicServiceDetailsResults
})(ServiceTag);
