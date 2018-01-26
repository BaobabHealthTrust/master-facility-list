import React, { Component } from "react";
import { connect } from "react-redux";

class AdvancedServiceType extends Component {

    render() {
        const serviceTypeId = (this.props.typeServiceInstances.length > 0 && this.props.typeServiceInstances[0].service_type_id) || 0;

        let serviceTypeOptions = <option>Select Service Type</option>;
        if (this.props.serviceTypes.length > 0) {
            serviceTypeOptions = this.props.serviceTypes.map(st => (
                <option selected={st.id === serviceTypeId ? true : false} key={st.id} value={st.id}>{st.service_type}</option>
            ));
        }

        let serviceTypeInstanceOptions = <option>Select Instance Type</option>;
        if (this.props.serviceTypes.length > 0) {
            serviceTypeInstanceOptions = this.props.typeServiceInstances.map(tsi => (
                <option key={tsi.id} value={tsi.id}>{tsi.service_name}</option>
            ));
        }

        return (
            <div className="container mfl-tm-5">

                <select
                    className="browser-default"
                    onChange={e =>
                        this.props.handleChange(e)
                    }
                >
                    <option value="0">-- Select Service Type --</option>
                    {serviceTypeOptions}
                </select>


                <br />
                {this.props.typeServiceInstances.length > 0 ? (
                    <select
                        className="browser-default"
                        onChange={e =>
                            this.props.handleChangeAddSearchValue(e, "ADD_SERVICE_TYPE_INSTANCE")
                        }
                    >
                        <option value="0">-- Select Instance Type --</option>
                        {serviceTypeInstanceOptions}
                    </select>) : ""
                }

            </div>
        );
    }
}
const mapStateToprops = state => {
    return {
        typeServiceInstances: state.facilities.typeServiceInstances,
    }
};

export default connect(mapStateToprops, {})(AdvancedServiceType);
