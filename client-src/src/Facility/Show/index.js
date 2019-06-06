//@flow
import React from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Summary from "./Summary";
import Location from "./Location";
import Resources from "./Resources";
import Utilities from "./Utilities";
import Services from "./Services";
import { connect } from "react-redux";
import { Row, Col } from "react-materialize";
import SecondaryMenu from "./components/Menu";
import { MFLRevealButton } from "../../common";
import { ShowError, FetchAllDependancies, Loader } from "../../common";
import UpdateFacility from "../Update/UpdateFacility";
import settings from "../../settings";
import { postFormData } from "../../actions";
import { Facility } from "../../types/model-types";
import { Card } from "react-materialize";
import { confirmAlert } from "react-confirm-alert";
import styled from "styled-components";
import OptionsBar from "./components/OptionsBar";
import MFLGoogleMapBg from "../../common/MFLGoogleMapBg";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FacilityTitle from "../../common/FacilityViewTitle";
import { isAdmin } from "../../helpers/utilities";
import {
  faPlus,
  faHospital,
  faEnvelope,
  faBed,
  faWifi,
  faStethoscope
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  match: any,
  current: any,
  postFormData: Function,
  response: Partial<Facility>
};

const Container = styled.div.attrs({})`
  padding: 30px 40px;
  @media (max-width: 390px) {
    padding: 1rem 1.5rem;
  }
`;

const FacilityName = styled.div.attrs({
  className: "mfl-titles flex flex-row justify-between"
})``;

const Content = styled.div`
  padding: 0 2.5rem;
  @media (max-width: 390px) {
    padding: 1rem 0rem;
  }
`;

const DetailsContainer = styled.div`
  margin-top: "10px";
  @media (min-width: 390px) {
    margin-top: ${props => (props.isDetailsPage ? "-600px" : "10px")};
  }
`;

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

  isDetailsPage = () => {
    const pathArr = this.props.location.pathname.split("/");
    return pathArr[pathArr.length - 1] != "edit";
  };

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

  _renderAlert = () => {
    if (this.props.error.message === "Network Error") return <ShowError />;
    if (this.props.error.response)
      return <ShowError message="This Resource does not exit" />;
  };

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
        icon: <FontAwesomeIcon icon={faHospital} />,
        name: "summary",
        displayName: "Facilty Details",
        redirect: summaryLink,
        clickHandler: null
      },
      {
        icon: <FontAwesomeIcon icon={faEnvelope} />,
        name: "contactsandlocations",
        displayName: "Facility Contacts",
        redirect: locationsLink,
        clickHandler: null
      },
      {
        icon: <FontAwesomeIcon icon={faBed} />,
        name: "resources",
        displayName: "Facility Resources",
        redirect: resourcesLink,
        clickHandler: null
      },
      {
        icon: <FontAwesomeIcon icon={faWifi} />,
        name: "utilities",
        displayName: "Facility Utilities",
        redirect: utilitiesLink,
        clickHandler: null
      },
      {
        icon: <FontAwesomeIcon icon={faStethoscope} />,
        name: "services",
        displayName: "Facility Services",
        redirect: servicesLink,
        clickHandler: null
      }
    ];

    const position =
      this.props.current.geolocations &&
      this.props.current.geolocations.latitude != ""
        ? {
            lat: parseFloat(this.props.current.geolocations.latitude),
            lng: parseFloat(this.props.current.geolocations.longitude)
          }
        : { lat: -13.9626121, lng: 33.7741195 };

    return (
      <Container>
        <FetchAllDependancies />
        {this.state.pushTo && <Redirect to={this.state.pushTo} />}
        {this.state.redirect && <Redirect to="/facilities" />}
        <Row>
          <Col m={2} s={12} style={{ padding: "0px" }}>
            <SecondaryMenu links={links} defaultActivePage={"summary"} />
          </Col>
          <Col m={10} s={12}>
            <Content>
              <FacilityName>
                <FacilityTitle
                  icon={<FontAwesomeIcon icon={faHospital} />}
                  title={this.props.current.facility_name}
                />
                <div className="hide-on-small-only ml-auto">
                  {isAdmin() && (
                    <Button
                      margin="0"
                      color="#517c4f"
                      icon="add_circle"
                      text="Add Facility"
                      link="/facilities/add"
                    />
                  )}
                </div>
              </FacilityName>

              <OptionsBar
                {...this.props}
                handleArchive={() => {
                  this._handleArchive();
                }}
              />
              {this._renderAlert()}
              {this.isDetailsPage() && (
                <div className="hide-on-small-only">
                  <MFLGoogleMapBg position={position} isMarkerShown />
                </div>
              )}
              {this.state.loading ? (
                <Loader />
              ) : (
                <DetailsContainer isDetailsPage={this.isDetailsPage()}>
                  {this._renderRoutes()}
                </DetailsContainer>
              )}
            </Content>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    current: state.facilities.currentDetails,
    error: state.facilities.error,
    response: state.facilities.patchResponse,
    isLoading: state.facilities.isLoading,
    activePage: state.ui.activePage
  };
};

export default connect(
  mapStateToProps,
  { postFormData }
)(FacilityDetails);

function Button(props) {
  const { color, icon, text } = props;
  const buttonClass = props.margin
    ? `waves-effect btn`
    : `mr-3 waves-effect btn`;
  return props.link ? (
    <Link
      className={buttonClass}
      to={props.link}
      style={{ backgroundColor: color }}
    >
      <i className="material-icons left">{icon}</i>
      {text}
    </Link>
  ) : (
    <Link
      className={buttonClass}
      style={{ backgroundColor: color }}
      to="#"
      onClick={() => props.onClick()}
    >
      <i className="material-icons left">{icon}</i>
      {text}
    </Link>
  );
}
