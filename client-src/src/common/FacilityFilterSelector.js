//@flow
import React, { Component } from 'react';
import type { District } from  "../types/model-types";
import { connect } from "react-redux";
import fetchResults from "../actions/fetch-basic-details-results";


type Props = {
    data: Array<District>,
    displayKey: string,
    entity: string,
    fetchResults: Function,
    addSearchValues: Function,
    actionType: string,
    searchValues: number[]
}

class FacilityFilterSelector extends Component<Props> {

    handleClick = async (e: SyntheticEvent<HTMLButtonElement>) => {
        await this.props.addSearchValues(e, this.props.actionType);
        await this.props.fetchResults(this.props.searchValues);
    }

    render() {
        return (
            <nav className="grey lighten-3 mfl-filter-container">
                <div class="mfl-filter-wrapper">
                    {
                        this.props.data.map(entity => {
                            return (
                                <span className="mfl-p-2">
                                    <input
                                        type="checkbox"
                                        id={entity.id}
                                        onClick={this.handleClick}
                                        value={entity.id}
                                    />
                                    <label for={entity.id}>{entity[this.props.displayKey]}</label>
                                </span>
                            )
                        })
                    }
                </div>
            </nav>
        );
    }
}

const mapStateToprops = state => {
    return {
        searchValues: state.advancedSearchValues,

    }
}

export default connect(mapStateToprops, { fetchResults })(FacilityFilterSelector);