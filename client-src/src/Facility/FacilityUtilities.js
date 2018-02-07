import React, { Component } from "react";
import Card from "../common/MflCard";
import fetchCurrentUtilities from "../actions/fetch-current-utilities";
import setCurrentDetails from "../actions/set-current-details";
import fetchCurrentDetails from "../actions/fetch-current-details";
import fetchUtilityTypes from "../actions/fetch-utility-types";
import { connect } from "react-redux";
import { uniq, chunk } from "lodash";

class FacilityUtilities extends Component {
    async componentDidMount() {
        const id = this.props.match.params.id;

        await this.props.fetchCurrentDetails(id);
        await this.props.fetchUtilityTypes();
        await this.props.fetchCurrentUtilities(id);
    }

    getResourceTypeIcon(utilityType) {
        switch (utilityType.toUpperCase()) {
            case "ENERGY PROVIDER":
                return "lightbulb_outline";
            case "WATER PROVIDER":
                return "opacity";
            case "WASTE DISPOSAL":
                return "wc";
            case "NETWORK PROVIDER":
                return "wifi";
            default:
                return "local_hospital";
        }
    }

    render() {
        const presentTypes = this.props.utilityTypes.filter(util =>
            uniq(
                this.props.utilities.map(util => util.utility.utility_type_id)
            ).includes(util.id)
        );

        const cards = chunk(presentTypes, 3);

        return (
            <div className="container mfl-container">
                <br />
                {cards.map(card => {
                    return (
                        <div className="row">
                            {card.map(type => {
                                const data = this.props.utilities
                                    .filter(
                                    util =>
                                        util.utility.utility_type_id ===
                                        type.id
                                    )
                                    .map(util => [util.utility.utility_name]);
                                return (
                                    <div className="col m4 s12">
                                        <Card
                                            heading={type.utility_type}
                                            data={data}
                                            icon={this.getResourceTypeIcon(
                                                type.utility_type
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
        utilities: state.facilities.currentUtilities,
        facilities: state.facilities.list,
        isLoading: state.facilities.isLoading,
        utilityTypes: state.dependancies.utilityTypes
    };
};

export default connect(mapStateToProps, {
    fetchCurrentUtilities,
    fetchCurrentDetails,
    setCurrentDetails,
    fetchUtilityTypes
})(FacilityUtilities);
