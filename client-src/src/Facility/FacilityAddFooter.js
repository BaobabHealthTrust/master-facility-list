//@flow
import React, { Component } from "react";
import { Navbar, Input, Button } from "react-materialize";

type Props = {
    tabName: string,
    handleNextForTabs: Function,
};

class FacilityAddFooter extends Component<Props> {
    render() {
        return (
            <div className="row grey lighten-2 mfl-add-footer">
                <a className="black-text right mfl-tm-1 ">Or Cancel</a>

                {/* <a
                    class="waves-effect waves-light blue btn mfl-tab-btn-space"
                    }
                >
                    Next
                </a> */} 
                <Button
                    className="blue white-text mfl-tab-btn-space"
                    id="submit"
                    type="submit"
                >
                    Next
                </Button>
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
