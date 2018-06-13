//@flow
import React from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Summary from "./Summary";
import Location from "./FacilityLocation";
import Resources from "./FacilityResources";
import Utilities from "./FacilityUtilities";
import Services from "./FacilityServices";
import { connect } from "react-redux";
import SecondaryMenu from "../common/SecondaryMenu";
import footerResizer from "../helpers/footerResize";
import MflDownload from "../common/MflDownload";
import { ShowError, FetchAllDependancies } from "../common";
import { BasicDetailsForm, ContactsForm, ServicesForm, ResourcesForm, UtilitiesForm } from "./FacilityForms";

type Props = {
  match: any,
  current: any
};

type ButtonConfiguration = Array<{
  color: string,
  action: Function,
  icon: string,
  name: string
}>
class FacilityDetails extends React.Component<Props> {

  state = {
    pushTo: null
  }

  componentWillReceiveProps() {
    this.setState({ pushTo: null });
    // footerResizer();
  }

  buttonConfiguration: ButtonConfiguration = [
    {
      icon: 'delete',
      action: () => alert('Deleting...'),
      color: 'red',
      name: 'Delete Facility'
    },
    {
      icon: 'edit',
      action: () => this.setState({ pushTo: `${this.props.location.pathname}/edit` }),
      color: 'green',
      name: 'Edit Facility'
    },
    {
      icon: 'file_download',
      action: () => alert('Downloading...'),
      color: 'blue',
      name: 'Download Facility Details'
    }
  ]

  render() {
    const pathArr: string[] = this.props.location.pathname.split('/');
    const id = this.props.match.params.id;
    const summaryLink = `/facilities/${id}/summary`;
    const locationsLink = `/facilities/${id}/locations`;
    const resourcesLink = `/facilities/${id}/resources`;
    const utilitiesLink = `/facilities/${id}/utilities`;
    const servicesLink = `/facilities/${id}/services`;

    const links = [
      {
        name: "summary",
        displayName: "Summary".toUpperCase(),
        redirect: summaryLink,
        clickHandler: null
      },
      {
        name: "contactsandlocations",
        displayName: "Contacts and Locations".toUpperCase(),
        redirect: locationsLink,
        clickHandler: null
      },
      {
        name: "resources",
        displayName: "resources".toUpperCase(),
        redirect: resourcesLink,
        clickHandler: null
      },
      {
        name: "utilities",
        displayName: "utilities".toUpperCase(),
        redirect: utilitiesLink,
        clickHandler: null
      },
      {
        name: "services",
        displayName: "services".toUpperCase(),
        redirect: servicesLink,
        clickHandler: null
      }
    ];

    let badgeClass = "new badge";

    if (this.props.current.operationalStatus) {
      switch (this.props.current.operationalStatus
        .facility_operational_status) {
        case "Closed":
          badgeClass = "new badge red";
          break;
        case "Closed (Temporary)":
          badgeClass = "new badge deep-orange";
          break;
        case "Functional":
          badgeClass = "new badge green";
          break;
        case "Pending Operation (Under construction)":
          badgeClass = "new badge orange";
          break;
        case "Pending Operation (Construction Complete)":
          badgeClass = "new badge brown";
          break;
        default:
          break;
      }
    }
    return (
      <div>
        {
          this.state.pushTo && <Redirect to={this.state.pushTo} />
        }
        <SecondaryMenu links={links} defaultActivePage={"summary"} />
        <div className="container mfl-titles flex flex-row justify-between">
          <div>
            <h5>
              {/* TODO: Fetch Current Data Here on your own */}
              <FetchAllDependancies />
              {this.props.current.facility_name}
              {
                this.props.current.operationalStatus && (
                  <span
                    style={{ float: 'none' }}
                    id="badge"
                    className={badgeClass}
                    data-badge-caption={
                      this.props.current.operationalStatus
                        .facility_operational_status
                    }
                  />
                )
              }
            </h5>
            <h6>
              {this.props.current.facility_code},&nbsp;
              {this.props.current.district && this.props.current.district.district_name}
            </h6>
          </div>
          <div className="mt-4">
            {
              (pathArr[pathArr.length - 1] != 'edit' && sessionStorage.getItem('token')) && (
                <MflDownload
                  buttonConfiguration={this.buttonConfiguration}
                  mainButtonConfiguration={{ color: 'teal', icon: 'more_horiz' }}
                />
              )
            }
          </div>
        </div>
        {this.props.isError ? (
          <ShowError />
        ) : (
            <Switch>
              <Route
                exact
                path="/facilities/:id/summary"
                component={Summary}
              />
              <Route
                exact
                path="/facilities/:id/summary/edit"
                component={BasicDetailsForm}
              />

              <Route
                exact
                path="/facilities/:id/locations"
                component={Location}
              />
              <Route
                exact
                path="/facilities/:id/locations/edit"
                component={ContactsForm}
              />

              <Route
                exact
                path="/facilities/:id/resources"
                component={Resources}
              />
              <Route
                exact
                path="/facilities/:id/resources/edit"
                component={ResourcesForm}
              />

              <Route
                exact
                path="/facilities/:id/utilities"
                component={Utilities}
              />
              <Route
                exact
                path="/facilities/:id/utilities/edit"
                component={UtilitiesForm}
              />

              <Route
                exact
                path="/facilities/:id/services"
                component={Services}
              />
              <Route
                exact
                path="/facilities/:id/services/edit"
                component={ServicesForm}
              />
            </Switch>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    current: state.facilities.currentDetails,
    isError: state.facilities.isNetworkError
  };
};

export default connect(mapStateToProps, null)(FacilityDetails);
