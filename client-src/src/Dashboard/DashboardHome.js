import React from "react";

import {
    FacilitiesByTypeAndOwnership,
    FacilitiesByLicensingStatus,
    FacilitiesByOperationalStatus,
    FacilitiesMap
} from "./charts";

import { connect } from "react-redux";

import {
    FacilityService,
    Facility,
    Owner,
    OperationalStatus,
    RegulatoryStatus,
    FacilityType
} from "../types/model-types";

import { map, uniq, isEmpty, intersection } from "lodash";

import {
    fetchFacilityOwners,
    fetchFacilityTypes,
    fetchOperationalStatuses,
    fetchRegulatoryStatuses,
    fetchServices,
    fetchFacilities,
    fetchDashboardFacilityServices,
    operationalStatuses,
    regulatoryStatuses
} from "../actions";

import footerResizer from "../helpers/footerResize";
import '../App.css';

type Props = {
    fetchDashboardFacilityServices: Function,
    fetchServices: Function,
    fetchFacilities: Function,
    fetchFacilityOwners: Function,
    fetchFacilityTypes: Function,
    fetchOperationalStatuses: Function,
    fetchRegulatoryStatuses: Function,
    facilityServices: Array<FacilityService>,
    allFacilities: Array<Facility>,
    owners: Array<Owner>,
    facilityTypes: Array<FacilityType>,
    regulatoryStatuses: Array<RegulatoryStatus>,
    operationalStatuses: Array<OperationalStatus>,
    results: number[],
    isSearchValuesEmpty: boolean,
    total: number[],
    dependancyIsLoading: boolean,
    dependancyIsNetworkError: boolean,
    onClick: Function
};

type State = {
    dashboardServices: Array<{ id: number, displayName: string, icon: string }>,
    districts: Array<String>
};

// TODO: Codes for All Dependancies

class DashboardHome extends React.Component<Props, State> {

    state = {
      dashboardServices: [
        {
          id: 138,
          displayName: "OPD",
          icon: "people"
        },
        {
          id: 152,
          displayName: "ANC",
          icon: "pregnant_woman"
        },
        {
          id: 151,
          displayName: "FAM",
          icon: "wc"
        },
        {
          id: 154,
          displayName: "ARI",
          icon: "smoking_rooms"
        }
      ],
      districts: [],
      name: ''
    };

    onClick = async (event) => {
        const district = event.target.id;
        const attribute = event.target.getAttribute('class');
  
        if (attribute) {
            const flag = this.state.districts.includes(district);
            if (flag) {
                const index = this.state.districts.indexOf(district);
                if (index >= 0) {
                    event.target.setAttribute("class", "");
                    await this.setState((prevState, props) => {
                        const districts = prevState.districts;
                        districts.splice(index, 1);
                        return { districts: districts }
                    });
                }
            }
        } else {
            event.target.setAttribute("class", "mapClick");
            await this.setState( (prevState, props) =>{
                const districts = prevState.districts;
                districts.push(district);
                return { districts: districts}
            });
        }
        
        this.props.regulatoryStatuses(this.state.districts);
        this.props.operationalStatuses(this.state.districts);
    }

    async componentDidMount() {
        await this.props.fetchFacilities();
        await this.props.fetchFacilityOwners();
        await this.props.fetchOperationalStatuses();
        await this.props.fetchRegulatoryStatuses();
        await this.props.regulatoryStatuses(this.state.districts);
        await this.props.operationalStatuses(this.state.districts);
        await this.props.fetchDashboardFacilityServices(
            map(this.state.dashboardServices, "id")
        );
    }

    componentWillReceiveProps() {
      footerResizer();
    }

    render() {

      return (
        <div className="container">
          <div className="row mt-6">

              <div className="col s12 m3">
                  <FacilitiesMap onClick={this.onClick}/>
              </div>

            <div className="col s12 m9">
              <div className="row">
                <div className="col s12 m6">
                  <div class="outer-recharts-surface">
                    <FacilitiesByLicensingStatus data={this.props.facilitiesByRegulatoryStatus }/>
                  </div>
                </div>
                <div className="col s12 m6">
                  <div className="outer-recharts-surface">
                    <FacilitiesByOperationalStatus data={this.props.facilitiesByOperationalStatus}/>
                  </div>
                </div>
                <div class="col s12">
                  <div class="outer-recharts-surface">
                    <FacilitiesByTypeAndOwnership />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      );
    }

}

const mapStateToProps = store => {
    return {
        facilityServices: store.dashboardStatistics.facilityServices,
        services: store.dependancies.services,
        facilitiesByRegulatoryStatus: store.facilities.facilitiesByRegulatoryStatus,
        facilitiesByOperationalStatus: store.facilities.facilitiesByOperationalStatus, 
        allFacilities: store.facilities.all,
        owners: store.dependancies.facilityOwners,
        facilityTypes: store.dependancies.facilityTypes,
        operationalStatuses: store.dependancies.operationalStatuses,
        regulatoryStatuses: store.dependancies.regulatoryStatuses,
        isSearchValuesEmpty: isEmpty(
          map({
            districtValues: store.advancedSearchValues.districtValues,
            operationalStatusValues:
              store.advancedSearchValues.operationalStatusValues,
            facilityTypeValues:
              store.advancedSearchValues.facilityTypeValues,
            facilityOwnerValues:
              store.advancedSearchValues.facilityOwnerValues,
            regulatoryStatusValues:
              store.advancedSearchValues.regulatoryStatusValues
          }).filter(arr => arr.length > 0)
        ),
        results:
        store.searchResults.advancedSearchFacilities.basicDetailsFacilities,
        dependancyIsLoading: store.dependancies.isLoading,
        dependancyIsNetworkError: store.dependancies.isNetworkError
    };
};

export default connect(mapStateToProps, {
  fetchDashboardFacilityServices,
  fetchServices,
  regulatoryStatuses,
  operationalStatuses,
  fetchFacilities,
  fetchFacilityTypes,
  fetchFacilityOwners,
  fetchOperationalStatuses,
  fetchRegulatoryStatuses
})(DashboardHome);
