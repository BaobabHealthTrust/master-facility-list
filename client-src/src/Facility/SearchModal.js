import React, { Component } from "react";
import { Tabs, Tab } from "react-materialize";
import AdvancedLocation from "./AdvancedSearch/AdvancedLocation"
import { connect } from "react-redux";
import addSearchValues from "../actions/add-search-values";

class SearchModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDistricts: []
        }
    }

    getDistrictNames(districts) {
        return this.props.districts
            .filter(d => districts.includes(d.id.toString()))
            .map(d => d.district_name);
    }

    handleDistrictValueChange(e) {
        console.log(e.target.value);
        const districts = this.state.selectedDistricts;
        districts.push(e.target.value);

        this.setState({
            selectedDistricts: districts
        })
        console.log(this.state.selectedDistricts)
    }

    render() {
        return (
            <div id="advanced-search" ref="advancedSearch" class="modal-lg">

                <div class="modal-content">
                    <div className="mfl-bm-2">
                        <span className="mfl-modal-header">Advanced Search</span>
                        <span className="mfl-modal-close right">
                            <a href="#!" onClick={(e) => this.props.handleClose(e)}>
                                <i class="material-icons">close</i>
                            </a>
                        </span>
                    </div>
                    <Tabs className='tab-demo z-depth-1 blue text-white'>
                        <Tab title="Location" className="advanced-search-container" active>
                            <AdvancedLocation
                                districts={this.props.districts}
                                handleChange={(v) => this.handleDistrictValueChange(v)}
                            />
                        </Tab>
                        <Tab title="Facility Type">Test 2</Tab>
                        <Tab title="Services">Test 3</Tab>
                        <Tab title="Resources">Test 4</Tab>
                    </Tabs>
                </div>
                <div class="modal-footer">
                    <div className="advanced-search-tag-container">
                        {this.getDistrictNames(this.state.selectedDistricts).map(d => {
                            return (
                                <div class="chip">
                                    {d}
                                    <i class="close material-icons">close</i>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        searchValues: state.advancedSearchValues,
        districts: state.dependancies.districts
    }
}

export default connect(mapStateToProps, { addSearchValues })(SearchModal);
