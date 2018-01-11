import React, { Component } from "react";

class AdvancedOwnershipRegulation extends Component {
    render() {
        let operationalStatusOptions = (
            <option>Select Operational Status</option>
        );
        if (this.props.operationalStatuses.length > 0) {
            operationalStatusOptions = this.props.operationalStatuses.map(o => (
                <option value={o.id}>{o.facility_operational_status}</option>
            ));
        }

        let facilityTypeOptions = <option>Select Facility Types</option>;
        if (this.props.facilityTypes.length > 0) {
            facilityTypeOptions = this.props.facilityTypes.map(o => (
                <option value={o.id}>{o.facility_type}</option>
            ));
        }

        let facilityOwnerOptions = <option>Select Facility Owner</option>;
        if (this.props.facilityOwners.length > 0) {
            facilityOwnerOptions = this.props.facilityOwners.map(fo => (
                <option value={fo.id}>{fo.facility_owner}</option>
            ));
        }

        // let regulatoryStatusOptions = <option>Select Regulatory Status</option>;
        // if (this.props.regulatoryStatuses.length > 0) {
        //     regulatoryStatusOptions = this.props.regulatoryStatuses.map(rs => (
        //         <option value={rs.id}>{rs.facility_regulatory_status}</option>
        //     ));
        // }


        return (
            <div className="container mfl-tm-5">
                <select
                    className="browser-default"
                    onChange={e =>
                        this.props.handleChange(
                            e,
                            "ADD_OPERATIONAL_STATUS_VALUES"
                        )
                    }
                >
                    <option value="0">-- Select Operational Status --</option>
                    {operationalStatusOptions}
                </select>
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
                <br />
                <select
                    className="browser-default"
                    onChange={e =>
                        this.props.handleChange(e, "ADD_FACILITY_OWNER_VALUES")
                    }
                >
                    <option value="0">-- Select Facility Owners --</option>
                    {facilityOwnerOptions}
                </select>
                <br />
                {/* <select
                    className="browser-default"
                    onChange={e =>
                        this.props.handleChange(e, "ADD_REGULATORY_STATUS_VALUES")
                    }
                >
                    <option value="0">-- Select Regulatory Status --</option>
                    {regulatoryStatusOptions}
                </select> */}
            </div>
        );
    }
}

export default AdvancedOwnershipRegulation;
