import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import SearchTabs from "./SearchTabs";
import { connect } from "react-redux";

const drawerWidth = 320;

const FilterDrawer = (props: Props) => {
  const onAddFilter = (value: any) => {};
  const { classes, open, dependancies, filterOptions } = props;
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <SearchTabs
        dependancies={dependancies}
        filterOptions={filterOptions}
        onAddFilter={(value: any) => onAddFilter(value)}
      />
    </Drawer>
  );
};

type Props = {
  classes?: any;
  open: boolean;
  dependancies: any;
  filterOptions: Array<any>;
};
const styles: any = (theme: any) => ({
  root: {
    display: "flex"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    top: "136px",
    height: `70vh !important`,
    boxShadow:
      "0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12)"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  }
});

const mapStateToProps = (state: any) => ({
  dependancies: state.dependancies,
  filterOptions: state.facilities.advancedFilter.filterValues
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles, { withTheme: true })(FilterDrawer));
