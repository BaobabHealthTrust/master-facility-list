//@flow
import React, { Component } from "react";
import { chunk } from "lodash";
import { connect } from "react-redux";
import type { Facility } from "../types/model-types";
import fetchFacilities from "../actions/get-facilities";

type Props = {
    allFacilities: Array<Facility>,
    fetchFacilities: Function
}

class Pagination extends Component<Props> {
    handleClick = (e) => {
        this.props.fetchFacilities(e.currentTarget.innerHTML);
    }
    render() {
        const paginatedArray = chunk(chunk(this.props.allFacilities, 15).map((facility, index) =>
            <li class="#!"><a onClick={this.handleClick}>{index + 1}</a></li>), 10)[0];
        return (
            <ul class="pagination  right">
                <li class="disabled">
                    <a href="#!">
                        <i class="material-icons">chevron_left</i>
                    </a>
                </li>
                {paginatedArray}
                <li class="waves-effect">
                    <a href="#!">
                        <i class="material-icons">chevron_right</i>
                    </a>
                </li>
            </ul>
        );
    }
}

const mapStateToProps = state => {
    return {
        allFacilities: state.facilities.all,
    }
};

export default connect(mapStateToProps, {
    fetchFacilities
})(Pagination);
