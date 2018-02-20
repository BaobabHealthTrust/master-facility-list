import React, { Component } from "react";
import Card from "../common/MflCard";
import { fetchCurrentDetails, fetchCurrentResources, fetchResourceTypes, setCurrentDetails } from "../actions";
import { connect } from "react-redux";
import { uniq, chunk } from "lodash";

class FacilityResources extends Component {
    async componentDidMount() {
        const id = this.props.match.params.id;
        await this.props.fetchCurrentDetails(id);
        await this.props.fetchResourceTypes();
        await this.props.fetchCurrentResources(id);
    }

    getResourceTypeIcon(resourceType) {
        switch (resourceType.toUpperCase()) {
            case "TRANSPORT":
                return "directions_bus";
            case "BEDS":
                return "airline_seat_individual_suite";
            case "GENERATORS":
                return "flash_off";
            case "COMPUTERS":
                return "computer";
            case "HOUSING":
                return "home";
            default:
                return "local_hospital";
        }
    }

    render() {
        const presentTypes = this.props.resourceTypes.filter(res =>
            uniq(
                this.props.resources.map(res => res.resource.resource_type_id)
            ).includes(res.id)
        );

        const cards = chunk(presentTypes, 3);

        return (
            <div className="container mfl-container">
                <br />
                {cards.map(card => {
                    return (
                        <div className="row">
                            {card.map(type => {
                                const data = this.props.resources
                                    .filter(
                                    res =>
                                        res.resource.resource_type_id ===
                                        type.id
                                    )
                                    .map(res => [
                                        res.resource.resource_name,
                                        res.quantity
                                    ]);
                                return (
                                    <div className="col m4 s12">
                                        <Card
                                            heading={type.resource_type}
                                            data={data}
                                            icon={this.getResourceTypeIcon(
                                                type.resource_type
                                            )}
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
