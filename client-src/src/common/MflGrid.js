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

import PropTypes from 'prop-types';

class MflGrid extends React.Component{

    propTypes = {
        // TODO: show outline required prop types
    }

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
        );
    }
}

export default MflGrid;