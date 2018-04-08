//@flow
import * as React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Tabs, Tab } from "react-materialize";
import FacilityBasicDetails from "./FacilityBasicDetails";
import FacilityContacts from "./FacilityContacts";
import FacilityAddResources from "./FacilityAddResources";
import FacilityAddUtilities from "./FacilityAddUtilities";
import FacilityAddServices from "./FacilityAddServices";
import FacilitiesHome from "./FacilitiesHome";
import { connect } from "react-redux";
import {
    RegulatoryStatus,
    OperationalStatus,
    FacilityOwner,
    FacilityType
} from "../types/model-types";
import { addFormValues } from "../actions";


type State = {
    activeTab: string,
};

type Props = {
    regulatoryStatuses: Array<RegulatoryStatus>,
    operationalStatuses: Array<OperationalStatus>,
    facilityOwners: Array<FacilityOwner>,
    facilityTypes: Array<FacilityType>,
    serviceTypes: Array<serviceTypes>,
    services: Array<services>,
    handleCancelAddFacility: Function,
};

class FacilityTabs extends React.Component<Props, State> {
    state = {
        activeTab: "Basic",
    };

    handleNextForTabs = (tabName) => {
        this.setState({ activeTab: tabName });
    };
    
    handlePreviousForTabs = (tabName) => {
        this.setState({ activeTab: tabName });
    };

    handleCancel= ()=>{
         this.props.addFormValues("","REMOVE_ALL_FORM_VALUES");
         this.props.handleCancelAddFacility();
    }

    render() {
        return (
            <div className="mfl-modal-container">
                <div class="modal-content">
                    <Tabs
                        className="tab-demo z-depth-0 white text-white indicator"
                        onChange={(t, v) =>
                            this.setState({ activeTab: v.target.text })
                        }
                    >
                        <Tab
                            title="Basic"
                            tabWidth="2"
                            className={
                                this.state.activeTab === "Basic"
                                    ? `${"advanced-search-container mfl-add-tab1 mfl-active-tab"}`
                                    : `${"advanced-search-container mfl-add-tab1 mfl-inactive-tabs"}`
                            }
                            active
                        >
                            {this.state.activeTab === "Basic" ? (
                                <FacilityBasicDetails
                                    isEditBasic={false}
                                    handleNextForTabs={this.handleNextForTabs}
                                    handleCancel={this.handleCancel}
                                    facilityOwners={this.props.facilityOwners}
                                    facilityTypes={this.props.facilityTypes}
                                    regulatoryStatuses={
                                        this.props.regulatoryStatuses
                                    }
                                    operationalStatuses={
                                        this.props.operationalStatuses
                                    }
                                />
                            ) : (
                                ""
                            )}
                        </Tab>
                        <Tab
                            title="Contacts and Locations"
                            tabWidth="4"
                            className={
                                this.state.activeTab ===
                                "Contacts and Locations"
                                    ? `${"advanced-search-container mfl-add-tabcontacts mfl-active-tab"}`
                                    : `${"advanced-search-container mfl-add-tabcontacts mfl-inactive-tabs"}`
                            }
                            active
                        >
                            {this.state.activeTab ===
                            "Contacts and Locations" ? (
                                <FacilityContacts
                                    isEditContactAndLocation={false}
                                    handlePreviousForTabs={this.handlePreviousForTabs}
                                    handleNextForTabs={this.handleNextForTabs}
                                    handleCancel={this.handleCancel}
                                    districts={this.props.districts}
                                />
                            ) : (
                                ""
                            )}
                        </Tab>

                        <Tab
                            title="Resources"
                            className={
                                this.state.activeTab === "Resources"
                                    ? `${"advanced-search-container mfl-add-tabresources mfl-active-tab"}`
                                    : `${"advanced-search-container mfl-add-tabresources mfl-inactive-tabs"}`
                            }
                            active
                        >
                            {this.state.activeTab === "Resources" ? (
                                <FacilityAddResources
                                    isEditResources={false}
                                    handlePreviousForTabs={this.handlePreviousForTabs}
                                    handleNextForTabs={this.handleNextForTabs}
                                    handleCancel={this.handleCancel}
                                />
                            ) : (
                                ""
                            )}
                        </Tab>

                        <Tab
                            title="Utilities"
                            className={
                                this.state.activeTab === "Utilities"
                                    ? `${"advanced-search-container mfl-add-tabs mfl-active-tab"}`
                                    : `${"advanced-search-container mfl-add-tabs mfl-inactive-tabs"}`
                            }
                            active
                        >
                            {this.state.activeTab === "Utilities" ? (
                                <FacilityAddUtilities
                                    isEditUtilities={false}
                                    handlePreviousForTabs={this.handlePreviousForTabs}
                                    handleNextForTabs={this.handleNextForTabs}
                                    handleCancel={this.handleCancel}
                                />
                            ) : (
                                ""
                            )}
                        </Tab>

                        <Tab
                            title="Services"
                            className={
                                this.state.activeTab === "Services"
                                    ? `${"advanced-search-container mfl-add-tabs mfl-active-tab"}`
                                    : `${"advanced-search-container mfl-add-tabs mfl-inactive-tabs"}`
                            }
                            active
                        >
                            {this.state.activeTab === "Services" ? (
                                <FacilityAddServices
                                    isEditServices={false}
                                    handlePreviousForTabs={this.handlePreviousForTabs}
                                    handleNextForTabs={this.handleNextForTabs}
                                    handleCancel={this.handleCancel}
                                    services={this.props.services}
                                    serviceTypes={this.props.serviceTypes}
                                />
                            ) : (
                                ""
                            )}
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isError: state.facilities.isNetworkError,
        operationalStatuses: state.dependancies.operationalStatuses,
        regulatoryStatuses: state.dependancies.regulatoryStatuses,
        facilityOwners: state.dependancies.facilityOwners,
        facilityTypes: state.dependancies.facilityTypes,
        districts: state.dependancies.districts,
        serviceTypes: state.dependancies.serviceInstance,
        services: state.facilities.services,
    };
};

export default connect(mapStateToProps, {addFormValues})(FacilityTabs);