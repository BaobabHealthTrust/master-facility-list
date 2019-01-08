//@flow
import React, {Component} from "react";
import Card from "../../common/MflCard";
import {
  fetchCurrentDetails,
  fetchCurrentResources,
  fetchResourceTypes,
  setCurrentDetails
} from "../../actions";
import {connect} from "react-redux";
import {uniq, chunk} from "lodash";
import {Resource, Facility, ResourceType} from "../../types/model-types";
import {MflAlert} from "../../common";
import {Loader} from "../../common";

type Props = {
  resources: Array<Resource>,
  facilities: Array<Facility>,
  resourceTypes: Array<ResourceType>
};
class Resources extends Component<Props> {
  state = {
    isEditResources: false,
    error: {},
    loading: true
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading) this.setState({loading: false});
    const {error} = this.props;
    this.setState({error});
  }

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
    const presentTypes = this.props.resources
      ? this.props.resourceTypes.filter(res =>
          uniq(
            this.props.resources.map(res => res.resource.resource_type_id)
          ).includes(res.id)
        )
      : [];

    const cards = chunk(presentTypes, 3);

    return (
      <div className="container">
        {cards.length == 0 ? (
          <MflAlert message={"Resources are not available for this facility"} />
        ) : (
          ""
        )}
        {this.state.loading ? (
          <Loader />
        ) : (
          <div>
            {cards.map(card => {
              return (
                <div className="row">
                  {card.map(type => {
                    const data = this.props.resources
                      .filter(res => res.resource.resource_type_id === type.id)
                      .map(res => [
                        res.resource.resource_name,
                        String(res.quantity)
                      ]);
                    return (
                      <div className="col m4 s12">
                        <Card
                          heading={type.resource_type}
                          data={data}
                          icon={this.getResourceTypeIcon(type.resource_type)}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    resources: state.facilities.currentResources.data,
    facilities: state.facilities.list,
    isLoading: state.facilities.isLoading,
    error: state.facilities.error,
    resourceTypes: state.dependancies.resourceTypes
  };
};

export default connect(
  mapStateToProps,
  {
    fetchCurrentResources,
    fetchCurrentDetails,
    setCurrentDetails,
    fetchResourceTypes
  }
)(Resources);
