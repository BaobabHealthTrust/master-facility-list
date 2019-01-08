import React, { Component } from "react";

class AdvancedFacilityType extends Component {
    render() {
        let facilityTypeOptions = <option>Select Facility Types</option>;
        if (this.props.facilityTypes.length > 0) {
            facilityTypeOptions = this.props.facilityTypes.map(fy => (
                <option value={fy.id}>{fy.facility_type}</option>
            ));
        }

        return (
            <div className="container mfl-tm-5">
                <br />
                <select
                    className="browser-default"
                    onChange={e =>
                        this.props.handleChange(e, "ADD_FACILITY_TYPE_VALUES")
                    }
                >
                    <option value="0">-- Select Facility Types --</option>
                    {facilityTypeOptions}
                </select>
            </div>
        );
    }
}

export default AdvancedFacilityType;
