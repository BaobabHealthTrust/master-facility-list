import React, { Component } from "react";
import { connect } from "react-redux";
import SearchTag from "./SearchTag";
import { fetchBasicDetailsResults, removeSearchValues } from "../../actions";


class FacilityOwnerTags extends Component {
    render() {
        return this.props
            .getObjectFromIds(
            this.props.searchValues.facilityOwnerValues,
            this.props.facilityOwners
            )
            .map(entity => {
                return (
                    <SearchTag
                        name={entity.facility_owner}
                        id={entity.id}
                        actionType={"REMOVE_FACILITY_OWNER_VALUES"}
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
        facilityOwners: state.dependancies.facilityOwners
    };
};

export default connect(mapStateToProps, {
    removeSearchValues,
    fetchBasicDetailsResults
})(FacilityOwnerTags);
