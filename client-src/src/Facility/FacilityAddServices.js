//@flow
import React, { Component } from "react";
import footerResizer from "../helpers/footerResize";
import { Input } from "react-materialize";
import FacilityAddFooter from "./FacilityAddFooter";
import { connect } from "react-redux";

type Props = {
    handleNextForTabs: Function
};

class FacilityAddServices extends Component<Props> {
    componentDidMount() {
        footerResizer();
    }
    render() {
        // let serviceTypeOptions = <option>Select Service Type</option>;
        // if (this.props.serviceTypes.length > 0) {
        //     serviceTypeOptions = this.props.serviceTypes.map(st => (
        //         <option
        //             selected={st.id === serviceTypeId ? true : false}
        //             key={st.id}
        //             value={st.id}
        //         >
        //             {st.service_type}
        //         </option>
        //     ));
        // }

        // let serviceTypeInstanceOptions = <option>Select Instance Type</option>;
        // if (this.props.serviceTypes.length > 0) {
        //     serviceTypeInstanceOptions = this.props.typeServiceInstances.map(
        //         tsi => (
        //             <option key={tsi.id} value={tsi.id}>
        //                 {tsi.service_name}
        //             </option>
        //         )
        //     );
        // }
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
                            handleNextForTabs={this.props.handleNextForTabs}
                        />
                    </form>
                </div>
            </div>
        );
    }
}

export default FacilityAddServices;
