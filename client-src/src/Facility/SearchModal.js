//@flow
import React from "react";
import { Tabs, Tab } from "react-materialize";
import AdvancedLocation from "./AdvancedSearch/AdvancedLocation";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
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
import FacilityTypeTags from "./AdvancedSearch/FacilityTypeTags";
import FacilityOwnerTags from "./AdvancedSearch/FacilityOwnerTags";
import OperationalStatusTags from "./AdvancedSearch/OperationalStatusTags";
import RegulatoryStatusTags from "./AdvancedSearch/RegulatoryStatusTags";
import DistrictTags from "./AdvancedSearch/DistrictTags";
import ResourceTags from "./AdvancedSearch/ResourceTags";
import UtilityTags from "./AdvancedSearch/UtilityTags";
import ServiceTags from "./AdvancedSearch/ServiceTags";
import styled from "styled-components";


const DisplayButton = styled.div.attrs({ className: "btn" })`
  width: 20%;
`
const CloseButton = styled.div.attrs({ className: "mfl-modal-close right cursor-pointer" })``
const SearchResultsPanel = styled.div.attrs({
  className: "mfl-search-feedback flex justify-between align-center w-full"
}
)``
const ModalHeader = styled.div.attrs({ className: "mfl-bm-2 flex justify-between w-full" })``
const ModalFooter = styled.div.attrs({ className: "modal-footer" })``
const TagContainer = styled.div.attrs({ className: "advanced-search-tag-container" })``
const ModalContent = styled.div.attrs({ className: "modal-content" })``
const ModalContainer = styled.div.attrs({
  className: "container mt-8",
  id: "advanced-search",
  ref: "advancedSearch"
})``

const searchActions = {
  ADD_DISTRICT_VALUES: "ADD_DISTRICT_VALUES"
}

class SearchModal extends React.Component<{}> {
  state = {
    activeTab: "Location",
    redirect: false
  };

  getObjectFromIds(ids, entities) {
    return entities.filter(entity => ids.includes(entity.id.toString()));
  }

  handleAddSearchValue = async (e, type) => {
    await this.props.addSearchValues(e, type);
    await this.props.fetchBasicResourceDetailsResults(this.props.searchValues);
    await this.props.fetchBasicUtilityDetailsResults(this.props.searchValues);
    await this.props.fetchBasicServiceDetailsResults(this.props.searchValues);
    await this.props.fetchBasicDetailsResults(this.props.searchValues);
  }

  handleRemoveResults = async () => {
    await this.props.removeSearchValues("", "REMOVE_ALL_SEARCH_VALUES");
    await this.props.removeResultsValues();
  }

  handleSearchTypeResourceInstances = (e) => {
    this.props.fetchResourceTypeInstances(e.target.value);
  }
  handleSearchTypeUtilityInstances = (e) => {
    this.props.fetchUtilityTypeInstances(e.target.value);
  }
  handleSearchTypeServiceInstances = (e) => {
    this.props.fetchServiceTypeInstances(e.target.value);
  }

  getSearchResults = async () => {
    await this.props.fetchAdvancedSearchResults(this.props.results);
    await this.setState({ redirect: true });
  }

  getResultCount = results => results ? results.length : 0

  renderDisplayButton = () => (
    <DisplayButton onClick={this.getSearchResults}>
      Get Search Results
    </DisplayButton>
  )

  renderAdvancedLocation = () => (
    <AdvancedLocation
      districts={this.props.districts}
      handleChange={(e, type) => this.handleAddSearchValue(e, type)}
      action={searchActions.ADD_DISTRICT_VALUES}
    />
  )

  renderAdvancedOwnershipRegulation = () => (
    <AdvancedOwnershipRegulation
      operationalStatuses={this.props.operationalStatuses}
      facilityTypes={this.props.facilityTypes}
      facilityOwners={this.props.facilityOwners}
      regulatoryStatuses={this.props.regulatoryStatuses}
      handleChange={(e, type) => this.handleAddSearchValue(e, type)}
    />
  )

  renderAdvancedFacilityTypes = () => (
    <AdvancedFacilityType
      facilityTypes={this.props.facilityTypes}
      handleChange={(e, type) => this.handleAddSearchValue(e, type)}
    />
  )

  renderAdvancedResourceTypes = () => (
    <AdvancedResourceType
      resourceTypes={this.props.resourceTypes}
      handleChange={e => this.handleSearchTypeResourceInstances(e)}
      handleChangeAddSearchValue={(e, type) => this.handleAddSearchValue(e, type)}
    />
  )

  renderAdvancedUtilityTypes = () => (
    <AdvancedUtilityType
      utilityTypes={this.props.utilityTypes}
      handleChange={e => this.handleSearchTypeUtilityInstances(e)}
      handleChangeAddSearchValue={(e, type) => this.handleAddSearchValue(e, type)}
    />
  )

  renderAdvancedServices = () => (
    <AdvancedServiceType
      serviceTypes={this.props.serviceTypes}
      handleChange={e => this.handleSearchTypeServiceInstances(e)}
      handleChangeAddSearchValue={(e, type) => this.handleAddSearchValue(e, type)}
    />
  )

  renderTab = (title: string, component: Function) => (
    <Tab
      title={title}
      className="advanced-search-container"
      active
    >
      {this.state.activeTab === title && component()}
    </Tab>
  )

  renderTags = (TagComponent) => (
    <TagComponent
      getObjectFromIds={(ids, entities) => this.getObjectFromIds(ids, entities)}
    />
  )

  render() {
    return (
      <ModalContainer>
        {this.state.redirect && <Redirect to="/facilities" />}
        <ModalContent>
          <ModalHeader>
            <div className="mfl-modal-header">Advanced Search</div>
            <CloseButton onClick={() => this.setState({ redirect: true })}>
              <i class="material-icons">close</i>
            </CloseButton>
          </ModalHeader>
          <SearchResultsPanel>
            <div>
              <strong>{this.getResultCount(this.props.results)}</strong> Facilities Match Your Criteria
            </div>
            {this.getResultCount(this.props.results) > 0 && this.renderDisplayButton()}
          </SearchResultsPanel>
          <Tabs
            className="tab-demo z-depth-1 blue text-white"
            onChange={(t, v) => this.setState({ activeTab: v.target.text })}
          >
            {this.renderTab("Location", this.renderAdvancedLocation)}
            {this.renderTab("Ownership & Regulation", this.renderAdvancedOwnershipRegulation)}
            {this.renderTab("Facility Type", this.renderAdvancedFacilityTypes)}
            {this.renderTab("Resources", this.renderAdvancedResourceTypes)}
            {this.renderTab("Utilities", this.renderAdvancedUtilityTypes)}
            {this.renderTab("Services", this.renderAdvancedServices)}
          </Tabs>
        </ModalContent>
        <ModalFooter>
          <TagContainer>
            {this.renderTags(DistrictTags)}
            {this.renderTags(OperationalStatusTags)}
            {this.renderTags(FacilityTypeTags)}
            {this.renderTags(FacilityOwnerTags)}
            {this.renderTags(RegulatoryStatusTags)}
            {this.renderTags(ResourceTags)}
            {this.renderTags(UtilityTags)}
            {this.renderTags(ServiceTags)}
          </TagContainer>
        </ModalFooter>
      </ModalContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    searchResults: state.searchResults.advancedSearchResults,
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

export default connect(mapStateToProps, {
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
})(SearchModal);
