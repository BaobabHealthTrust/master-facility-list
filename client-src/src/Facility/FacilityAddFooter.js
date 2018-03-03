//@flow
import React, { Component } from "react";
import { Navbar } from "react-materialize";

type Props = {
    tabName: string,
    handleNextForTabs: Function
};

class FacilityAddFooter extends Component<Props> {
    render() {
        return (
            <div className="row grey lighten-2 mfl-add-footer">
                <a className=" waves-effect waves-light black-text right">
                    Or Cancel
                </a>

                <a
                    class="waves-effect waves-light blue btn mfl-tab-btn-space"
                    onClick={() => this.props.handleNextForTabs()}
                >
                    Next
                </a>
                {this.props.tabName !== "Basic" && (
                    <a
                        class="waves-effect waves-light blue btn mfl-tab-btn-space-previous"
                        //  onClick={e => this.props.toggleAddFacility(e)}
                    >
                        Previous
                    </a>
                )}
            </div>
        );
    }
}

export default FacilityAddFooter;
