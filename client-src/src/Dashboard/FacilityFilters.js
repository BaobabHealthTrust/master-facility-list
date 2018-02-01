//@flow
import React from "react";
import SecondaryMenu from "../common/SecondaryMenu";
import { connect } from "react-redux";
import type { District } from "../types/model-types";
import fetchDistricts from "../actions/fetch-districts";
import FacilityFilterSelector from "../common/FacilityFilterSelector";

// TODO: These need to be flow compatible
type Props = any;

type State = {
    dataSource: Array<District>,
    displayKey: string,
    entity: string
};

class FacilityFilters extends React.Component<Props, State> {

    state = {
        dataSource: [],
        displayKey: "",
        entity: ""
    }

    componentDidMount() {
        this.props.fetchDistricts()
    }

    resetState = () => {
        this.setState({
            dataSource: [],
            displayKey: "",
            entity: ""
        })
    }

    render() {
        const links = [
            {
                name: 'district',
                displayName: 'District',
                redirect: null,
                clickHandler: () => {
                    this.state.entity != "districts" ? (
                        this.setState({
                            dataSource: this.props.districts,
                            displayKey: "district_name",
                            entity: "districts"
                        })
                    ) : this.resetState()
                }
            },
            {
                name: 'facilityType',
                displayName: 'Facility Type',
                redirect: null,
                clickHandler: () => { alert("you clicked Facility Type! Congrats...") }
            },
            {
                name: 'facilityOwnership',
                displayName: 'Facility Ownership',
                redirect: null,
                clickHandler: () => { alert("you clicked Facility Ownership! Congrats...") }
            },
            {
                name: 'operationalStatus',
                displayName: 'Operational Status',
                redirect: null,
                clickHandler: () => { alert("you clicked Operational Status! Congrats...") }
            }
        ]
        return (
            <div>
                <SecondaryMenu links={links} defaultActivePage={"zone"} />
                {
                    this.state.dataSource.length > 0 && <FacilityFilterSelector
                        data={this.state.dataSource}
                        displayKey={this.state.displayKey}
                        entity={this.state.entity}
                    />

                }

            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        districts: store.dependancies.districts
    }
}

export default connect(mapStateToProps, {
    fetchDistricts
})(FacilityFilters);
