//@flow
import React, { Component } from "react";
import { chunk } from "lodash";
import { connect } from "react-redux";
import type { Facility } from "../types/model-types";
import fetchFacilities from "../actions/get-facilities";
import { fetchAdvancedSearchResults } from "../actions/actionsIndex/";


type Props = {
    allFacilities: Array<Facility>,
    fetchFacilities: Function,
    fetchFilteredResults: Function,
    filteredResults: number[],
}
type State = {
    pageNumber: number,
}

class Pagination extends Component<Props, State> {
    state = {
        pageNumber: 1,
    }
    handleClick = async (e) => {
        await e.currentTarget.innerHTML === "Next" ? this.setState({ pageNumber: this.state.pageNumber + 1 }) : (this.setState({ pageNumber: this.state.pageNumber - 1 })),
            this.props.filteredResults.length === 0 ? (await this.props.fetchFacilities(this.state.pageNumber)) : ("");
    }


    render() {
        this.props.filteredResults.length > 0 && this.props.fetchFilteredResults(chunk(this.props.filteredResults, 10)[this.state.pageNumber - 1])

        return (
            <ul className="pagination  right">

                {this.state.pageNumber > 1 && <li className="waves-effect waves-light btn blue">
                    <a className="white-text" onClick={this.handleClick}>Previous</a>
                </li>}
                {" "}
                <li className="waves-effect waves-light btn blue">
                    <a className="white-text" onClick={this.handleClick}>Next</a>
                </li>
            </ul>
        );
    }
}

const mapStateToProps = state => {
    return {
        allFacilities: state.facilities.all,
        filteredResults: state.searchResults.advancedSearchFacilities.basicDetailsFacilities,
    }
};

export default connect(mapStateToProps, {
    fetchFacilities,
    fetchAdvancedSearchResults,
})(Pagination);
