import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import SearchTabs from "./SearchTabs";
import { connect } from "react-redux";
import styled from "styled-components";
import FilterCards from "../../molecules/FacilityFilterCards";
import Card from "../../atoms/Card";

const drawerWidth = 320;

const FilterDrawer = (props: Props) => {
  const {
    open,
    dependancies,
    filterOptions,
    onAddFilter,
    onRemoveFilter
  } = props;
  return (
    <FilterContainer open={open}>
      <SearchTabs
        dependancies={dependancies}
        filterOptions={filterOptions}
        onAddFilter={onAddFilter}
        mobile
      />
      {filterOptions.length > 0 && (
        <Card>
          <FilterCards
            filterOptions={filterOptions}
            onRemove={onRemoveFilter}
          />
        </Card>
      )}
    </FilterContainer>
  );
};

type Props = {
  classes?: any;
  open: boolean;
  dependancies: any;
  filterOptions: Array<any>;
  onAddFilter: Function;
  onRemoveFilter: Function;
};

const FilterContainer = styled<any>("div")`
  position: fixed;
  z-index: 1100;
  width: 100%;
  display: ${props => (props.open ? "block" : "none")};
  top: 120px;
`;

const mapStateToProps = (state: any) => ({
  dependancies: state.dependancies,
  filterOptions: state.facilities.advancedFilter.filterValues
});

export default connect(
  mapStateToProps,
  null
)(FilterDrawer);
