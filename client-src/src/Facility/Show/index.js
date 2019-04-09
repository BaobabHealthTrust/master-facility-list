//@flow
import React from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Summary from "./Summary";
import Location from "./Location";
import Resources from "./Resources";
import Utilities from "./Utilities";
import Services from "./Services";
import { connect } from "react-redux";
import { Button } from "react-materialize";
import SecondaryMenu from "../../common/SecondaryMenu";
import { MFLRevealButton } from "../../common";
import { ShowError, FetchAllDependancies, Loader } from "../../common";
import UpdateFacility from "../Update/UpdateFacility";
import settings from "../../settings";
import { postFormData } from "../../actions";
import { ButtonConfiguration } from "../../types/helper-types";
import { Facility } from "../../types/model-types";
import { Card, Col } from "react-materialize";
import { confirmAlert } from "react-confirm-alert";
import moment from "moment";
import styled from "styled-components";

type Props = {
  match: any,
  current: any,
  postFormData: Function,
  response: Partial<Facility>
};

const Container = styled.div``;

const TitleBar = styled.div.attrs({
  className: "container mfl-titles flex flex-row justify-between"
})``;

const FacilityName = styled.h5``;

const StatusBadge = styled.span`
  float: none;
`;

const FacilityCodeDistrict = styled.h6``;

const LastUpdated = styled.small`
  font-size: "80%";
  font-style: "italic";
  text-transform: "capitalize";
  color: "#999";
`;

const Tools = styled.div.attrs({
  className: "mt-4 hide-on-med-and-down"
})``;

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

  _renderRoutes = () => (
    <Switch>
      <Route exact path="/facilities/:id/summary" component={Summary} />
      <Route
        exact
        path="/facilities/:id/summary/edit"
        component={UpdateFacility}
      />

      <Route exact path="/facilities/:id/locations" component={Location} />
      <Route
        exact
        path="/facilities/:id/locations/edit"
        component={UpdateFacility}
      />

      <Route exact path="/facilities/:id/resources" component={Resources} />
      <Route
        exact
        path="/facilities/:id/resources/edit"
        component={UpdateFacility}
      />

      <Route exact path="/facilities/:id/utilities" component={Utilities} />
      <Route
        exact
        path="/facilities/:id/utilities/edit"
        component={UpdateFacility}
      />

      <Route exact path="/facilities/:id/services" component={Services} />
      <Route
        exact
        path="/facilities/:id/services/edit"
        component={UpdateFacility}
      />
    </Switch>
  );

  _renderTitleBar = () => {
    const { location, current, match } = this.props;
    const pathArr: string[] = location.pathname.split("/");
    return (
      <TitleBar>
        <div>
          <FacilityName>
            <FetchAllDependancies />
            {current.facility_name}
            {current.operationalStatus && (
              <StatusBadge
                id="badge"
                className={this._getBadgeClass()}
                data-badge-caption={
                  current.operationalStatus.facility_operational_status
                }
              />
            )}
          </FacilityName>
          <FacilityCodeDistrict>
            {current.facility_code},&nbsp;
            {current.district && current.district.district_name}
            &nbsp;&nbsp;
            <LastUpdated>
              Last Updated - {moment(current.updated_at).format("LLLL")}
            </LastUpdated>
          </FacilityCodeDistrict>
        </div>

        <Tools>
          {pathArr[pathArr.length - 1] !== "edit" &&
            sessionStorage.getItem("token") && (
              <MFLRevealButton
                buttonConfiguration={this.buttonConfiguration}
                mainButtonConfiguration={{
                  color: "teal",
                  icon: "more_horiz"
                }}
              />
            )}
          {pathArr[pathArr.length - 1] !== "edit" &&
            !sessionStorage.getItem("token") && (
              <Button
                className="mt-4 flex flex-row align-center"
                onClick={() => {
                  window.open(
                    `${settings.hostname}/api/facilities/download/${
                      match.params.id
                    }`
                  );
                }}
              >
                <i className="material-icons">file_download</i>
                <div>Download</div>
              </Button>
            )}
        </Tools>
      </TitleBar>
    );
  };
  _renderAlert = () => {
    if (this.props.error.message === "Network Error") return <ShowError />;
    if (this.props.error.response)
      return <ShowError message="This Resource does not exit" />;
  };

  _getBadgeClass = () => {
    const { current } = this.props;
    let badgeClass = "new badge";
    if (current.operationalStatus) {
      switch (current.operationalStatus.facility_operational_status) {
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
    return badgeClass;
  };

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
    const { match } = this.props;

    const id = match.params.id;
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

    return (
      <Container style={{ minHeight: this.state.containerHeight }}>
        {this.state.pushTo && <Redirect to={this.state.pushTo} />}
        {this.state.redirect && <Redirect to="/facilities" />}

        <SecondaryMenu links={links} defaultActivePage={"summary"} />

        {this._renderTitleBar()}

        {this._renderAlert()}

        {this.state.loading ? <Loader /> : this._renderRoutes()}
      </Container>
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
