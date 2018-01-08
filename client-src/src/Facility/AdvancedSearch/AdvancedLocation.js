import React, { Component } from "react";

class AdvancedLocation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let options = <option>Select District</option>;
        if (this.props.districts.length > 0) {
            options = this.props.districts.map(d => (
                <option value={d.id}>{d.district_name}</option>
            ));
        }

        return (
            <div className="container mfl-tm-5">
                <select
                    className="browser-default"
                    onChange={e =>
                        this.props.handleChange(e, "ADD_DISTRICT_VALUES")
                    }
                >
                    <option value="0">-- Select District --</option>
                    {options}
                </select>
            </div>
        );
    }
}

export default AdvancedLocation;
