//@flow
import React, { Component } from "react";
import footerResizer from "../helpers/footerResize";
import { Input } from "react-materialize";
import FacilityAddFooter from "./FacilityAddFooter";

type Props = {
    handleNextForTabs: Function
};

class FacilityAddResources extends Component<Props> {
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
                    <form
                        onSubmit={e => this.formSubmitted(e)}
                        className="col s12"
                    >
                        <div class="row">
                            <div class="input-field col s6">
                                <h6>Transport Resources</h6>
                                <hr />
                                <div className="row">
                                    <div className="col s6">
                                        <form action="#">
                                            <p className="range-field">
                                                <input
                                                    type="range"
                                                    id="ambulances"
                                                    min="0"
                                                    max="100"
                                                    onChange={e =>
                                                        this.props.addFormValues(
                                                            e,
                                                            ""
                                                        )
                                                    }
                                                />
                                            </p>
                                            <p className="mfl-tm-resource">
                                                Ambulances
                                            </p>
                                        </form>
                                    </div>
                                    <div className="col s6">
                                        <form action="#">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="vehicles"
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p className="mfl-tm-resource">
                                                Vehicles
                                            </p>
                                        </form>
                                    </div>
                                    <div className="row" />
                                    <div className="col s6">
                                        <form action="#">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="Motor Cycles"
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p className="mfl-tm-resource">
                                                Motor Cycles
                                            </p>
                                        </form>
                                    </div>

                                    <div className="col s6">
                                        <form action="#">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="Bike_Ambulances"
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p className="mfl-tm-resource">
                                                Bike Ambulances
                                            </p>
                                        </form>
                                    </div>
                                </div>
                                <div />
                                <div className="row">
                                    <h6 className="mfl-tm-title">
                                        Generator Resources
                                    </h6>
                                    <hr />
                                    <div className="col s6">
                                        <form action="#">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="20KW Generators"
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p className="mfl-tm-resource">
                                                20KW Generators
                                            </p>
                                        </form>
                                    </div>
                                    <div className="col s6">
                                        <form action="#">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="40KW Generators"
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p className="mfl-tm-resource">
                                                40KW Generators
                                            </p>
                                        </form>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s6">
                                        <form action="#">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="60KW Generators"
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p className="mfl-tm-resource">
                                                60KW Generators
                                            </p>
                                        </form>
                                    </div>
                                    <div className="col s6">
                                        <form action="#">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="60KW Generators"
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p className="mfl-tm-resource">
                                                60KW Generators
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="input-field col s6">
                                <h6>Bed Resources</h6>
                                <hr />
                                <div className="row" />
                                <div className="col s6 mfl-tm-resource">
                                    <form action="#">
                                        <p class="range-field">
                                            <input
                                                type="range"
                                                id="Maternity Beds"
                                                min="0"
                                                max="100"
                                            />
                                        </p>
                                        <p className="mfl-tm-resource">
                                            Maternity Beds
                                        </p>
                                    </form>
                                </div>
                                <div className="col s6 mfl-tm-resource">
                                    <form action="#">
                                        <p class="range-field">
                                            <input
                                                type="range"
                                                id="Delivery Beds"
                                                min="0"
                                                max="100"
                                            />
                                        </p>
                                        <p className="mfl-tm-resource">
                                            Delivery Beds
                                        </p>
                                    </form>
                                </div>

                                <div className="row" />
                                <div className="col s6">
                                    <form action="#">
                                        <p class="range-field">
                                            <input
                                                type="range"
                                                id="Delivery Beds"
                                                min="0"
                                                max="100"
                                            />
                                        </p>
                                        <p className="mfl-tm-resource">
                                            Delivery Beds
                                        </p>
                                    </form>
                                </div>

                                <div className="col s6">
                                    <form action="#">
                                        <p class="range-field">
                                            <input
                                                type="range"
                                                id="Delivery Beds"
                                                min="0"
                                                max="100"
                                            />
                                        </p>
                                        <p className="mfl-tm-resource">
                                            Delivery Beds
                                        </p>
                                    </form>
                                </div>
                                <div className="row">
                                    <h6 className="mfl-tm-title2">
                                        Computer Resources
                                    </h6>
                                    <hr className="mfl-rule-resource" />
                                    <div className="col s6">
                                        <form action="#">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="Desktop Computers"
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p className="mfl-tm-resource">
                                                Desktop Computers
                                            </p>
                                        </form>
                                    </div>
                                    <div className="col s6">
                                        <form action="#">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="Laptop Computers"
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p className="mfl-tm-resource">
                                                Laptop Computers
                                            </p>
                                        </form>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s6">
                                        <form action="#">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="Tablets"
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p className="mfl-tm-resource">
                                                Tablets
                                            </p>
                                        </form>
                                    </div>
                                    <div className="col s6">
                                        <form action="#">
                                            <p class="range-field ">
                                                <input
                                                    className="mfl-color-slider"
                                                    type="range"
                                                    id="Mobile phones"
                                                    min="0"
                                                    max="100"
                                                    blue
                                                />
                                            </p>
                                            <p className="mfl-tm-resource">
                                                Mobile Phones
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

export default FacilityAddResources;
