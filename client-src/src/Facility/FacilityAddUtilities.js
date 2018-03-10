//@flow
import React, { Component } from "react";
import footerResizer from "../helpers/footerResize";
import { Input } from "react-materialize";
import FacilityAddFooter from "./FacilityAddFooter";

type Props = {
    handleNextForTabs: Function
};

class FacilityAddUtilities extends Component<Props> {
    async formSubmitted(e) {
        await alert(this.props.commonName);
        e.preventDefault();
    }

    componentDidMount() {
        footerResizer();
    }
    render() {
        return (
            <div>
                <div class="row">
                    <form onSubmit={e => this.formSubmitted(e)} class="col s12">
                        <div class="row">
                            <div class="input-field col s6">
                                <h6>Energy Services</h6>
                                <hr />
                                <div className="row">
                                    <div className="col s6">
                                        <p>
                                            <input type="checkbox" id="test5" />
                                            <label for="test5">
                                                National Grid
                                            </label>
                                        </p>
                                    </div>
                                    <div className="col s6">
                                        <form action="#">
                                            <p>
                                                <input
                                                    type="checkbox"
                                                    id="test5"
                                                />
                                                <label for="test5">Wind</label>
                                            </p>
                                        </form>
                                    </div>
                                    <div className="row" />
                                    <div className="col s6">
                                        <form action="#">
                                            <p>
                                                <input
                                                    type="checkbox"
                                                    id="test5"
                                                />
                                                <label for="test5">
                                                    Generator
                                                </label>
                                            </p>
                                        </form>
                                    </div>

                                    <div className="col s6">
                                        <form action="#">
                                            <p>
                                                <input
                                                    type="checkbox"
                                                    id="test5"
                                                />
                                                <label for="test5">Solar</label>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s6">
                                        <form action="#">
                                            <p>
                                                <input
                                                    type="checkbox"
                                                    id="test5"
                                                />
                                                <label for="test5">none</label>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                                <div />
                                <div className="row">
                                    <h6 className="mfl-tm-title">
                                        Mobile Networks
                                    </h6>
                                    <hr />
                                    <div className="col s6">
                                        <form action="#">
                                            <p>
                                                <input
                                                    type="checkbox"
                                                    id="test5"
                                                />
                                                <label for="test5">TNM</label>
                                            </p>
                                        </form>
                                    </div>
                                    <div className="col s6">
                                        <form action="#">
                                            <p>
                                                <input
                                                    type="checkbox"
                                                    id="test5"
                                                />
                                                <label for="test5">MTL</label>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s6">
                                        <form action="#">
                                            <p>
                                                <input
                                                    type="checkbox"
                                                    id="test5"
                                                />
                                                <label for="test5">
                                                    AIRTEL
                                                </label>
                                            </p>
                                        </form>
                                    </div>
                                    <div className="col s6">
                                        <form action="#">
                                            <p>
                                                <input
                                                    type="checkbox"
                                                    id="test5"
                                                />
                                                <label for="test5">NONE</label>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s6">
                                        <form action="#">
                                            <p>
                                                <input
                                                    type="checkbox"
                                                    id="test5"
                                                />
                                                <label for="test5">
                                                    ACCESS
                                                </label>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="input-field col s6">
                                <h6>Energy Services</h6>
                                <hr />
                                <div className="row" />
                                <div className="col s6 mfl-tm-resource">
                                    <form action="#">
                                        <p>
                                            <input type="checkbox" id="test5" />
                                            <label for="test5">Red</label>
                                        </p>
                                    </form>
                                </div>
                                <div className="col s6 mfl-tm-resource">
                                    <form action="#">
                                        <p>
                                            <input type="checkbox" id="test5" />
                                            <label for="test5">Red</label>
                                        </p>
                                    </form>
                                </div>

                                <div className="row" />
                                <div className="col s6">
                                    <form action="#">
                                        <p>
                                            <input type="checkbox" id="test5" />
                                            <label for="test5">Red</label>
                                        </p>
                                    </form>
                                </div>

                                <div className="col s6">
                                    <form action="#">
                                        <p>
                                            <input type="checkbox" id="test5" />
                                            <label for="test5">Red</label>
                                        </p>
                                    </form>
                                </div>
                                <div className="row" />
                                <div className="col s6">
                                    <form action="#">
                                        <p>
                                            <input type="checkbox" id="test5" />
                                            <label for="test5">Red</label>
                                        </p>
                                    </form>
                                </div>

                                <div className="row">
                                    <h6 className="mfl-rule-utility">
                                        Mobile Networks
                                    </h6>
                                    <hr className="mfl-rule-utility-2" />
                                    <div className="col s6">
                                        <form action="#">
                                            <p>
                                                <input
                                                    type="checkbox"
                                                    id="test5"
                                                />
                                                <label for="test5">Red</label>
                                            </p>
                                        </form>
                                    </div>
                                    <div className="col s6">
                                        <form action="#">
                                            <p>
                                                <input
                                                    type="checkbox"
                                                    id="test5"
                                                />
                                                <label for="test5">Red</label>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s6">
                                        <form action="#">
                                            <p>
                                                <input
                                                    type="checkbox"
                                                    id="test5"
                                                />
                                                <label for="test5">Red</label>
                                            </p>
                                        </form>
                                    </div>
                                    <div className="col s6">
                                        <form action="#">
                                            <p>
                                                <input
                                                    type="checkbox"
                                                    id="test5"
                                                />
                                                <label for="test5">Red</label>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s6">
                                        <form action="#">
                                            <p>
                                                <input
                                                    type="checkbox"
                                                    id="test5"
                                                />
                                                <label for="test5">Red</label>
                                            </p>
                                        </form>
                                    </div>
                                </div>
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
