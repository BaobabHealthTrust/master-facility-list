import React, { useState } from "react";
import styled from "styled-components";
import { Grid, withStyles } from "@material-ui/core";
import classNames from "classnames";
import Card from "../../components/atoms/Card";
import Container from "../../components/atoms/Container";
import FacilityList from "../../components/organisms/FacilityList";
import FacilityToolBar from "../../components/molecules/FacilityToolbar";
import FacilityFilterDrawer from "../../components/organisms/FacilityFilter";
import FilterButton from "../../components/atoms/FacilityFilterButton";

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
    onFacilityClicked
  } = props;

  return (
    <div className="hide-on-med-and-down">
      <FilterButton open={drawerOpen} onClick={onToggleDrawer} />
      <FacilityFilterDrawer open={drawerOpen} />
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
        <Grid className="hide-on-small-only" container spacing={16}>
          <Grid item xs={12} md={12}>
            <FacilityToolBar />
          </Grid>

          <Grid item xs={12} md={12}>
            <FacilityList onSelect={onFacilityClicked} data={facilities} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

type Props = {
  drawerOpen: boolean;
  onToggleDrawer: Function;
  facilities: Array<any>;
  classes?: any;
  onFacilityClicked: Function;
};
export default withStyles(styles, { withTheme: true })(index);
