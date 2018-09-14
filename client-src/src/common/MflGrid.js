import React from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
  Toolbar,
  SearchPanel
} from '@devexpress/dx-react-grid-material-ui';
import {
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
  FilteringState,
  IntegratedFiltering,
  SearchState
} from '@devexpress/dx-react-grid'
import styled from 'styled-components'

const Title = styled.div`
  font-size: 24px;
  margin-bottom: -40px;
`

class MflGrid extends React.Component {

  render() {
    const TableRow = ({ row, ...restProps }) => (
      <Table.Row
        {...restProps}
        onClick={() => this.props.rowSelected(row)}
        style={{
          cursor: 'pointer',
        }}
      />
    );

    return (
      <React.Fragment>
        <Title className='hide-facilities-table-title'>
          {this.props.title}
        </Title>
        <Grid
          rows={this.props.rows}
          columns={this.props.columns}>
          <SortingState
            defaultSorting={this.props.defaultSorting}
          />
          <IntegratedSorting />
          <PagingState
            defaultCurrentPage={0}
            pageSize={this.props.pageSize}
          />
          <IntegratedPaging />
          <FilteringState defaultFilters={[]} />
          <SearchState />
          <IntegratedFiltering />
          <Table rowComponent={TableRow} />
          <TableHeaderRow showSortingControls />
          <Toolbar />
          <SearchPanel />
          <PagingPanel />
        </Grid>
      </React.Fragment>
    );
  }
}

export default MflGrid;
