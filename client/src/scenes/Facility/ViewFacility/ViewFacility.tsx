import React from "react";
import { Grid } from "@material-ui/core";
import Card from "../../../components/atoms/Card";
import Container from "../../../components/atoms/Container";
import FacilitySubMenu from "../../../components/organisms/FacilitySubmenu";
import FacilityView from "../../../components/organisms/FacilityViewPage";
import FacilityMobileView from "../../../components/organisms/FacilityViewPage/MobileView";
import FacilityMobileSubmenu from "../../../components/organisms/FacilitySubmenu/MobileSubMenu";
import styled from "styled-components";
import MobilePageTitle from "../../../components/molecules/MobilePageTitle";

function ViewFacility(props: Props) {
  const {
    facilitySubMenu,
    onChangePage,
    activePage,
    basic,
    resources,
    services,
    utilities,
    onEditDetails,
    downloadFacility
  } = props;
  const pageHeader = facilitySubMenu.filter(val => val.link == activePage);
  return (
    <>
      <DesktopView style={{ paddingTop: "20px" }}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12} md={3}>
            <Card heading="Facility menu">
              <FacilitySubMenu
                menu={facilitySubMenu}
                onClick={onChangePage}
                activePage={activePage}
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <Grid container spacing={24}>
              <FacilityView
                activePage={activePage}
                pageHeader={pageHeader.length > 0 && pageHeader[0].name}
                basic={basic}
                resources={resources}
                services={services}
                utilities={utilities}
                onEditDetails={onEditDetails}
                downloadFacility={downloadFacility}
              />
            </Grid>
          </Grid>
        </Grid>
      </DesktopView>
      <MobileView>
        <MobilePageTitle>
          <Container>
            <MobileTitle>{basic.facility_name}</MobileTitle>
          </Container>
          <FacilityMobileSubmenu
            menu={facilitySubMenu}
            onClick={onChangePage}
            activePage={activePage}
          />
        </MobilePageTitle>
        <Container style={{ paddingTop: "100px" }}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12} md={3} />
            <Grid item xs={12} sm={12} md={9}>
              <Grid container spacing={24}>
                <FacilityMobileView
                  activePage={activePage}
                  pageHeader={pageHeader.length > 0 && pageHeader[0].name}
                  basic={basic}
                  resources={resources}
                  services={services}
                  utilities={utilities}
                  onEditDetails={onEditDetails}
                  downloadFacility={downloadFacility}
                />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </MobileView>
    </>
  );
}

type Props = {
  activePage: string;
  basic: any;
  resources: Array<any>;
  services: Array<any>;
  utilities: Array<any>;
  onChangePage: Function;
  onEditDetails: Function;
  facilitySubMenu: Array<any>;
  downloadFacility: Function;
};
export default ViewFacility;

const DesktopView = styled(Container).attrs({
  className: "hide-on-med-and-down"
})``;
const MobileView = styled.div.attrs({
  className: "hide-on-large-only"
})``;
const MobileTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`;
