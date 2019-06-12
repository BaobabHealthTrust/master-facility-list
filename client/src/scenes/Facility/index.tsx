import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleFacilityFilter } from "../../services/redux/actions/ui";
import { fetchOwners } from "../../services/redux/actions/dependancies";
import {
  addFilterValue,
  removeFilterValue,
  basicAdvancedFilter,
  resourcesAdvancedFilter,
  utilitiesAdvancedFilter,
  servicesAdvancedFilter,
  fetchFilteredFacilities
} from "../../services/redux/actions/facilities";
import Facility from "./Facility";
import { hasFilterValuesForType } from "../../services/helpers";
import settings from "../../App/settings";

export class index extends Component<Props> {
  handleFacilityClick = (facilityId: number) => {
    this.props.history.push(`facilities/${facilityId}`);
  };
  componentDidMount() {
    if (this.props.owners.length == 0) {
      this.props.fetchOwners();
    }
    if (this.props.filterOptions && this.props.filterOptions.length > 0) {
      this.filterFacilities();
    }
  }

  downloadFileIn = (format: "pdf" | "csv" | "excel") => {
    const { filterOptions } = this.props;
    const facilityIds =
      filterOptions.length > 0
        ? this.props.filteredFacilities.map(f => f.id)
        : [];
    const whereClause =
      filterOptions.length > 0 ? { id: { inq: facilityIds } } : {};
    window.open(
      `${settings.API}/facilities/download?data=` +
        JSON.stringify({
          where: whereClause,
          format
        })
    );
  };

  onAddFilter = async (
    value: { type: string; id: number; label: string; range?: any },
    options: Array<number> = []
  ) => {
    const { type, id } = value;
    if (id == -1) {
      let filterOptionsToRemove =
        type == "utilities" || type == "services"
          ? this.props.filterOptions.filter(
              option => option.type == type && options.includes(option.id)
            )
          : this.props.filterOptions.filter(option => option.type == type);

      for (let valueForType of filterOptionsToRemove) {
        this.props.removeFilterValue(valueForType);
      }
      return;
    }

    await this.props.addFilterValue(value);
    this.filterFacilities();
  };

  removeFilter = async (value: any) => {
    await this.props.removeFilterValue(value);
    this.filterFacilities();
  };

  filterFacilities = async () => {
    if (hasFilterValuesForType("basic", this.props.filterOptions))
      await this.props.basicAdvancedFilter(this.props.filterOptions);

    if (hasFilterValuesForType("resources", this.props.filterOptions))
      await this.props.resourcesAdvancedFilter(this.props.filterOptions);

    if (hasFilterValuesForType("utilities", this.props.filterOptions))
      await this.props.utilitiesAdvancedFilter(this.props.filterOptions);

    if (hasFilterValuesForType("services", this.props.filterOptions))
      await this.props.servicesAdvancedFilter(this.props.filterOptions);

    this.props.fetchFilteredFacilities(
      this.props.filterOptions,
      this.props.filterResults
    );
  };

  render() {
    const {
      drawerOpen,
      toggleFacilityFilter,
      facilities,
      filteredFacilities,
      filterOptions
    } = this.props;

    const facilitiesData =
      filterOptions.length > 0 ? filteredFacilities : facilities;

    return (
      <Facility
        onFacilityClicked={(facilityId: number) =>
          this.handleFacilityClick(facilityId)
        }
        drawerOpen={drawerOpen}
        onToggleDrawer={toggleFacilityFilter}
        onAddFilter={this.onAddFilter}
        onRemoveFilter={this.removeFilter}
        facilities={facilitiesData}
        filterOptions={filterOptions}
        downloadList={this.downloadFileIn}
      />
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    drawerOpen: state.ui.advancedSearchOpen,
    filterOptions: state.facilities.advancedFilter.filterValues,
    filterResults: state.facilities.advancedFilter.filterResults,
    facilities: state.facilities.list,
    filteredFacilities: state.facilities.filteredList,
    owners: state.dependancies.owners.list
  };
};

type Props = {
  drawerOpen: boolean;
  toggleFacilityFilter: Function;
  filterOptions: Array<any>;
  filterResults: any;
  facilities: Array<any>;
  filteredFacilities: Array<any>;
  owners: Array<any>;
  fetchOwners: Function;
  history?: any;
  addFilterValue: Function;
  removeFilterValue: Function;
  basicAdvancedFilter: Function;
  resourcesAdvancedFilter: Function;
  utilitiesAdvancedFilter: Function;
  servicesAdvancedFilter: Function;
  fetchFilteredFacilities: Function;
};
export default connect(
  mapStateToProps,
  {
    toggleFacilityFilter,
    fetchOwners,
    addFilterValue,
    removeFilterValue,
    basicAdvancedFilter,
    resourcesAdvancedFilter,
    utilitiesAdvancedFilter,
    servicesAdvancedFilter,
    fetchFilteredFacilities
  }
)(index);
