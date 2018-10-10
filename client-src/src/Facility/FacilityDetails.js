//@flow
import React from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Summary from "./Summary";
import Location from "./FacilityLocation";
import Resources from "./FacilityResources";
import Utilities from "./FacilityUtilities";
import Services from "./FacilityServices";
import { connect } from "react-redux";
import { Button } from "react-materialize";
import SecondaryMenu from "../common/SecondaryMenu";
import MflDownload from "../common/MflDownload";
import { ShowError, FetchAllDependancies, Loader } from "../common";
import {
  BasicDetailsForm,
  ContactsForm,
  ServicesForm,
  ResourcesForm,
  UtilitiesForm
} from "./FacilityForms";
import settings from "../settings";
import { postFormData } from "../actions";
import { ButtonConfiguration } from "../types/helper-types";
import { Facility } from "../types/model-types";
import { Card, Col } from "react-materialize";
import { confirmAlert } from "react-confirm-alert";
import moment from "moment";

type Props = {
  match: any,
  current: any,
  postFormData: Function,
  response: Partial<Facility>
};

class FacilityDetails extends React.Component<Props> {
  state = {
    pushTo: null,
    redirect: false,
    loading: false,
    results: 0,
    containerHeight: 0
  };

  componentDidMount() {
    const { current } = this.props;
    const results = current ? current.length : 0;
    if (results > 0 && this.state.results - results != 0) {
      this.setState({ loading: false, results });
    }

    const containerHeight = window.innerHeight - 128;
    this.setState({ containerHeight });
  }

  onClick = async (onClose, e) => {
    await this.props.postFormData(
      { archived_date: new Date() },
      "Facilities",
      "PATCH",
      "PATCH_BASIC_DETAILS",
      "",
      this.props.match.params.id
    );
    if (this.props.response) this.setState({ redirect: true });
    else alert("Something went wrong");
    onClose();
  };

  _handleArchive = async () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Col m={6} s={12} style={{ minWidth: "400px" }}>
            <Card
              title="Confirm"
              className="blu darken-4"
              textClassName="white-tex"
              actions={[
                <Button onClick={onClose} className="mfl-rm-2 btn-flat">
                  No
                </Button>,
                <Button
                  className="btn-flat"
                  onClick={this.onClick.bind(this, onClose)}
                >
                  Yes
                </Button>
              ]}
            >
              Are you sure you want to delete this facility ?
            </Card>
          </Col>
        );
      }
    });
  };

  componentWillReceiveProps() {
    this.setState({ pushTo: null });
  }

  buttonConfiguration: ButtonConfiguration = [
    {
      icon: "delete",
      action: () => this._handleArchive(),
      color: "red",
      name: "Delete Facility"
    },
    {
      icon: "edit",
      action: () =>
        this.setState({ pushTo: `${this.props.location.pathname}/edit` }),
      color: "green",
      name: "Edit Facility"
    },
    {
      icon: "file_download",
      action: () =>
        window.open(
          `${settings.hostname}/api/facilities/download/${
            this.props.match.params.id
          }`
        ),
      color: "blue",
      name: "Download Facility Details"
    }
  ];

  render() {
    const pathArr: string[] = this.props.location.pathname.split("/");
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
      switch (
        this.props.current.operationalStatus.facility_operational_status
      ) {
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
      <div style={{ minHeight: this.state.containerHeight }}>
        {this.state.pushTo && <Redirect to={this.state.pushTo} />}
        {this.state.redirect && <Redirect to="/facilities" />}
        <SecondaryMenu links={links} defaultActivePage={"summary"} />
        <div className="container mfl-titles flex flex-row justify-between">
          <div>
            <h5>
              {/* TODO: Fetch Current Data Here on your own */}
              <FetchAllDependancies />
              {this.props.current.facility_name}
              {this.props.current.operationalStatus && (
                <span
                  style={{ float: "none" }}
                  id="badge"
                  className={badgeClass}
                  data-badge-caption={
                    this.props.current.operationalStatus
                      .facility_operational_status
                  }
                />
              )}
            </h5>
            <h6>
              {this.props.current.facility_code},&nbsp;
              {this.props.current.district &&
                this.props.current.district.district_name}
              &nbsp;&nbsp;
              <small
                style={{
                  fontSize: "80%",
                  fontStyle: "italic",
                  textTransform: "capitalize",
                  color: "#999"
                }}
              >
                Last Updated -{" "}
                {moment(this.props.current.updated_at).format("LLLL")}
              </small>
            </h6>
          </div>
          <div className="mt-4" className="hide-on-med-and-down">
            {pathArr[pathArr.length - 1] != "edit" &&
              sessionStorage.getItem("token") && (
                <MflDownload
                  buttonConfiguration={this.buttonConfiguration}
                  mainButtonConfiguration={{
                    color: "teal",
                    icon: "more_horiz"
                  }}
                />
              )}
            {pathArr[pathArr.length - 1] != "edit" &&
              !sessionStorage.getItem("token") && (
                <Button
                  className="mt-4 flex flex-row align-center"
                  onClick={() => {
                    window.open(
                      `${settings.hostname}/api/facilities/download/${
                        this.props.match.params.id
                      }`
                    );
                  }}
                >
                  <i class="material-icons">file_download</i>
                  <div>Download</div>
                </Button>
              )}
          </div>
        </div>
        {this.props.error.message == "Network Error" && <ShowError />}
        {this.props.error.response && (
          <ShowError message="This Resource does not exit" />
        )}

        {this.state.loading ? (
          <Loader />
        ) : (
          <Switch>
            <Route exact path="/facilities/:id/summary" component={Summary} />
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

            <Route exact path="/facilities/:id/services" component={Services} />
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
    error: state.facilities.error,
    response: state.facilities.patchResponse,
    isLoading: state.facilities.isLoading
  };
};

export default connect(
  mapStateToProps,
  { postFormData }
)(FacilityDetails);
