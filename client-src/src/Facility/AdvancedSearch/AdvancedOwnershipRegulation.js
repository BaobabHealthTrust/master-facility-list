import React, { Component } from "react";

class AdvancedOwnershipRegulation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let operationalStatusOptions = (
            <option>Select Operational Status</option>
        );
        if (this.props.operationalStatuses.length > 0) {
            operationalStatusOptions = this.props.operationalStatuses.map(o => (
                <option value={o.id}>{o.facility_operational_status}</option>
            ));
        }

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
            </div>
        );
    }
}

export default AdvancedOwnershipRegulation;
