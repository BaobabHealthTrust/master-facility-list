import React from "react";
import { Grid } from "@material-ui/core";
import Card from "../../../components/atoms/Card";
import Container from "../../../components/atoms/Container";
import FacilitySubMenu from "../../../components/organisms/FacilitySubmenu";
import FacilityView from "../../../components/organisms/FacilityViewPage";
import styled from "styled-components";

function ViewFacility(props: Props) {
  const {
    facilitySubMenu,
    onChangePage,
    activePage,
    basic,
    resources,
    services,
    utilities,
    onEditDetails
  } = props;
  const pageHeader = facilitySubMenu.filter(val => val.link == activePage);
  return (
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
            />
          </Grid>
        </Grid>
      </Grid>
    </DesktopView>
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
};
export default ViewFacility;

const DesktopView = styled(Container).attrs({
  className: "hide-on-med-and-down"
})``;
