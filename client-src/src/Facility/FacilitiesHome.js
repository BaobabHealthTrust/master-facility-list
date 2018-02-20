import React, { Component } from "react";
import { connect } from "react-redux";
import SearchModal from "./SearchModal";
import {
    fetchDistricts, fetchFacilityTypes, fetchFacilityOwners, fetchUtilityTypes, fetchResourceTypes,
    fetchServiceTypes, fetchRegulatoryStatuses, fetchOperationalStatuses, fetchFacilities, downloadFacilities, fetchResources, fetchUtilities, fetchServices
} from "../actions";
import SecondaryMenu from "../common/SecondaryMenu";
import FacilityFilters from "../Dashboard/FacilityFilters";
import FacilityList from "./FacilityList";
import footerResizer from "../helpers/footerResize";

class FacilitiesHome extends Component {
    constructor() {
        super();
        this.state = {
            isAdvancedSearch: false,
            isShowSearchResults: false,
        };
    }

    componentDidMount() {
        this.props.fetchDistricts();
        this.props.fetchOperationalStatuses();
        this.props.fetchFacilityTypes();
        this.props.fetchFacilityOwners();
        this.props.fetchRegulatoryStatuses();
        this.props.fetchResourceTypes();
        this.props.fetchUtilityTypes();
        this.props.fetchServiceTypes();
        this.props.fetchResources();
        this.props.fetchUtilities();
        this.props.fetchServices();
        this.props.fetchFacilities(1);
    }

    componentWillReceiveProps(props) {
        if (props.searchResults.length > 0) {
            this.setState(prevState => {
                prevState.isShowSearchResults = true;
            });
        } else {
            this.setState(prevState => {
                prevState.isShowSearchResults = false;
            });
        }

        const isShowSearchResults = this.state.isShowSearchResults;

        footerResizer();
    }

    handleClose() {
        this.setState({
            isAdvancedSearch: false
        });
    }

    toggleAdvancedSearch(e) {
        this.setState({
            isAdvancedSearch: true
        });
        footerResizer();
    }


    render() {
        return (
            <div>
                {this.state.isAdvancedSearch ? "" : (
                    <FacilityFilters url="/facilities" isFilteredResults={true} />
                )
                }
                <div className="container mfl-container">
                    <br />
                    {this.props.isLoading ? (
                        <div class="progress">
                            <div class="indeterminate" />
                        </div>
                    ) : this.props.isError ? (
                        <blockquote>
                            <h4>
                                "Sorry, we cannot connect to the Server. Please
                            check your Network"
                        </h4>
                        </blockquote>
                    ) : (
                                <div>
                                    {
                                        this.state.isAdvancedSearch ? (
                                            <SearchModal
                                                handleClose={() => this.handleClose()}
                                            />
                                        ) : this.state.isShowSearchResults ? (
                                            <div>
                                                <FacilityList
                                                    downloadAction={
                                                        this.props.downloadFacilities
                                                    }
                                                    dataSource={this.props.searchResults}
                                                    toggleAdvancedSearch={e =>
                                                        this.toggleAdvancedSearch(e)
                                                    }
                                                />
                                            </div>
                                        ) : (
                                                    <div>
                                                        <FacilityList
                                                            downloadAction={
                                                                this.props.downloadFacilities
                                                            }
                                                            dataSource={this.props.facilities}
                                                            toggleAdvancedSearch={e =>
                                                                this.toggleAdvancedSearch(e)
                                                            }
                                                        />
                                                    </div>
                                                )}
                                </div>
                            )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        facilities: state.facilities.list,
        isError: state.facilities.isNetworkError,
        isLoading: state.facilities.isLoading,
        download: state.downloads.data,
        searchResults: state.searchResults.advancedSearchResults,
        filteredResults: state.searchResults.advancedSearchFacilities.basicDetailsFacilities
    };
};

export default connect(mapStateToProps, {
    fetchFacilities,
    downloadFacilities,
    fetchDistricts,
    fetchOperationalStatuses,
    fetchFacilityTypes,
    fetchFacilityOwners,
    fetchRegulatoryStatuses,
    fetchResourceTypes,
    fetchUtilityTypes,
    fetchServiceTypes,
    fetchResources,
    fetchUtilities,
    fetchServices
})(FacilitiesHome);
