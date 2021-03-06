import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Tooltip from "@material-ui/core/Tooltip";
import BasicFilter from "../../molecules/FacilityBasicFilterTab";
import ResourcesFilter from "../../molecules/FacilityResourcesFilterTab";
import UtilitiesFilter from "../../molecules/FacilitiesUtilitiesFilterTab";
import ServicesFilter from "../../molecules/FacilitiesServicesFilterTab";
import styled from "styled-components";
import FilterCards from "../../molecules/FacilityFilterCards";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospital,
  faBed,
  faWifi,
  faStethoscope
} from "@fortawesome/free-solid-svg-icons";

class SearchTabs extends React.Component<Props> {
  state = {
    value: 0
  };

  handleChange = (event: any, value: any) => {
    this.setState({ value });
  };

  render() {
    const { classes, mobile, onRemoveFilter, filterOptions } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Tabs
          value={value}
          onChange={this.handleChange}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        >
          <Tooltip title="Filter By Basic Details">
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label={<FontAwesomeIcon icon={faHospital} />}
            />
          </Tooltip>
          <Tooltip title="Filter By Resources">
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label={<FontAwesomeIcon icon={faBed} />}
            />
          </Tooltip>
          <Tooltip title="Filter By Utilities">
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label={<FontAwesomeIcon icon={faWifi} />}
            />
          </Tooltip>
          <Tooltip title="Filter By Services">
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label={<FontAwesomeIcon icon={faStethoscope} />}
            />
          </Tooltip>
        </Tabs>
        {mobile && (
          <ChipsContainer>
            <FilterCards
              filterOptions={filterOptions}
              onRemove={onRemoveFilter ? onRemoveFilter : () => {}}
            />
          </ChipsContainer>
        )}
        <TabContainer mobile={mobile}>
          {value === 0 && (
            <BasicFilter
              dependancies={this.props.dependancies}
              filterOptions={this.props.filterOptions}
              onAddFilter={this.props.onAddFilter}
            />
          )}
          {value === 1 && (
            <ResourcesFilter
              dependancies={this.props.dependancies}
              filterOptions={this.props.filterOptions}
              onAddFilter={this.props.onAddFilter}
            />
          )}
          {value === 2 && (
            <UtilitiesFilter
              dependancies={this.props.dependancies}
              filterOptions={this.props.filterOptions}
              onAddFilter={this.props.onAddFilter}
            />
          )}
          {value === 3 && (
            <ServicesFilter
              dependancies={this.props.dependancies}
              filterOptions={this.props.filterOptions}
              onAddFilter={this.props.onAddFilter}
            />
          )}
        </TabContainer>
      </div>
    );
  }
}

type Props = {
  classes: any;
  onAddFilter: Function;
  filterOptions: Array<any>;
  dependancies: any;
  mobile?: boolean;
  onRemoveFilter?: Function;
};
const TabContainer = styled<any>("div")`
  height: ${props => (props.mobile ? "calc(100vh - 272px)" : "35.5rem")};
  overflow: scroll;
`;

const ChipsContainer = styled.div`
  height: 7vh;
  display: flex;
  align-items: center;
`;

const styles: any = (theme: any) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  tabsRoot: {
    borderBottom: "1px solid #e8e8e8",
    margin: "0px"
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

export default withStyles(styles)(SearchTabs);
