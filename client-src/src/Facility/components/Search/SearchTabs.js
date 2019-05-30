import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import BasicFilter from "./BasicFilter";
import ResourcesFilter from "./ResourcesFilter";
import UtilitiesFilter from "./UtilitiesFilter.js";
import ServicesFilter from "./ServicesFilter";
import Icon from "@material-ui/core/Icon";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospital,
  faEnvelope,
  faBed,
  faWifi,
  faStethoscope
} from "@fortawesome/free-solid-svg-icons";

const TabContainer = styled.div`
  height: 35.5rem;
  overflow: scroll;
`;

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  tabsRoot: {
    borderBottom: "1px solid #e8e8e8",
    margin: "10px 0px"
  },
  tabsIndicator: {
    height: "0px"
  },
  tabRoot: {
    textTransform: "initial",
    minWidth: "24%",
    marginRight: "4px",
    fontWeight: theme.typography.fontWeightRegular,
    background: "#ededed",
    "&:hover": {
      color: "#40a9ff",
      opacity: 1
    },
    "&$tabSelected": {
      fontWeight: theme.typography.fontWeightMedium
    },
    "&:focus": {
      color: "#40a9ff"
    }
  },
  tabSelected: {
    borderLeft: "5px solid #94afd0",
    borderBottom: "0px !important"
  },
  typography: {
    padding: theme.spacing.unit * 3
  }
});

class SearchTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Tabs
          value={value}
          onChange={this.handleChange}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        >
          <Tab
            title="Filter By Basic Details"
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label={<FontAwesomeIcon icon={faHospital} />}
          />
          <Tab
            title="Filter By Resources"
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label={<FontAwesomeIcon icon={faBed} />}
          />
          <Tab
            title="Filter By Utilities"
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label={<FontAwesomeIcon icon={faWifi} />}
          />
          <Tab
            title="Filter By Services"
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label={<FontAwesomeIcon icon={faStethoscope} />}
          />
        </Tabs>
        <TabContainer>
          {value === 0 && (
            <BasicFilter onAddFilter={value => this.props.onAddFilter(value)} />
          )}
          {value === 1 && (
            <ResourcesFilter
              onAddFilter={value => this.props.onAddFilter(value)}
              filterOptions={this.props.filterOptions}
            />
          )}
          {value === 2 && (
            <UtilitiesFilter
              onAddFilter={value => this.props.onAddFilter(value)}
            />
          )}
          {value === 3 && (
            <ServicesFilter
              onAddFilter={value => this.props.onAddFilter(value)}
            />
          )}
        </TabContainer>
      </div>
    );
  }
}

SearchTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchTabs);
