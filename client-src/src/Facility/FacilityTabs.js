//@flow
import * as React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Tabs, Tab } from "react-materialize";
import FacilityBasicDetails from "./FacilityBasicDetails";

type Props = {
    links: Array<SecondaryLink>,
    defaultActivePage: string
};

type State = {
    activePage: string
};

export default class SecondaryMenu extends React.Component<Props, State> {
    state = {
        activePage: this.props.defaultActivePage
    };

    handleClick(page: string, handler: ?Function): void {
        this.setState({
            activePage: page
        });

        handler && handler();
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
                            className="advanced-search-container mfl-add-tab1"
                            active
                        >
                            {
                                //this.state.activeTab === "Location" ? (
                                <FacilityBasicDetails />
                                // ) : (
                                //     ""
                                // )
                            }
                        </Tab>
                        <Tab
                            title="Contacts and Locations"
                            tabWidth="4"
                            className="advanced-search-container mfl-add-tabs"
                            active
                        />

                        <Tab
                            title="Resources"
                            className="advanced-search-container mfl-add-tabs"
                            active
                        />

                        <Tab
                            title="Utilities"
                            className="advanced-search-container mfl-add-tabs"
                            active
                        />
                        <Tab
                            title="Services"
                            className="advanced-search-container mfl-add-tabs"
                            active
                        />
                    </Tabs>
                </div>
            </div>
        );
    }
}
