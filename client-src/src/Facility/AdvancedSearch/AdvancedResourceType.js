import React, { Component } from "react";

class AdvancedResourceType extends Component {
    render() {
      

        let resourceTypeOptions = <option>Select Resource Type</option>;
        if (this.props.resourceType.length > 0) {
            resourceTypeOptions = this.props.resourceType.map(rs => (
                <option value={rs.id}>{rs.facility_resource}</option>
            ));
        }


        return (
            <div className="container mfl-tm-5">
                <select
                    className="browser-default"
                    onChange={e =>
                        this.props.handleChange(
                            e,
                            "ADD_RESOURCE_TYPE_VALUES"
                        )
                    }
                >
                    <option value="0">-- Select Operational Status --</option>
                    {resourceTypeOptions}
                </select>
                <br />

            </div>
        );
    }
}

export default AdvancedResourceType;
