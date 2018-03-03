//@flow
import * as React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Tabs, Tab } from "react-materialize";
import FacilityBasicDetails from "./FacilityBasicDetails";
import FacilityContacts from "./FacilityContacts";
import FacilityAddResources from "./FacilityAddResources";
import FacilityAddUtilities from "./FacilityAddUtilities";
import FacilityAddServices from "./FacilityAddServices";

type State = {
    activeTab: string,
    tabNumber: number
};

export default class SecondaryMenu extends React.Component<State> {
    state = {
        activeTab: "Basic",
        tabNumber: 1
    };

    handleNextForTabs = () => {
        this.setState({ tabNumber: this.state.tabNumber + 1 });
    };

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
                                    handleNextForTabs={this.handleNextForTabs}
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
                                    handleNextForTabs={this.handleNextForTabs}
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
                                    handleNextForTabs={this.handleNextForTabs}
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
                                    handleNextForTabs={this.handleNextForTabs}
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
                                    handleNextForTabs={this.handleNextForTabs}
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
