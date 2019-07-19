import React from "react";
import { Grid } from "@material-ui/core";
import Title from "../../molecules/PageTitle";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospital,
  faEdit,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";
import Container from "../../atoms/Container";
import OptionsBar from "../../molecules/FacilityViewOptionsBar";
import Card from "../../atoms/Card";
import FacilityGoogleMap from "../../molecules/FacilityGoogleMap";
import BasicDetailsPage from "../../molecules/FacilityBasicDetails";
import ContactsPage from "../../molecules/FacilityContacts";
import ResourcesPage from "../../molecules/FacilityResources";
import UtilitiesPage from "../../molecules/FacilityUtilities";
import ServicesPage from "../../molecules/FacilityServices";
import styled from "styled-components";
import { FacilityPages } from "../../../services/utils";
import Button from "../../atoms/Button";
import { Link } from "react-router-dom";
import EmptyState from "../../atoms/FacilityDetailsEmptyState";

library.add(faHospital, faEdit);

function index(props: Props) {
  const {
    basic,
    resources,
    utilities,
    services,
    pageHeader,
    activePage,
    downloadFacility,
    badge
  } = props;
  const position =
    basic.geolocations && basic.geolocations.latitude != ""
      ? {
          lat: parseFloat(basic.geolocations.latitude),
          lng: parseFloat(basic.geolocations.longitude)
        }
      : { lat: -13.9626121, lng: 33.7741195 };

  return (
    <Container style={{ padding: "16px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <Card>
            <OptionsBar
              badge={badge}
              facility={basic}
              downloadFacility={downloadFacility}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <DetailsContainer>
            <Grid container>
              <Grid item xs={12} sm={12} md={8}>
                <Card
                  heading={
                    <CardTitle>
                      <div>{pageHeader}</div>
                    </CardTitle>
                  }
                  style={{ zIndex: "1", position: "relative" }}
                  bodyStyle={{ padding: "20px" }}
                >
                  <FacilityPage>
                    {activePage == FacilityPages.summary && (
                      <BasicDetailsPage facility={basic} />
                    )}
                    {activePage == FacilityPages.contact && (
                      <ContactsPage facility={basic} />
                    )}
                    {activePage == FacilityPages.resources &&
                      (resources.length == 0 ? (
                        <EmptyState resource="resources" />
                      ) : (
                        <ResourcesPage resources={resources} />
                      ))}
                    {activePage == FacilityPages.utilities &&
                      (utilities.length == 0 ? (
                        <EmptyState resource="utilities" />
                      ) : (
                        <UtilitiesPage utilities={utilities} />
                      ))}
                    {activePage == FacilityPages.services &&
                      (services.length == 0 ? (
                        <EmptyState resource="services" />
                      ) : (
                        <ServicesPage services={services} />
                      ))}
                  </FacilityPage>
                </Card>
              </Grid>
            </Grid>
          </DetailsContainer>
        </Grid>
      </Grid>
    </Container>
  );
}

type Props = {
  activePage: string;
  pageHeader: string;
  basic: any;
  resources: Array<any>;
  services: Array<any>;
  utilities: Array<any>;
  onEditDetails: Function;
  downloadFacility: Function;
  badge: any;
};
export default index;

const DetailsContainer = styled.div`
  margin-top: 10px;
`;

const FacilityPage = styled.div``;

const CardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
