//@flow
import React, { Component } from "react";
import { Navbar, Input, Button } from "react-materialize";

type Props = {
    tabName: string,
    tabPreviousName: string,
    handleNextForTabs: Function,
    handlePreviousForTabs: Function,
    handleCancel: Function,
    handleCancelEdit: Function,
    submitFormData: Function,
};

class FacilityAddFooter extends Component<Props> {
    render() {
        return (
            <div className="row grey lighten-2 mfl-add-footer">
                     <a className="black-text right mfl-tm-1"
                      onClick={() => this.props.handleCancel()}
                     >
                        Or Cancel
                     </a> 
                
                <a
                    className="waves-effect waves-light blue btn mfl-tab-btn-space"
                    onClick={() => this.props.submitFormData()}
                >
                   {!this.props.isEditFacility?(this.props.tabPreviousName==="Utilities"? "Finish":"Next"):("Save")}
                </a>
                {this.props.isEditFacility? (""):(this.props.tabName !== "Basic" && (
                    <a
                        class="waves-effect waves-light blue btn mfl-tab-btn-space-previous"
                        onClick={() => this.props.handlePreviousForTabs(this.props.tabPreviousName)}
                    >
                        Previous
                    </a>
                ))}
            </div>
        );
    }
}

export default FacilityAddFooter;
