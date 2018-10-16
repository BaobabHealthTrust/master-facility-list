//@flow
import React from "react";
import { Tabs, Tab } from "react-materialize";
import AdvancedLocation from "./AdvancedSearch/AdvancedLocation";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  addSearchValues,
  fetchAdvancedSearchResults,
  fetchBasicDetailsResults,
  fetchBasicResourceDetailsResults,
  fetchBasicUtilityDetailsResults,
  fetchBasicServiceDetailsResults,
  fetchCurrentDetails,
  fetchResourceTypeInstances,
  fetchUtilityTypeInstances,
  fetchServiceTypeInstances,
  removeResultsValues,
  removeSearchValues
} from "../actions";
import SearchTag from "./AdvancedSearch/SearchTag";
import { map, intersection } from "lodash";
import AdvancedOwnershipRegulation from "./AdvancedSearch/AdvancedOwnershipRegulation";
import AdvancedFacilityType from "./AdvancedSearch/AdvancedFacilityType";
import AdvancedResourceType from "./AdvancedSearch/AdvancedResourceType";
import AdvancedUtilityType from "./AdvancedSearch/AdvancedUtilityType";
import AdvancedServiceType from "./AdvancedSearch/AdvancedServiceType";
import { Loader } from "../common";

import styled from "styled-components";

const DisplayButton = styled.div.attrs({ className: "btn" })`
  width: 20%;
`;
const CloseButton = styled.div.attrs({
  className: "mfl-modal-close right cursor-pointer"
})``;
const SearchResultsPanel = styled.div.attrs({
  className: "mfl-search-feedback flex justify-between align-center w-full"
})``;
const ModalHeader = styled.div.attrs({
  className: "mfl-bm-2 flex justify-between w-full"
})``;
const ModalFooter = styled.div.attrs({ className: "modal-footer" })``;
const TagContainer = styled.div.attrs({
  className: "advanced-search-tag-container"
})``;
const ModalContent = styled.div.attrs({ className: "modal-content" })``;
const ModalContainer = styled.div.attrs({
  className: "container mt-8",
  id: "advanced-search",
  ref: "advancedSearch"
})``;

const searchActions = {
  ADD_DISTRICT_VALUES: "ADD_DISTRICT_VALUES"
};

const tagValueMapper = [
  ["districtValues", "districts", "district_name", "REMOVE_DISTRICT_VALUES"],
  [
    "operationalStatusValues",
    "operationalStatuses",
    "facility_operational_status",
    "REMOVE_OPERATIONAL_STATUS_VALUES"
  ],
  [
    "facilityTypeValues",
    "facilityTypes",
    "facility_type",
    "REMOVE_FACILITY_TYPE_VALUES"
  ],
  [
    "facilityOwnerValues",
    "facilityOwners",
    "facility_owner",
    "REMOVE_FACILITY_OWNER_VALUES"
  ],
  [
    "regulatoryStatusValues",
    "regulatoryStatuses",
    "facility_regulatory_status",
    "REMOVE_REGULATORY_STATUS_VALUES"
  ],
  [
    "typeResourceInstanceValues",
    "resources",
    "resource_name",
    "REMOVE_RESOURCE_TYPE_INSTANCES"
  ],
  [
    "typeUtilityInstanceValues",
    "utilities",
    "utility_name",
    "REMOVE_UTILITY_TYPE_INSTANCES"
  ],
  [
    "typeServiceInstanceValues",
    "services",
    "service_name",
    "REMOVE_SERVICE_TYPE_INSTANCES"
  ]
];

class SearchModal extends React.Component<{}> {
  state = {
    activeTab: "Location",
    loading: false,
    redirect: false,
    results: 0,
    containerHeight: 0
  };

  componentDidMount() {
    const containerHeight = window.innerHeight - 157;
    this.setState({ containerHeight });
  }

  componentWillReceiveProps(nextProps) {
    const results = nextProps.results ? nextProps.results.length : 0;
    if (results > 0 && this.state.results - results != 0) {
      this.setState({ loading: false, results });
    }
  }

