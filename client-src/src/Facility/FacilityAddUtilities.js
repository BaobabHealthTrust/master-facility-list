//@flow
import React, { Component } from "react";
import footerResizer from "../helpers/footerResize";
import { Input } from "react-materialize";
import FacilityAddFooter from "./FacilityAddFooter";

type Props = {
    handleNextForTabs: Function
};

class FacilityAddUtilities extends Component<Props> {
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
                                <h6>Transport Resources</h6>
                                <hr />
                                <div className="row">
                                    <div className="col s6">
                                        <form action="#">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="test5"
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p>Ambulances</p>
                                        </form>
                                    </div>
                                    <div className="col s6">
                                        <form action="#">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="test5"
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p>Vehicles</p>
                                        </form>
                                    </div>
                                    <div className="row" />
                                    <div className="col s6">
                                        <form action="#">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="test5"
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p>Vehicles</p>
                                        </form>
                                    </div>

                                    <div className="col s6">
                                        <form action="#">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="test5"
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p>Vehicles</p>
                                        </form>
                                    </div>
                                </div>
                                <div />
                                <div className="row">
                                    <h5>Generator Resources</h5>
                                    <hr />
                                    <div className="col s6">
                                        <form action="#">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="test5"
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p>Vehicles</p>
                                        </form>
                                    </div>
                                    <div className="col s6">
                                        <form action="#">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="test5"
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p>Vehicles</p>
                                        </form>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s6">
                                        <form action="#">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="test5"
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p>Vehicles</p>
                                        </form>
                                    </div>
                                    <div className="col s6">
                                        <form action="#">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="test5"
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p>Vehicles</p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="input-field col s6">
                                <h6>Energy Resources</h6>
                                <hr />
                                <div className="row" />
                                <div className="col s6 mfl-tm-resource">
                                    <form action="#">
                                        <p class="range-field">
                                            <input
                                                type="range"
                                                id="test5"
                                                min="0"
                                                max="100"
                                            />
                                        </p>
                                        <p>Vehicles</p>
                                    </form>
                                </div>
                                <div className="col s6 mfl-tm-resource">
                                    <form action="#">
                                        <p class="range-field">
                                            <input
                                                type="range"
                                                id="test5"
                                                min="0"
                                                max="100"
                                            />
                                        </p>
                                        <p>Vehicles</p>
                                    </form>
                                </div>

                                <div className="row" />
                                <div className="col s6">
                                    <form action="#">
                                        <p class="range-field">
                                            <input
                                                type="range"
                                                id="test5"
                                                min="0"
                                                max="100"
                                            />
                                        </p>
                                        <p>Vehicles</p>
                                    </form>
                                </div>

                                <div className="col s6">
                                    <form action="#">
                                        <p class="range-field">
                                            <input
                                                type="range"
                                                id="test5"
                                                min="0"
                                                max="100"
                                            />
                                        </p>
                                        <p>Vehicles</p>
                                    </form>
                                </div>
                                <div className="row">
                                    <h6 className="">hello</h6>
                                    <hr />
                                    <br />
                                    <div className="col s6">
                                        <form action="#">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="test5"
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p>Vehicles</p>
                                        </form>
                                    </div>
                                    <div className="col s6">
                                        <form action="#">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="test5"
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p>Vehicles</p>
                                        </form>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s6">
                                        <form action="#">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="test5"
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p>Vehicles</p>
                                        </form>
                                    </div>
                                    <div className="col s6">
                                        <form action="#">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="test5"
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p>Vehicles</p>
                                        </form>
                                    </div>
                                </div>
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
                            <div className="row" />

                            <div className="col s6">
                                <form action="#">
                                    <p class="range-field">
                                        <input
                                            type="range"
                                            id="test5"
                                            min="0"
                                            max="100"
                                        />
                                    </p>
                                    <p>Vehicles</p>
                                </form>
                            </div>
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

export default FacilityAddUtilities;
