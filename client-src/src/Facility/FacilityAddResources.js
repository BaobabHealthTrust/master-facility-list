//@flow
import React, { Component } from "react";
import footerResizer from "../helpers/footerResize";
import { Input } from "react-materialize";
import FacilityAddFooter from "./FacilityAddFooter";

type Props = {
    handleNextForTabs: Function
};

class FacilityAddResources extends Component<Props> {
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
                                <h6>Energy</h6>
                                <hr />
                            </div>
                            <div class="input-field col s6">
                                <h6>Energy Services</h6>
                                <hr />
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6" />
                            <div class="input-field col s6" />
                        </div>
                        <div class="row">
                            <div class="input-field col s6" />
                            <div class="input-field col s6" />
                        </div>
                        <div class="row">
                            <div class="input-field col s6" />
                            <div class="input-field col s6" />
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

export default FacilityAddResources;
