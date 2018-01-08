import React, { Component } from "react";
import { Tabs, Tab } from "react-materialize";
import AdvancedLocation from "./AdvancedSearch/AdvancedLocation";
import { connect } from "react-redux";
import addSearchValues from "../actions/add-search-values";
import removeSearchValues from "../actions/remove-search-values";
import { remove, pull } from "lodash";
import SearchTag from "./AdvancedSearch/SearchTag";

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

    handleAddSearchValue(e, type) {
        this.props.addSearchValues(e, type);
        alert("we are so cool");
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
                            title="Facility Type"
                            className="advanced-search-container"
                            active
                        >
                            Facility Type
                        </Tab>
                        <Tab title="Services">Test 3</Tab>
                        <Tab title="Resources">Test 4</Tab>
                    </Tabs>
                </div>
                <div class="modal-footer">
                    <div className="advanced-search-tag-container">
                        {this.getObjectFromIds(
                            this.props.searchValues.districtValues,
                            this.props.districts
                        ).map(entity => {
                            return (
                                <SearchTag
                                    name={entity.district_name}
                                    id={entity.id}
                                    actionType={"REMOVE_DISTRICT_VALUES"}
                                    removeSearchValues={(id, actionType) =>
                                        this.props.removeSearchValues(
                                            id,
                                            actionType
                                        )
                                    }
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
        districts: state.dependancies.districts
    };
};

export default connect(mapStateToProps, {
    addSearchValues,
    removeSearchValues
})(SearchModal);
