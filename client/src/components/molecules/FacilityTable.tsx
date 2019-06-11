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
import { withStyles } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";

const TableComponentBase = ({ classes, ...restProps }: any) => (
  <Table.Table {...restProps} className={classes.tableStriped} />
);

function FacilityTable(props: Props) {
  const { defaultSorting, pageSize, onSelected, data, columns } = props;

  const TableRow = ({ row, ...restProps }: any) => (
    <Table.Row
      {...restProps}
      onClick={() => onSelected(row)}
      style={{
        cursor: "pointer"
      }}
    />
  );

  return (
    <div className="table">
      <Grid rows={data} columns={columns}>
        <SortingState defaultSorting={defaultSorting} />
        <IntegratedSorting />
        <PagingState defaultCurrentPage={0} pageSize={pageSize} />
        <IntegratedPaging />
        <FilteringState defaultFilters={[]} />
        <SearchState />
        <IntegratedFiltering />
        <Table tableComponent={StyledTable} rowComponent={TableRow} />
        <TableHeaderRow showSortingControls />
        <Toolbar />
        <SearchPanel />
        <PagingPanel />
      </Grid>
    </div>
  );
}

export default FacilityTable;
type Props = {
  onSelected: Function;
  data: Array<any>;
  columns: Array<any>;
  pageSize: number;
  defaultSorting: Array<any>;
};

const StyledTable = withStyles({
  tableStriped: {
    "& tbody tr:nth-of-type(odd)": {
      backgroundColor: fade("#f1f1f1", 1)
    },
    "& thead tr": {
      backgroundColor: fade("#375a8c", 1),
      color: fade("#ffffff", 1)
    },
    "& thead tr th": {
      color: fade("#ffffff", 1),
      borderRadius: "0px"
    },
    "& thead tr th span:hover": {
      color: fade("#f1f1f1", 1)
    },
    "& thead tr th span:focus": {
      color: fade("#f1f1f1", 1)
    }
  }
})(TableComponentBase);
