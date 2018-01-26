import React, { Component } from "react";
import { Tabs, Tab } from "react-materialize";
import AdvancedLocation from "./AdvancedSearch/AdvancedLocation";
import { connect } from "react-redux";
import addSearchValues from "../actions/add-search-values";
import removeSearchValues from "../actions/remove-search-values";
import fetchBasicDetailsResults from "../actions/fetch-basic-details-results";
import fetchBasicResourceDetailsResults from "../actions/fetch-basic-resource-details-results";
import fetchBasicUtilityDetailsResults from "../actions/fetch-basic-utility-details-results";
import fetchBasicServiceDetailsResults from "../actions/fetch-basic-service-details-results";
import SearchTag from "./AdvancedSearch/SearchTag";
import { map, intersection } from "lodash";
import AdvancedOwnershipRegulation from "./AdvancedSearch/AdvancedOwnershipRegulation";
import AdvancedFacilityType from "./AdvancedSearch/AdvancedFacilityType";
import fetchAdvancedSearchResults from "../actions/fetch-advanced-search-results";
import AdvancedResourceType from "./AdvancedSearch/AdvancedResourceType";
import AdvancedUtilityType from "./AdvancedSearch/AdvancedUtilityType";
import AdvancedServiceType from "./AdvancedSearch/AdvancedServiceType";
import fetchResourceTypeInstances from "../actions/fetch-resource-type-instances";
import fetchUtilityTypeInstances from "../actions/fetch-utility-type-instances";
import fetchServiceTypeInstances from "../actions/fetch-service-type-instances";
import removeResultsValues from "../actions/remove-results-values";
import FacilityTypeTag from "./AdvancedSearch/FacilityTypeTag";
import FacilityOwnerTag from "./AdvancedSearch/FacilityOwnerTag";
import OperationalStatusTag from "./AdvancedSearch/OperationalStatusTag";
import RegulatoryStatusTag from "./AdvancedSearch/RegulatoryStatusTag";
import DistrictTag from "./AdvancedSearch/DistrictTag";
import ResourceTag from "./AdvancedSearch/ResourceTag";
import UtilityTag from "./AdvancedSearch/UtilityTag";
import ServiceTag from "./AdvancedSearch/ServiceTag";

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
        await this.props.fetchBasicResourceDetailsResults(
            this.props.searchValues
        );
        await this.props.fetchBasicUtilityDetailsResults(
            this.props.searchValues
        );
        await this.props.fetchBasicServiceDetailsResults(
            this.props.searchValues
        );
        await this.props.fetchBasicDetailsResults(this.props.searchValues);
    }

    async handleRemoveResults(e) {
        await this.props.removeSearchValues("", "REMOVE_ALL_SEARCH_VALUES");
        await this.props.removeResultsValues();
        await this.props.handleClose(e);
    }

    async handleSearchTypeResourceInstances(e) {
        await this.props.fetchResourceTypeInstances(e.target.value);
    }
    async handleSearchTypeUtilityInstances(e) {
        await this.props.fetchUtilityTypeInstances(e.target.value);
    }
    async handleSearchTypeServiceInstances(e) {
        await this.props.fetchServiceTypeInstances(e.target.value);
    }

    async getSearchResults(e) {
        await this.props.fetchAdvancedSearchResults(this.props.results);
        await this.props.handleClose(e);
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
                            <a onClick={e => this.handleRemoveResults(e)}>
                                <i class="material-icons">close</i>
                            </a>
                        </span>
                    </div>
                    <div className="mfl-search-feedback">
                        <span>
                            <strong>
                                {Array.isArray(this.props.results)
                                    ? this.props.results.length
                                    : ""}
                            </strong>{" "}
                            Facilities Match Your Criteria
                        </span>
                        {Array.isArray(this.props.results) ? (
                            <span className="right">
                                <a
                                    className="btn mfl-get-results-btn"
                                    onClick={e => this.getSearchResults(e)}
                                >
                                    Get Search Results
                                </a>
                            </span>
                        ) : (
                            ""
                        )}
                    </div>

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
                                    handleChange={(e, type) =>
                                        this.handleAddSearchValue(e, type)
                                    }
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
                                    facilityTypes={this.props.facilityTypes}
                                    facilityOwners={this.props.facilityOwners}
                                    regulatoryStatuses={
                                        this.props.regulatoryStatuses
                                    }
                                    handleChange={(e, type) =>
                                        this.handleAddSearchValue(e, type)
                                    }
                                />
                            ) : (
                                ""
                            )}
                        </Tab>

                        <Tab
                            title="Facility Type"
                            className="advanced-search-container"
                            active
                        >
                            {this.state.activeTab === "Facility Type" ? (
                                <AdvancedFacilityType
                                    facilityTypes={this.props.facilityTypes}
                                    handleChange={(e, type) =>
                                        this.handleAddSearchValue(e, type)
                                    }
                                />
                            ) : (
                                ""
                            )}
                        </Tab>

                        <Tab
                            title="Resources"
                            className="advanced-search-container"
                            active
                        >
                            {this.state.activeTab === "Resources" ? (
                                <AdvancedResourceType
                                    resourceTypes={this.props.resourceTypes}
                                    handleChange={e =>
                                        this.handleSearchTypeResourceInstances(
                                            e
                                        )
                                    }
                                    handleChangeAddSearchValue={(e, type) =>
                                        this.handleAddSearchValue(e, type)
                                    }
                                />
                            ) : (
                                ""
                            )}
                        </Tab>
                        <Tab
                            title="Utilities"
                            className="advanced-search-container"
                            active
                        >
                            {this.state.activeTab === "Utilities" ? (
                                <AdvancedUtilityType
                                    utilityTypes={this.props.utilityTypes}
                                    handleChange={e =>
                                        this.handleSearchTypeUtilityInstances(e)
                                    }
                                    handleChangeAddSearchValue={(e, type) =>
                                        this.handleAddSearchValue(e, type)
                                    }
                                />
                            ) : (
                                ""
                            )}
                        </Tab>
                        <Tab
                            title="Services"
                            className="advanced-search-container"
                            active
                        >
                            {this.state.activeTab === "Services" ? (
                                <AdvancedServiceType
                                    serviceTypes={this.props.serviceTypes}
                                    handleChange={e =>
                                        this.handleSearchTypeServiceInstances(e)
                                    }
                                    handleChangeAddSearchValue={(e, type) =>
                                        this.handleAddSearchValue(e, type)
                                    }
                                />
                            ) : (
                                ""
                            )}
                        </Tab>
                    </Tabs>
                </div>
                <div class="modal-footer">
                    <div className="advanced-search-tag-container">
                        {/* DISPLAY TAGS FOR DISTRICT VALUES */}
                        <DistrictTag
                            getObjectFromIds={(ids, entities) =>
                                this.getObjectFromIds(ids, entities)
                            }
                        />

                        {/* DISPLAY TAGS FOR OPERATIOANAL STATUS VALUES */}
                        <OperationalStatusTag
                            getObjectFromIds={(ids, entities) =>
                                this.getObjectFromIds(ids, entities)
                            }
                        />
                        {/* DISPLAY TAGS FOR FACILITY TYPE VALUES */}
                        <FacilityTypeTag
                            getObjectFromIds={(ids, entities) =>
                                this.getObjectFromIds(ids, entities)
                            }
                        />
                        {/* DISPLAY TAGS FOR FACILITY OWNER VALUES */}
                        <FacilityOwnerTag
                            getObjectFromIds={(ids, entities) =>
                                this.getObjectFromIds(ids, entities)
                            }
                        />
                        {/* {DISPLAY TAGS FOR REGULATORY STATUS VALUES} */}
                        <RegulatoryStatusTag
                            getObjectFromIds={(ids, entities) =>
                                this.getObjectFromIds(ids, entities)
                            }
                        />
                        {/* {DISPLAY TAGS FOR RESOURCE TYPE INSTANCES VALUES} */}
                        <ResourceTag
                            getObjectFromIds={(ids, entities) =>
                                this.getObjectFromIds(ids, entities)
                            }
                        />
                        {/* {DISPLAY TAGS FOR UTILITY TYPE INSTANCES VALUES} */}
                        <UtilityTag
                            getObjectFromIds={(ids, entities) =>
                                this.getObjectFromIds(ids, entities)
                            }
                        />

                        {/* {DISPLAY TAGS FOR SERVICE TYPE INSTANCES VALUES} */}
                        <ServiceTag
                            getObjectFromIds={(ids, entities) =>
                                this.getObjectFromIds(ids, entities)
                            }
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        searchResults: state.searchResults.advancedSearchResults,
        searchValues: state.advancedSearchValues,
        districts: state.dependancies.districts,
        facilityTypes: state.dependancies.facilityTypes,
        facilityOwners: state.dependancies.facilityOwners,
        operationalStatuses: state.dependancies.operationalStatuses,
        regulatoryStatuses: state.dependancies.regulatoryStatuses,
        resourceTypes: state.dependancies.resourceTypes,
        utilityTypes: state.dependancies.utilityTypes,
        serviceTypes: state.dependancies.serviceInstance,
        typeResourceInstances: state.facilities.typeResourceInstances,
        typeUtilityInstances: state.facilities.typeUtilityInstances,
        typeServiceInstances: state.facilities.typeServiceInstances,
        resources: state.facilities.resources,
        utilities: state.facilities.utilities,
        services: state.facilities.services,
        results: map(state.searchResults.advancedSearchFacilities)
            .filter(filteredArray => {
                return filteredArray.length > 0;
            })
            .reduce(
                (resultsArray, currentArray) => {
                    return intersection(resultsArray, currentArray);
                },
                map(state.searchResults.advancedSearchFacilities).filter(
                    filteredArray => {
                        return filteredArray.length > 0;
                    }
                )[0]
            )
    };
};

export default connect(mapStateToProps, {
    addSearchValues,
    removeSearchValues,
    fetchBasicDetailsResults,
    fetchAdvancedSearchResults,
    fetchResourceTypeInstances,
    fetchUtilityTypeInstances,
    fetchServiceTypeInstances,
    fetchBasicResourceDetailsResults,
    fetchBasicUtilityDetailsResults,
    fetchBasicServiceDetailsResults,
    removeResultsValues
})(SearchModal);
