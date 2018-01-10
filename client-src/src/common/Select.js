import React, { Component } from "react";

class Select extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <select>
                {this.props.options.map(option => {
                    return <option>{option}</option>
                })}
            </select>
        )
    }
}

export default Select;
