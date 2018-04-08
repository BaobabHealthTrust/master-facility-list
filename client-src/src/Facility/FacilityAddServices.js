//@flow
import React, { Component } from "react";
import footerResizer from "../helpers/footerResize";
import { Input } from "react-materialize";
import FacilityAddFooter from "./FacilityAddFooter";
import { connect } from "react-redux";

type Props = {
    handleNextForTabs: Function,
    handlePreviousForTabs: Function,
    handleCancel: Function,
};
type State = {
    tabPreviousName: string,
 }

class FacilityAddServices extends Component<Props, State> {
   state = {
     tabPreviousName: "Utilities",
   }

    componentDidMount() {
        footerResizer();
    }
    render() {
        
        return (
            <div>
                <div class="row">
                    <form class="col s12" onSubmit={e => this.formSubmitted(e)}>
                        <div class="row">
                            <div class="input-field col s6">
                                <Input s={12} type="select" defaultValue="0">
                                    <option value="0">Select Service</option>
                                    {}
                                </Input>
                            </div>
                            <div class="input-field col s6" />
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <Input s={12} type="select" defaultValue="2">
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                </Input>
                            </div>
                            <div class="input-field col s6">
                                <p>Summary services</p>
                                <hr className="mfl-services-rule" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <Input s={12} type="select" defaultValue="2">
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                </Input>
                            </div>

                            <div class="input-field col s6 " />
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <Input
                                    s={12}
                                    type="select"
                                    label="Materialize Select"
                                    defaultValue="2"
                                >
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                </Input>
                            </div>
                            <div class="input-field col s6" />
                            <div className="mfl-vertical-ruler-services" />
                        </div>
                        <FacilityAddFooter
                            tabPreviousName={this.state.tabPreviousName}
                            handlePreviousForTabs={(tabName)=>this.props.handlePreviousForTabs(tabName)}
                            handleNextForTabs={this.props.handleNextForTabs}
                            handleCancel={this.props.handleCancel}
                        />
                    </form>
                </div>
            </div>
        );
    }
}

export default FacilityAddServices;