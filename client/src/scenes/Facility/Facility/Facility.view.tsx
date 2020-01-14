import React, { useState } from "react";
import { Grid, withStyles } from "@material-ui/core";
import classNames from "classnames";
import Card from "../../../components/atoms/Card";
import Container from "../../../components/atoms/Container";
import FacilityList from "../../../components/organisms/FacilityList";
import FacilityToolBar from "../../../components/molecules/FacilityToolbar";
import FacilityFilterDrawer from "../../../components/organisms/FacilityFilter";
import MobileFilterDrawer from "../../../components/organisms/FacilityFilter/MobileFilter";
import FilterButton from "../../../components/atoms/FacilityFilterButton";
import MobileFilterButton from "../../../components/atoms/FacilityMobileFilterButton";
import FilterCards from "../../../components/molecules/FacilityFilterCards";
import MobilePageTitle from "../../../components/molecules/MobilePageTitle";
import Loader from "../../../components/atoms/Loader";
import {
  DesktopView,
  MobileView,
  MobileTitle,
  styles
} from "./Facility.styles";

const Facilities = (props: Props) => {
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
export default withStyles(styles, { withTheme: true })(Facilities);
