import React, { Component } from "react";
import Table from "../common/Table";
import { connect } from "react-redux";
import fetchFacilities from "../actions/get-facilities";
import { truncate } from "lodash";
import moment from "moment";
import Pagination from "../common/Pagination";
import downloadFacilities from "../actions/download-facilities";
import MflDownload from "../common/MflDownload";
import SearchModal from "./SearchModal";
import { Row, Input } from "react-materialize";
import fetchDistricts from "../actions/fetch-districts";
import fetchFacilityTypes from "../actions/fetch-facility-types";
import fetchOperationalStatuses from "../actions/fetch-operational-statuses";

class FacilityList extends Component {
    constructor() {
        super();
        this.state = {
            isAdvancedSearch: false
        };
    }

    componentDidMount() {
        this.props.fetchDistricts();
        this.props.fetchOperationalStatuses();
        this.props.fetchFacilityTypes();
        if (this.props.facilities.length == 0) {
            this.props.fetchFacilities(1);
        }
    }

    handleClose() {
        this.setState({
            isAdvancedSearch: false
        });
    }

    render() {
        const data = {
            headers: [
                "CODE",
                "NAME",
                "COMMON NAME",
                "OWNERSHIP",
                "TYPE",
                "STATUS",
                "DISTRICT",
                "DATE OPENED"
            ],
            records: []
        };

        this.props.facilities.forEach(facility => {
            data.records.push([
                facility.id,
                facility.facility_code,
                facility.facility_name.toUpperCase(),
                "Common Name".toUpperCase(),
                facility.owner.facility_owner.toUpperCase(),
                facility.facilityType.facility_type.toUpperCase(),
                truncate(
                    facility.operationalStatus.facility_operational_status.toUpperCase(),
                    { length: 12 }
                ),
                facility.district.district_name.toUpperCase(),
                moment(facility.facility_date_opened).format("MMM Do YY")
            ]);
        });

        return (
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
                        {this.state.isAdvancedSearch ? (
                            <SearchModal
                                handleClose={() => this.handleClose()}
                            />
                        ) : (
                            <div>
                                <MflDownload
                                    action={this.props.downloadFacilities}
                                    fileName="facilities"
                                />
                                <a
                                    class="btn-flat mfl-advanced-search left"
                                    onClick={e =>
                                        this.setState({
                                            isAdvancedSearch: true
                                        })
                                    }
                                >
                                    Advanced Search
                                </a>
                                <Table data={data} />
                                <Pagination />
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        facilities: state.facilities.list,
        isError: state.facilities.isNetworkError,
        isLoading: state.facilities.isLoading,
        download: state.downloads.data
    };
};

export default connect(mapStateToProps, {
    fetchFacilities,
    downloadFacilities,
    fetchDistricts,
    fetchOperationalStatuses,
    fetchFacilityTypes
})(FacilityList);
