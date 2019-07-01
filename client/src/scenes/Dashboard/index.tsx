import React, { Component } from "react";
import Dashboard from "./Dashboard";
import { connect } from "react-redux";
import {
  removeAllFilterValue,
  addFilterValue
} from "../../services/redux/actions/facilities";
import { setActivePage } from "../../services/redux/actions/ui";

class index extends Component<any> {
  initialState: Array<string> = [];
  state = {
    districtsFilter: this.initialState
  };

  getFilteredFacilities = () =>
    this.state.districtsFilter.length == 0
      ? this.props.facilities
      : this.props.facilities.filter((facility: any) =>
          this.inFilter(facility.district)
        );

  inFilter = (district: string) =>
    this.state.districtsFilter.includes(district);

  handleFilterAdd = (district: string) => {
    let districts: Array<string> = this.state.districtsFilter;
    districts.push(district);
    this.setState({ districtsFilter: districts });
  };

  handleFilterRem = (district: string) => {
    let districts = this.state.districtsFilter;
    this.setState({
      districtsFilter: districts.filter(dis => dis != district)
    });
  };

  handleMapClick = (district: string) => {
    if (this.inFilter(district)) {
      this.handleFilterRem(district);
      return;
    }
    this.handleFilterAdd(district);
  };

  getFacilitiesOfType = (type: string) => {
    return this.getFilteredFacilities()
      ? this.getFilteredFacilities().filter(
          (facility: any) => facility.type.toLowerCase() == type.toLowerCase()
        ).length
      : 0;
  };

  generateBarChartData = (
    comparisonModel: any,
    comparisonField: any,
    facilityField: any
  ) => {
    const data = this.getFilteredFacilities();
    if (data) {
      return this.props[comparisonModel].map((model: any) => {
        return {
          name: model[comparisonField],
          count: data.filter(
            (facility: any) => facility[facilityField] == model[comparisonField]
          ).length
        };
      });
    }
    return [];
  };

  onSummaryCardClick = (facilityType: any) => {
    this.props.removeAllFilterValue();

    facilityType =
      facilityType != "All"
        ? this.props.facilityTypes
            .filter((ft: any) => ft.facility_type == facilityType)
            .map((ft: any) => ({
              type: "facilityTypes",
              id: ft.id,
              label: ft.facility_type
            }))[0]
        : "All";

    let districts: Array<any> = this.state.districtsFilter.map(dis => {
      return this.props.districts
        .filter((d: any) => d.district_name === dis)
        .map((d: any) => ({
          type: "districts",
          id: d.id,
          label: d.district_name
        }));
    });

    if (facilityType != "All") {
      this.props.addFilterValue(facilityType);
    }
    if (districts.length > 0) {
      for (let district of districts) {
        this.props.addFilterValue(district[0]);
      }
    }
    this.props.history.push("/facilities");
    this.props.setActivePage("facilities");
  };

  getRegulatoryBarData = () => {
    const data = this.generateBarChartData(
      "regulatoryStatuses",
      "facility_regulatory_status",
      "regulatoryStatus"
    );

    const registered = data
      .filter((val: any) => val.name == "Registered")
      .reduce((acc: any, cur: any) => Number(acc) + Number(cur.count), 0);

    const notRegistered = data
      .filter((val: any) => val.name == "Not Registered")
      .reduce((acc: any, cur: any) => Number(acc) + Number(cur.count), 0);

    const pending = data
      .filter(
        (val: any) => val.name != "Registered" && val.name != "Not Registered"
      )
      .reduce((acc: any, cur: any) => Number(acc) + Number(cur.count), 0);

    return [
      { name: "Registered", value: registered },
      { name: "Pending", value: notRegistered },
      { name: "Not Registered", value: pending }
    ];
  };

  getOperationalBarData = () => {
    const data = this.generateBarChartData(
      "operationalStatuses",
      "facility_operational_status",
      "status"
    );

    const opened = data
      .filter((val: any) => val.name == "Functional")
      .reduce((acc: any, cur: any) => Number(acc) + Number(cur.count), 0);

    const tempClosed = data
      .filter((val: any) => val.name == "Closed (Temporary)")
      .reduce((acc: any, cur: any) => Number(acc) + Number(cur.count), 0);

    const closed = data
      .filter(
        (val: any) =>
          val.name != "Functional" && val.name != "Closed (Temporary)"
      )
      .reduce((acc: any, cur: any) => Number(acc) + Number(cur.count), 0);

    return [
      { name: "Functional", value: opened },
      { name: "Closed (Temporary)", value: tempClosed },
      { name: "Closed", value: closed }
    ];
  };
  // make sure you have the svg file in images folder
  getFacilitiesByTypeData = () => [
    {
      count: this.getFilteredFacilities().length,
      title: "Total Facilities",
      type: "All",
      icon: "hospital.svg",
      onClick: () => {}
    },
    {
      count: this.getFacilitiesOfType("District Hospital"),
      title: "Dist Hospitals",
      type: "District Hospital",
      icon: "district.svg",
      onClick: () => {}
    },
    {
      count: this.getFacilitiesOfType("Health Centre"),
      title: "Health Centers",
      type: "Health Centre",
      icon: "clinic.svg",
      onClick: () => {}
    },
    {
      count: this.getFacilitiesOfType("Dispensary"),
      title: "Dispensaries",
      type: "Dispensary",
      icon: "normal-hospital.svg",
      onClick: () => {}
    },
    {
      count: this.getFacilitiesOfType("Health Post"),
      title: "Health Posts",
      type: "Health Post",
      icon: "tent.svg",
      onClick: () => {}
    }
  ];
  render() {
    return (
      <Dashboard
        cardsData={this.getFacilitiesByTypeData()}
        licenseStatusGrapphData={this.getRegulatoryBarData()}
        operationalStatusGraphData={this.getOperationalBarData()}
        selectedDistricts={this.state.districtsFilter}
        onRemoveDistrictFilter={(district: string) => {
          this.handleFilterRem(district);
        }}
        onMapClick={(district: string) => {
          this.handleMapClick(district);
        }}
        onSummaryCardClick={this.onSummaryCardClick}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  status: state.status,
  districts: state.dependancies.districts.list,
  operationalStatuses: state.dependancies.operationalStatuses.list,
  regulatoryStatuses: state.dependancies.regulatoryStatuses.list,
  facilities: state.facilities.list,
  facilityTypes: state.dependancies.facilityTypes.list
});

export default connect(
  mapStateToProps,
  { removeAllFilterValue, addFilterValue, setActivePage }
)(index);
