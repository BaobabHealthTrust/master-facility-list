import React, { Component } from "react";
import Card from "../common/MflCard";
import fetchCurrentResources from "../actions/fetch-current-resources";
import setCurrentDetails from "../actions/set-current-details";
import fetchCurrentDetails from "../actions/fetch-current-details";
import fetchResourceTypes from "../actions/fetch-resource-types";
import { connect } from "react-redux";
import { uniq, chunk } from "lodash";

class FacilityResources extends Component {
    async componentDidMount() {
        const id = this.props.match.params.id;

        if (this.props.facilities.length > 0) {
            await this.props.setCurrentDetails(this.props.facilities, id);
        }

        await this.props.fetchCurrentDetails(id);
        await this.props.fetchResourceTypes();
        await this.props.fetchCurrentResources(id);
    }

    render() {
        const resourceTypeIds = uniq(
            this.props.resources.map(res => res.resource_type_id)
        );

        const presentTypes = this.props.resourceTypes.filter(res =>
            resourceTypeIds.includes(res.id)
        );

        const cards = chunk(presentTypes, 3);

        const transportData = [[]];

        const bedData = [
            ["maternity beds", "12"],
            ["delivery beds", "10"],
            ["inpatient beds", "9"]
        ];

        const generatorData = [
            ["40 Watt generator", "12"],
            ["60 Watt generator", "10"],
            ["100 Watt generator", "9"],
            ["200 Watt generator", "3"]
        ];

        const computerData = [
            ["desktops", "12"],
            ["laptops", "10"],
            ["Tablets", "9"],
            ["touchscreen", "3"]
        ];

        const buildingData = [["staff", "12"], ["other", "10"]];

        return (
            <div className="container">
                <br />
                {cards.map(card => {
                    return (
                        <div className="row">
                            {card.map(type => {
                                return (
                                    <div className="col m4 s12">
                                        <Card
                                            heading={type.resource_type}
                                            data={transportData}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        resources: state.facilities.currentResources,
        facilities: state.facilities.list,
        isLoading: state.facilities.isLoading,
        resourceTypes: state.dependancies.resourceTypes
    };
};

export default connect(mapStateToProps, {
    fetchCurrentResources,
    fetchCurrentDetails,
    setCurrentDetails,
    fetchResourceTypes
})(FacilityResources);