  handleAddSearchValue = async (e, type) => {
    this.setState({ loading: true });
    await this.props.addSearchValues(e, type);
    await this.props.fetchBasicResourceDetailsResults(this.props.searchValues);
    await this.props.fetchBasicUtilityDetailsResults(this.props.searchValues);
    await this.props.fetchBasicServiceDetailsResults(this.props.searchValues);
    await this.props.fetchBasicDetailsResults(this.props.searchValues);
  };

  handleRemoveResults = async () => {
    this.setState({ loading: true });
    await this.props.removeSearchValues("", "REMOVE_ALL_SEARCH_VALUES");
    await this.props.removeResultsValues();
  };

  handleSearchTypeResourceInstances = e => {
    this.props.fetchResourceTypeInstances(e.target.value);
  };
  handleSearchTypeUtilityInstances = e => {
    this.props.fetchUtilityTypeInstances(e.target.value);
  };
  handleSearchTypeServiceInstances = e => {
    this.props.fetchServiceTypeInstances(e.target.value);
  };

  closeModal = async () => {
    await this.props.removeResultsValues();
    await this.props.removeSearchValues(0, "REMOVE_ALL_SEARCH_VALUES");
    await this.setState({ redirect: true });
  };

  getResultCount = results => (results ? results.length : 0);

  renderDisplayButton = () => (
    <DisplayButton onClick={() => this.setState({ redirect: true })}>
      Get Search Results
    </DisplayButton>
  );

  renderTabLoader = tab => {
    if (this.state.loading) return () => <Loader />;
    else return tab;
  };

  renderAdvancedLocation = () => (
    <AdvancedLocation
      districts={this.props.districts}
      handleChange={(e, type) => this.handleAddSearchValue(e, type)}
      action={searchActions.ADD_DISTRICT_VALUES}
    />
  );

  renderAdvancedOwnershipRegulation = () => (
    <AdvancedOwnershipRegulation
      operationalStatuses={this.props.operationalStatuses}
      facilityTypes={this.props.facilityTypes}
      facilityOwners={this.props.facilityOwners}
      regulatoryStatuses={this.props.regulatoryStatuses}
      handleChange={(e, type) => this.handleAddSearchValue(e, type)}
    />
  );

  renderAdvancedFacilityTypes = () => (
    <AdvancedFacilityType
      facilityTypes={this.props.facilityTypes}
      handleChange={(e, type) => this.handleAddSearchValue(e, type)}
    />
  );

  renderAdvancedResourceTypes = () => (
    <AdvancedResourceType
      resourceTypes={this.props.resourceTypes}
      handleChange={e => this.handleSearchTypeResourceInstances(e)}
      handleChangeAddSearchValue={(e, type) =>
        this.handleAddSearchValue(e, type)
      }
    />
  );

  renderAdvancedUtilityTypes = () => (
    <AdvancedUtilityType
      utilityTypes={this.props.utilityTypes}
      handleChange={e => this.handleSearchTypeUtilityInstances(e)}
      handleChangeAddSearchValue={(e, type) =>
        this.handleAddSearchValue(e, type)
      }
    />
  );

  renderAdvancedServices = () => (
    <AdvancedServiceType
      serviceTypes={this.props.serviceTypes}
      handleChange={e => this.handleSearchTypeServiceInstances(e)}
      handleChangeAddSearchValue={(e, type) =>
        this.handleAddSearchValue(e, type)
      }
    />
  );

  renderTab = (title: string, component: Function) => (
    <Tab title={title} className="advanced-search-container" active>
      {this.state.activeTab === title && component()}
    </Tab>
  );

  removeSearchValues = async (id, actionType) => {
    await this.props.removeSearchValues(id, actionType);
    await this.props.fetchBasicDetailsResults(this.props.searchValues);
  };

