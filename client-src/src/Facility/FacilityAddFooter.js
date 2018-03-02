//@flow
import React, { Component } from "react";
import { Navbar } from "react-materialize";

type Props = {
    tabName: string
};

class FacilityAddFooter extends Component<Props> {
    componentDidMount() {
        console.log(this.props.tabName);
    }
    render() {
        return (
            <div className="row grey lighten-3 mfl-add-footer">
                <a className=" waves-effect waves-light black-text right">
                    Or Cancel
                </a>

                <a
                    class="waves-effect waves-light blue btn mfl-tab-btn-space"
                    //  onClick={e => this.props.toggleAddFacility(e)}
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
