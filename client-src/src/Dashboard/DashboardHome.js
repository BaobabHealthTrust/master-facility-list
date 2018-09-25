import React from "react";

import {
  BarChart,
  PieChart,
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
import { kids } from "../images";
import { Button } from "react-materialize";
import footerResizer from "../helpers/footerResize";
import DashboardSummary from "./dashboardSummary";
import { GenericCard } from "./charts/mini-cards";
import styled from "styled-components";

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

const MapContainer = styled.div.attrs({
  className: "col s12 m3 hide-on-small-only"
})
`
  position: sticky;
  top: 10px;
`

const WelcomeCardContainer = styled.div.attrs({ className: "row" })`
  position: sticky;
  top: -50px;
  z-index: 100;
  background: white;
`
const CallToAction = styled.div.attrs({ className: "w-full p-8 mb-8" })`
  background: rgba(43,43,104, 1);
  background-image: url(${kids});
  background-blend-mode: overlay;
  background-position-y: center;
  color: white;
`

// TODO: Codes for All Dependancies

class DashboardHome extends React.Component<Props, State> {

  state = {
    districts: [],
    name: '',
    typeOwnershipContainerWidth: 0,
    regulatoryStatusContainerWidth: 0,
    operationalStatusContainerWidth: 0
  };

  calculateContainerWidth = (selector) => {
    const container = document.getElementById(selector);
    const containerWidth = container ? container.clientWidth : 1000;
    return containerWidth;
  }

  resizeDashBoard = () => {
    const typeOwnershipContainerWidth = this.calculateContainerWidth('typeOwnershipContainer');
    const regulatoryStatusContainerWidth = this.calculateContainerWidth('regulatoryStatusContainer');
    const operationalStatusContainerWidth = this.calculateContainerWidth('operationalStatusContainer');
    this.setState({
      typeOwnershipContainerWidth,
      regulatoryStatusContainerWidth,
      operationalStatusContainerWidth
    });
  }

  facilityDistrictFilter = (facility) => {
    if (this.state.districts.length == 0) return true
    return this.state.districts.includes(facility.district)
  }

  facilitiesOfType = (facilityType: string) => {
    const data = this.props.allFacilities.data
    return data
      ? data.filter(facility => facility.type == facilityType)
        .filter(this.facilityDistrictFilter).length
      : 0
  }

  generateBarChartData = (comparisonModel, comparisonField, facilityField) => {
    const data = this.props.allFacilities.data
    if (data) {
      return this.props[comparisonModel].map(model => {
        return {
          name: model[comparisonField],
          count: data.filter(facility => facility[facilityField] == model[comparisonField])
            .filter(this.facilityDistrictFilter).length
        }
      })
    }
    return []
  }

  ownershipBarData = () => this.generateBarChartData('owners', 'facility_owner', 'ownership')
  regulatoryBarData = () => this.generateBarChartData('regulatoryStatuses', 'facility_regulatory_status', 'regulatoryStatus')
  operationalBarData = () => {
    const data = this.generateBarChartData('operationalStatuses', 'facility_operational_status', 'status')
    return data.map(d => {
      return {
        name: d.name,
        value: d.count
      }
    })
  }

  totalFacilities = () => (
    this.props.allFacilities.data
      ? this.props.allFacilities.data.filter(this.facilityDistrictFilter).length
      : 0
  )

  closeTag = async (event) => {
    const district = event.target.id
    const districts = await this.state.districts.filter(d => d != district)
    await this.setState({ districts })
  }

  onClick = async (event) => {
    const district = event.target.id;
    if (this.state.districts.includes(district)) {
      const districts = this.state.districts.filter(d => d != district);
      await this.setState({ districts });
    } else {
      const districts = [...this.state.districts, district];
      await this.setState({ districts });
    }
  }

  async componentDidMount() {
    window.addEventListener('resize', this.resizeDashBoard)
    this.resizeDashBoard();
  }

  componentWillReceiveProps() {
    footerResizer();
  }

  render() {

    return (
      <React.Fragment>
        <div className="row mt-6">
          <MapContainer>
            <FacilitiesMap
              onClick={this.onClick}
              districts={this.state.districts}
              height={600} />
          </MapContainer>
          <div className="col s12 m9">
            <WelcomeCardContainer>
              {this.props.dependancyIsLoading && <p>Loading!</p>}
              <div className="col s12">
                <DashboardSummary closeTag={this.closeTag} districts={this.state.districts} />
              </div>
            </WelcomeCardContainer>
            <div className="row">
              <div className="col s12 l3 col-5">
                <GenericCard count={this.totalFacilities()} title="Total Facilities" icon="hospital" />
              </div>
              <div className="col s12 l3 col-5">
                <GenericCard count={this.facilitiesOfType('District Hospital')} title="Dist Hospitals" icon="district" />
              </div>
              <div className="col s12 l3 col-5">
                <GenericCard count={this.facilitiesOfType('Central Hospital')} title="Central Hospitals" icon="normal_hospital" />
              </div>
              <div className="col s12 l3 col-5">
                <GenericCard count={this.facilitiesOfType('Clinic')} title="Clinics" icon="clinic" />
              </div>
              <div className="col s12 l3 col-5">
                <GenericCard count={this.facilitiesOfType('Health Centre')} title="Health Centres" icon="tent" />
              </div>
            </div>
            <div className="row hide-on-small-only">
              <div className="col m12">
                <CallToAction>
                  <Button>Go to Advanced Search</Button>
                  <span className="ml-4 text-2xl">For a more detailed analysis of Facilities</span>
                </CallToAction>
              </div>
              <div className="col s12 m6" id="regulatoryStatusContainer">
                <div class="outer-recharts-surface">
                  <BarChart
                    title="Facilities By License Status"
                    colorIndex={0}
                    data={this.regulatoryBarData()}
                    width={this.state.regulatoryStatusContainerWidth}
                  />
                </div>
              </div>
              <div className="col s12 m6" id="operationalStatusContainer">
                <div className="outer-recharts-surface">
                  <PieChart
                    data={this.operationalBarData()}
                    width={this.state.operationalStatusContainerWidth}
                  />
                </div>
              </div>
            </div>
            <div className='row hide-on-small-only'>
              <div class="col s12" id="typeOwnershipContainer">
                <div class="outer-recharts-surface">
                  <BarChart
                    title="Facilities By Ownership"
                    colorIndex={2}
                    data={this.ownershipBarData()}
                    width={this.state.typeOwnershipContainerWidth}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

}

const mapStateToProps = store => {
  return {
    allFacilities: store.facilities.all,
    owners: store.dependancies.facilityOwners,
    operationalStatuses: store.dependancies.operationalStatuses,
    regulatoryStatuses: store.dependancies.regulatoryStatuses,
    dependancyIsLoading: store.dependancies.isLoading,
    dependancyIsNetworkError: store.dependancies.isNetworkError,
    facilityTypes: store.dependancies.facilityTypes,
  };
};

export default connect(mapStateToProps, {})(DashboardHome);
