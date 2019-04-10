import React from "react";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
  Toolbar,
  SearchPanel
} from "@devexpress/dx-react-grid-material-ui";
import {
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
  FilteringState,
  IntegratedFiltering,
  SearchState
} from "@devexpress/dx-react-grid";

import Paper from "@material-ui/core/Paper";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import styled, { withTheme } from "styled-components";

const Title = styled.div`
  font-size: 24px;
  margin-bottom: -40px;
`;

const styles = () => ({
  tableStriped: {
    "& tbody tr:nth-of-type(odd)": {
      backgroundColor: fade("#f1f1f1", 1)
    },
    "& thead tr": {
      backgroundColor: fade("#375a8c", 1),
      color: fade("#ffffff", 1)
    },
    "& thead tr th": {
      color: fade("#ffffff", 1)
    },
    "& thead tr th span:hover": {
      color: fade("#f1f1f1", 1)
    },
    "& thead tr th span:focus": {
      color: fade("#f1f1f1", 1)
    }
  },
  toolBar: {
    div: {
      backgroundColor: fade("#375a8c", 1),
      color: fade("#ffffff", 1)
    }
  }
});

const TableComponentBase = ({ classes, ...restProps }) => (
  <Table.Table {...restProps} className={classes.tableStriped} />
);

export const TableComponent = withStyles(styles, { name: "TableComponent" })(
  TableComponentBase
);

const ToolbarBase = ({ classes, ...restProps }) => (
  <Toolbar {...restProps} className="search-panel" />
);

export const ToolBarComponent = withStyles(styles, {
  name: "ToolBarComponent"
})(ToolbarBase);

class MflGrid extends React.Component {
  render() {
    const TableRow = ({ row, ...restProps }) => (
      <Table.Row
        {...restProps}
        onClick={() => this.props.rowSelected(row)}
        style={{
          cursor: "pointer"
        }}
      />
    );

    return (
      <React.Fragment>
        <Paper>
          <Grid rows={this.props.rows} columns={this.props.columns}>
            <SortingState defaultSorting={this.props.defaultSorting} />
            <IntegratedSorting />
            <PagingState
              defaultCurrentPage={0}
              pageSize={this.props.pageSize}
            />
            <IntegratedPaging />
            <FilteringState defaultFilters={[]} />
            <SearchState />
            <IntegratedFiltering />
            <Table tableComponent={TableComponent} rowComponent={TableRow} />
            <TableHeaderRow showSortingControls />
            <ToolBarComponent />
            <SearchPanel
              style={{
                backgroundColor: fade("#375a8c", 1),
                color: fade("#ffffff", 1)
              }}
            />
            <PagingPanel />
          </Grid>
        </Paper>
      </React.Fragment>
    );
  }
}

export default MflGrid;
