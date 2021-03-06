import React, { useState } from "react";
import styled from "styled-components";
import { Grid, withStyles } from "@material-ui/core";
import classNames from "classnames";
import Card from "../../components/atoms/Card";
import Container from "../../components/atoms/Container";
import FacilityList from "../../components/organisms/FacilityList";
import FacilityToolBar from "../../components/molecules/FacilityToolbar";
import FacilityFilterDrawer from "../../components/organisms/FacilityFilter";
import MobileFilterDrawer from "../../components/organisms/FacilityFilter/MobileFilter";
import FilterButton from "../../components/atoms/FacilityFilterButton";
import MobileFilterButton from "../../components/atoms/FacilityMobileFilterButton";
import FilterCards from "../../components/molecules/FacilityFilterCards";
import MobilePageTitle from "../../components/molecules/MobilePageTitle";
import Loader from "../../components/atoms/Loader";

const drawerWidth = 360;
const styles = (theme: any) => ({
  content: {
    flexGrow: 1,
    paddingLeft: `calc(${drawerWidth}px + 150px)`,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: `calc(100% + ${drawerWidth}px)`,
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    paddingLeft: `calc(${drawerWidth}px + 115px)`,
    width: "100%",
    marginLeft: 0
  }
});

const index = (props: Props) => {
  const {
    classes,
    onToggleDrawer,
    drawerOpen,
    facilities,
    onFacilityClicked,
    onRemoveFilter,
    onAddFilter,
    filterOptions,
    downloadList,
    isLoading
  } = props;

  return (
    <>
      <DesktopView>
        <FilterButton open={drawerOpen} onClick={onToggleDrawer} />
        <FacilityFilterDrawer open={drawerOpen} onAddFilter={onAddFilter} />
        <Container
          style={{
            minHeight: "100%",
            paddingTop: "25px",
            flexGrow: "1"
          }}
          className={classNames(classes.content, {
            [classes.contentShift]: drawerOpen
          })}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <FacilityToolBar downloadList={downloadList} />
            </Grid>
            {filterOptions.length > 0 && (
              <Grid item xs={12} md={12}>
                <Card>
                  <FilterCards
                    filterOptions={filterOptions}
                    onRemove={onRemoveFilter}
                  />
                </Card>
              </Grid>
            )}
            <Grid item xs={12} md={12}>
              {isLoading ? (
                <Loader style={{ height: "50vh" }} />
              ) : (
                <FacilityList onSelect={onFacilityClicked} data={facilities} />
              )}
            </Grid>
          </Grid>
        </Container>
      </DesktopView>
      <MobileView>
        <MobilePageTitle>
          <Container>
            <MobileTitle>
              {filterOptions.length > 0 ? "Filtered Facilities" : "Facilities"}
              <MobileFilterButton open={drawerOpen} onClick={onToggleDrawer} />
            </MobileTitle>
          </Container>
        </MobilePageTitle>
        <MobileFilterDrawer
          open={drawerOpen}
          onAddFilter={onAddFilter}
          onRemoveFilter={onRemoveFilter}
        />
        <Container
          style={{
            minHeight: "100%",
            paddingTop: "70px",
            flexGrow: "1"
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              {isLoading ? (
                <Loader style={{ height: "50vh" }} />
              ) : (
                <FacilityList onSelect={onFacilityClicked} data={facilities} />
              )}
            </Grid>
          </Grid>
        </Container>
      </MobileView>
    </>
  );
};

type Props = {
  drawerOpen: boolean;
  onToggleDrawer: Function;
  facilities: Array<any>;
  classes?: any;
  onFacilityClicked: Function;
  onAddFilter: Function;
  onRemoveFilter: Function;
  filterOptions: Array<any>;
  downloadList: Function;
  isLoading: boolean;
};
export default withStyles(styles, { withTheme: true })(index);

const DesktopView = styled.div.attrs({
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
