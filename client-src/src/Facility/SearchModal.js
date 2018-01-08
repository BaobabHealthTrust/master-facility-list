import React, { Component } from "react";
import { Tabs, Tab } from "react-materialize";
import AdvancedLocation from "./AdvancedSearch/AdvancedLocation";
import { connect } from "react-redux";
import addSearchValues from "../actions/add-search-values";
import removeSearchValues from "../actions/remove-search-values";
import fetchBasicDetailsResults from "../actions/fetch-basic-details-results";
import { remove, pull } from "lodash";
import SearchTag from "./AdvancedSearch/SearchTag";
import { map, intersection } from "lodash";
import AdvancedOwnershipRegulation from "./AdvancedSearch/AdvancedOwnershipRegulation";

class SearchModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "Location"
        };
    }

    getObjectFromIds(ids, entities) {
        return entities.filter(e => ids.includes(e.id.toString()));
    }

    async handleAddSearchValue(e, type) {
        await this.props.addSearchValues(e, type);
    }

    render() {
        return (
            <div id="advanced-search" ref="advancedSearch" class="modal-lg">
                <div class="modal-content">
                    <div className="mfl-bm-2">
                        <span className="mfl-modal-header">
                            Advanced Search
                        </span>
                        <span className="mfl-modal-close right">
                            <a
                                href="#!"
                                onClick={e => this.props.handleClose(e)}
                            >
                                <i class="material-icons">close</i>
                            </a>
                        </span>
                    </div>

                    <span>
                        {this.props.results.length} Facilities Match Your
                        Criteria
                    </span>
                    {this.props.results.length > 0 ? (
                        <span className="right">Get Search Results</span>
                    ) : (
                        ""
                    )}

                    <Tabs
                        className="tab-demo z-depth-1 blue text-white"
                        onChange={(t, v) =>
                            this.setState({ activeTab: v.target.text })
                        }
                    >
                        <Tab
                            title="Location"
                            className="advanced-search-container"
                            active
                        >
                            {this.state.activeTab === "Location" ? (
                                <AdvancedLocation
                                    districts={this.props.districts}
                                    handleChange={async (e, type) => {
                                        await this.props.addSearchValues(
                                            e,
                                            type
                                        );
                                        await this.props.fetchBasicDetailsResults(
                                            this.props.searchValues
                                        );
                                    }}
                                />
                            ) : (
                                ""
                            )}
                        </Tab>
                        <Tab
                            title="Ownership and Regulation"
                            className="advanced-search-container"
                            active
                        >
                            {this.state.activeTab ===
                            "Ownership and Regulation" ? (
                                <AdvancedOwnershipRegulation
                                    operationalStatuses={
                                        this.props.operationalStatuses
                                    }
                                    handleChange={async (e, type) => {
                                        await this.props.addSearchValues(
                                            e,
                                            type
                                        );
                                        await this.props.fetchBasicDetailsResults(
                                            this.props.searchValues
                                        );
                                    }}
                                />
                            ) : (
                                ""
                            )}
                        </Tab>
                        <Tab title="Services">Test 3</Tab>
                        <Tab title="Resources">Test 4</Tab>
                    </Tabs>
                </div>
                <div class="modal-footer">
                    <div className="advanced-search-tag-container">
                        {/* DISPLAY TAGS FOR DISTRICT VALUES */}
                        {this.getObjectFromIds(
                            this.props.searchValues.districtValues,
                            this.props.districts
                        ).map(entity => {
                            return (
                                <SearchTag
                                    name={entity.district_name}
                                    id={entity.id}
                                    actionType={"REMOVE_DISTRICT_VALUES"}
                                    removeSearchValues={async (
                                        id,
                                        actionType
                                    ) => {
                                        await this.props.removeSearchValues(
                                            id,
                                            actionType
                                        );
                                        await this.props.fetchBasicDetailsResults(
                                            this.props.searchValues
                                        );
                                    }}
                                />
                            );
                        })}

                        {/* DISPLAY TAGS FOR OPERATIOANAL STATUS VALUES */}
                        {this.getObjectFromIds(
                            this.props.searchValues.operationalStatusValues,
                            this.props.operationalStatuses
                        ).map(entity => {
                            return (
                                <SearchTag
                                    name={entity.facility_operational_status}
                                    id={entity.id}
                                    actionType={"REMOVE_DISTRICT_VALUES"}
                                    removeSearchValues={async (
                                        id,
                                        actionType
                                    ) => {
                                        await this.props.removeSearchValues(
                                            id,
                                            actionType
                                        );
                                        await this.props.fetchBasicDetailsResults(
                                            this.prop.searchValues
                                        );
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        searchValues: state.advancedSearchValues,
        districts: state.dependancies.districts,
        operationalStatuses: state.dependancies.operationalStatuses,
        results: intersection(
            map(state.searchResults.advancedSearchFacilities)
        )[0]
    };
};

export default connect(mapStateToProps, {
    addSearchValues,
    removeSearchValues,
    fetchBasicDetailsResults
})(SearchModal);
