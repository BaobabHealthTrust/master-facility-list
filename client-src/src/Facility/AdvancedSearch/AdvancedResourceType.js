import React, { Component } from "react";
import { connect } from "react-redux";

class AdvancedResourceType extends Component {
    // componentDidMount() {
    //     alert('hello')
    // }

    render() {
        const resourceTypeId =
            (this.props.typeResourceInstances.length > 0 &&
                this.props.typeResourceInstances[0].resource_type_id) ||
            0;

        let resourceTypeOptions = <option>Select Resource Type</option>;
        if (this.props.resourceTypes.length > 0) {
            resourceTypeOptions = this.props.resourceTypes.map(rt => (
                <option
                    selected={rt.id === resourceTypeId ? true : false}
                    key={rt.id}
                    value={rt.id}
                >
                    {rt.resource_type}
                </option>
            ));
        }

        let resourceTypeInstanceOptions = <option>Select Instance Type</option>;
        if (this.props.typeResourceInstances.length > 0) {
            resourceTypeInstanceOptions = this.props.typeResourceInstances.map(
                ti => (
                    <option key={ti.id} value={ti.id}>
                        {ti.resource_name}
                    </option>
                )
            );
        }

        return (
            <div className="container mfl-tm-5">
                <select
                    className="browser-default"
                    onChange={e => this.props.handleChange(e)}
                >
                    <option value="0">-- Select Resource Type --</option>
                    {resourceTypeOptions}
                </select>

                <br />
                {this.props.typeResourceInstances.length > 0 ? (
                    <select
                        className="browser-default"
                        onChange={e =>
                            this.props.handleChangeAddSearchValue(
                                e,
                                "ADD_RESOURCE_TYPE_INSTANCE"
                            )
                        }
                    >
                        <option value="0">-- Select Instance Type --</option>
                        {resourceTypeInstanceOptions}
                    </select>
                ) : (
                    ""
                )}
            </div>
        );
    }
}
const mapStateToprops = state => {
    return {
        typeResourceInstances: state.facilities.typeResourceInstances
    };
};

export default connect(mapStateToprops, {})(AdvancedResourceType);