  renderTags = (valueEntity, entity, entityName, actionType) => {
    const ids = this.props.searchValues[valueEntity];
    const entities = this.props[entity];

    const models = entities.filter(entity =>
      ids.includes(entity.id.toString())
    );

    return models.map(model => {
      const modelName = model[entityName];
      return (
        <SearchTag
          name={modelName}
          id={model.id}
          actionType={actionType}
          removeSearchValues={this.removeSearchValues}
        />
      );
    });
  };

  render() {
    return (
      <ModalContainer style={{ minHeight: this.state.containerHeight }}>
        {this.state.redirect && <Redirect to="/facilities" />}
        <ModalContent>
          <ModalHeader>
            <div className="mfl-modal-header">Advanced Search</div>
            <CloseButton onClick={this.closeModal}>
              <i class="material-icons">close</i>
            </CloseButton>
          </ModalHeader>
          <SearchResultsPanel>
            <div>
              {this.state.loading && <p>Loading Results</p>}
              {!this.state.loading && (
                <span>
                  <strong>{this.getResultCount(this.props.results)}</strong>{" "}
                  Facilities Match Your Criteria
                </span>
              )}
            </div>
            {this.getResultCount(this.props.results) > 0 &&
              !this.state.loading &&
              this.renderDisplayButton()}
          </SearchResultsPanel>
          <Tabs
            className="tab-demo z-depth-1 blue text-white"
            onChange={(t, v) => this.setState({ activeTab: v.target.text })}
          >
            {this.renderTab(
              "Location",
              this.renderTabLoader(this.renderAdvancedLocation)
            )}
            {this.renderTab(
              "Ownership & Regulation",
              this.renderTabLoader(this.renderAdvancedOwnershipRegulation)
            )}
            {this.renderTab(
              "Facility Type",
              this.renderTabLoader(this.renderAdvancedFacilityTypes)
            )}
            {/* {this.renderTab("Resources", this.renderAdvancedResourceTypes)}
            {this.renderTab("Utilities", this.renderAdvancedUtilityTypes)}
            {this.renderTab("Services", this.renderAdvancedServices)} */}
          </Tabs>
        </ModalContent>
        <ModalFooter>
          {!this.state.loading && (
            <TagContainer>
              {tagValueMapper.map(tagValues => this.renderTags(...tagValues))}
            </TagContainer>
          )}
        </ModalFooter>
      </ModalContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchResults: state.searchResults.advancedSearchResults,
    isLoading: state.searchResults.isLoading,
    searchValues: state.advancedSearchValues,
    districts: state.dependancies.districts,
    facilityTypes: state.dependancies.facilityTypes,
    facilityOwners: state.dependancies.facilityOwners,
    operationalStatuses: state.dependancies.operationalStatuses,
    regulatoryStatuses: state.dependancies.regulatoryStatuses,
    resourceTypes: state.dependancies.resourceTypes,
    utilityTypes: state.dependancies.utilityTypes,
    serviceTypes: state.dependancies.serviceInstance,
    typeResourceInstances: state.facilities.typeResourceInstances,
    typeUtilityInstances: state.facilities.typeUtilityInstances,
    typeServiceInstances: state.facilities.typeServiceInstances,
    resources: state.facilities.resources,
    utilities: state.facilities.utilities,
    services: state.facilities.services,
    results: map(state.searchResults.advancedSearchFacilities)
      .filter(filteredArray => {
        return filteredArray.length > 0;
      })
      .reduce(
        (resultsArray, currentArray) => {
          return intersection(resultsArray, currentArray);
        },
        map(state.searchResults.advancedSearchFacilities).filter(
          filteredArray => {
            return filteredArray.length > 0;
          }
        )[0]
      )
  };
};

export default connect(
  mapStateToProps,
  {
    addSearchValues,
    removeSearchValues,
    fetchBasicDetailsResults,
    fetchAdvancedSearchResults,
    fetchResourceTypeInstances,
    fetchUtilityTypeInstances,
    fetchServiceTypeInstances,
    fetchBasicResourceDetailsResults,
    fetchBasicUtilityDetailsResults,
    fetchBasicServiceDetailsResults,
    removeResultsValues
  }
)(SearchModal);
