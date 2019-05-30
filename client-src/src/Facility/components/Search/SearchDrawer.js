import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import SearchTabs from "./SearchTabs";
import SearchChipsContainer from "./SearchChipsContainer";
import { Button } from "react-materialize";
import quickSearchFacilities from "../../../actions/quick-search-facilities";

const drawerWidth = 320;

const styles = theme => ({
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

class SearchDrawer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={this.props.open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <SearchTabs
          filterOptions={this.props.filterOptions}
          onAddFilter={value => this.props.onAddFilter(value)}
        />
      </Drawer>
    );
  }
}
export default withStyles(styles, { withTheme: true })(SearchDrawer);
