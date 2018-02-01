//@flow
import React, { Component } from 'react';
import type { District } from  "../types/model-types";

type Props = {
    data: Array<District>,
    displayKey: string,
    entity: string
}

export default class FacilityFilterSelector extends Component<Props> {
    render() {
        return (
            <nav className="grey lighten-3 mfl-filter-container">
                <div class="mfl-filter-wrapper">
                    {
                        this.props.data.map(entity => {
                            return (
                                <span className="mfl-p-2">
                                    <input type="checkbox" id={entity.id} />
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