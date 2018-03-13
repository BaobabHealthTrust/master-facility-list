//@flow
import React, { Component } from "react";
import footerResizer from "../helpers/footerResize";
import { connect } from "react-redux";
import { Input } from "react-materialize";
import FacilityAddFooter from "./FacilityAddFooter";
import { addFormValues, postFormData } from "../actions";

type Props = {
    handleNextForTabs: Function
};

class FacilityAddResources extends Component<Props> {
    async submitFormData(e) {
        //await alert(this.props.commonName);
        e.preventDefault();
    }

    rangeValues(e){
        console.log(e.target.value);
    }

    componentDidMount() {
        footerResizer();
    }
    render() {
        return (
            <div>
                <div class="row">
                    <form
                        onSubmit={e => this.submitFormData(e)}
                        className="col s12"
                    >
                        <div class="row">
                            <div class="input-field col s6">
                                <h6>Transport Resources</h6>
                                <hr />
                                <div className="row">
                                    <div className="col s6">
                                            <p className="range-field">
                                                <input
                                                    type="range"
                                                    id="ambulances"
                                                    name="ambulances"
                                                    value={this.props.ambulance}
                                                    min="0"
                                                    max="100"
                                                    onChange={e =>
                                                        this.props.addFormValues(
                                                            e.target.value, "AMBULANCE"
                                                        )
                                                    }
                                                />
                                            </p>
                                            <p className="mfl-tm-resource">
                                                Ambulances
                                            </p>
                                    </div>
                                    <div className="col s6">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="vehicles"
                                                    name="vehicles"
                                                    value=""
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p className="mfl-tm-resource">
                                                Vehicles
                                            </p>
                                    </div>
                                    <div className="row" />
                                    <div className="col s6">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="motor_cycles"
                                                    name="motor_cycles"
                                                    value=""
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p className="mfl-tm-resource">
                                                Motor Cycles
                                            </p>
                                    </div>

                                    <div className="col s6">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="bike_ambulances"
                                                    name="bike_ambulances"
                                                    value=""
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p className="mfl-tm-resource">
                                                Bike Ambulances
                                            </p>
                                    </div>
                                </div>
                                <div />
                                <div className="row">
                                    <h6 className="mfl-tm-title">
                                        Generator Resources
                                    </h6>
                                    <hr />
                                    <div className="col s6">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="20kw_generators"
                                                    name="20kw_generators"
                                                    value=""
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p className="mfl-tm-resource">
                                                20KW Generators
                                            </p>
                                    </div>
                                    <div className="col s6">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="40kw_generators"
                                                    name="40kw_generators"
                                                    value=""
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p className="mfl-tm-resource">
                                                40KW Generators
                                            </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s6">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="30kw_generators"
                                                    name="30kw_generators"
                                                    value=""
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p className="mfl-tm-resource">
                                                30KW Generators
                                            </p>
                                    </div>
                                    <div className="col s6">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="60kw_generators"
                                                    name="60kw_generators"
                                                    value=""
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p className="mfl-tm-resource">
                                                60KW Generators
                                            </p>
                                    </div>
                                </div>
                            </div>
                            <div class="input-field col s6">
                                <h6>Bed Resources</h6>
                                <hr />
                                <div className="row" />
                                <div className="col s6 mfl-tm-resource">
                                        <p class="range-field">
                                            <input
                                                type="range"
                                                id="maternity_beds"
                                                name="maternity_beds"
                                                value=""
                                                min="0"
                                                max="100"
                                            />
                                        </p>
                                        <p className="mfl-tm-resource">
                                            Maternity Beds
                                        </p>
                                </div>
                                <div className="col s6 mfl-tm-resource">
                                        <p class="range-field">
                                            <input
                                                type="range"
                                                id="delivery_beds"
                                                name="delivery_beds"
                                                value=""
                                                min="0"
                                                max="100"
                                            />
                                        </p>
                                        <p className="mfl-tm-resource">
                                            Delivery Beds
                                        </p>
                                </div>

                                <div className="row" />
                                <div className="col s6">
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
                                </div>

                                <div className="col s6">
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
                                </div>
                                <div className="row">
                                    <h6 className="mfl-tm-title2">
                                        Computer Resources
                                    </h6>
                                    <hr className="mfl-rule-resource" />
                                    <div className="col s6">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="desktop_computers"
                                                    name="desktop_computers"
                                                    value=""
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p className="mfl-tm-resource">
                                                Desktop Computers
                                            </p>
                                    </div>
                                    <div className="col s6">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="laptop_computers"
                                                    name="laptop_computers"
                                                    value=""
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p className="mfl-tm-resource">
                                                Laptop Computers
                                            </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s6">
                                            <p class="range-field">
                                                <input
                                                    type="range"
                                                    id="tablets"
                                                    name="tablets"
                                                    value=""
                                                    min="0"
                                                    max="100"
                                                />
                                            </p>
                                            <p className="mfl-tm-resource">
                                                Tablets
                                            </p>
                                    </div>
                                    <div className="col s6">
                                            <p class="range-field ">
                                                <input
                                                    className="mfl-color-slider"
                                                    type="range"
                                                    id="mobile_phones"
                                                    name="mobile_phones"
                                                    value=""
                                                    min="0"
                                                    max="100"
                                                    blue
                                                />
                                            </p>
                                            <p className="mfl-tm-resource">
                                                Mobile Phones
                                            </p>
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
const mapStateToProps = state => {
    return {
        ambulance: state.formValues.ambulance
    };
};

export default connect(mapStateToProps, {addFormValues, postFormData}) (FacilityAddResources);
