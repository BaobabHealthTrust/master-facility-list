import React, { Component } from "react";
import footerResizer from "../helpers/footerResize";
import { Input } from "react-materialize";
import FacilityAddFooter from "./FacilityAddFooter";

class FacilityAddUtilities extends Component {
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
                                <input
                                    id="facility_name"
                                    type="text"
                                    class="validate"
                                />
                                <label for="facility_name">Facility Name</label>
                            </div>
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
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input
                                    id="facility_name"
                                    type="text"
                                    class="validate"
                                />
                                <label for="facility_name">Facility Name</label>
                            </div>
                            <div class="input-field col s6">
                                <input
                                    id="operational_status"
                                    type="text"
                                    class="validate"
                                />
                                <label for="operational_status">
                                    Operational Status
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input
                                    id="facility_name"
                                    type="text"
                                    class="validate"
                                />
                                <label for="facility_name">Facility Name</label>
                            </div>
                            <div class="input-field col s6">
                                <input
                                    id="operational_status"
                                    type="text"
                                    class="validate"
                                />
                                <label for="operational_status">
                                    Operational Status
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input
                                    id="facility_name"
                                    type="text"
                                    class="validate"
                                />
                                <label for="facility_name">Facility Name</label>
                            </div>
                            <div class="input-field col s6">
                                <input
                                    id="operational_status"
                                    type="text"
                                    class="validate"
                                />
                                <label for="operational_status">
                                    Operational Status
                                </label>
                            </div>
                        </div>
                        <FacilityAddFooter />
                    </form>
                </div>
            </div>
        );
    }
}

export default FacilityAddUtilities;
