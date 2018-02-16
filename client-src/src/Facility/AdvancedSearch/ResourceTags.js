import React, { Component } from "react";
import { connect } from "react-redux";
import SearchTag from "./SearchTag";
import removeSearchValues from "../../actions/remove-search-values";
import { fetchBasicResourceDetailsResults } from "../../actions/actionsIndex";

class ResourceTags extends Component {
    render() {
        return this.props
            .getObjectFromIds(
            this.props.searchValues.typeResourceInstanceValues,
            this.props.resources
            )
            .map(entity => {
                return (
                    <SearchTag
                        name={entity.resource_name}
                        id={entity.id}
                        actionType={"REMOVE_RESOURCE_TYPE_INSTANCES"}
                        removeSearchValues={async (id, actionType) => {
                            await this.props.removeSearchValues(id, actionType);
                            await this.props.fetchBasicResourceDetailsResults(
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
        resources: state.facilities.resources
    };
};

export default connect(mapStateToProps, {
    removeSearchValues,
    fetchBasicResourceDetailsResults
})(ResourceTags);
