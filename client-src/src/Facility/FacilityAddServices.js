//@flow
import React, { Component } from "react";
import footerResizer from "../helpers/footerResize";
import { Input } from "react-materialize";
import FacilityAddFooter from "./FacilityAddFooter";

type Props = {
    handleNextForTabs: Function
};

class FacilityAddServices extends Component<Props> {
    componentDidMount() {
        footerResizer();
    }
    render() {
        return (
            <div>
                <div class="row">
                    <form class="col s12">
                        <div class="row">
                            <div class="input-field col s6">
                                <Input s={12} type="select" defaultValue="2">
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
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
                            handleNextForTabs={this.props.handleNextForTabs}
                        />
                    </form>
                </div>
            </div>
        );
    }
}

export default FacilityAddServices;
