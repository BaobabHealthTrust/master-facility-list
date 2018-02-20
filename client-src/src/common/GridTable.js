import ReactDataGrid from 'react-data-grid';
import * as React from 'react';

export default class GridTable extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._columns = [
            {
                key: 'code',
                name: 'CODE',
                locked: true
            },
            {
                key: 'name',
                name: 'NAME',
                width: 200,
                sortable: true
            },
            {
                key: 'commonname',
                name: 'COMMON NAME',
                width: 200,
                sortable: true
            },
            {
                key: 'ownership',
                name: 'OWNERSHIP',
                width: 200,
                sortable: true
            },
            {
                key: 'type',
                name: 'TYPE',
                width: 200,
                sortable: true
            },
            {
                key: 'status',
                name: 'STATUS',
                width: 200,
                sortable: true
            },
            {
                key: 'district',
                name: 'DISTRICT',
                width: 200,
                sortable: true
            },
            {
                key: 'dateopened',
                name: 'DATE OPENED',
                width: 200,
                sortable: true,
                sortDescendingFirst: true
            },
        ];
        let data = [];
        this.state = {
            data, filters: {}, sortColumn: null, sortDirection: null
        };
    }

    // handleGridSort = (sortColumn, sortDirection) => {
    //     const comparer = (a, b) => {
    //         if (sortDirection === 'ASC') {
    //             return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
    //         } else if (sortDirection === 'DESC') {
    //             return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
    //         }
    //     };

    handleGridSort = (sortColumn, sortDirection) => {
        this.setState({ sortColumn: sortColumn, sortDirection: sortDirection });
    };


    //     const data = sortDirection === 'NONE' ? this.props.data.slice(0) : this.props.data.sort(comparer);

    //     this.setState({ data });
    // };

    rowGetter = (i) => {
        return this.props.data[i];
    };



    render() {
        return (
            <ReactDataGrid
                onGridSort={this.handleGridSort}
                columns={this._columns}
                rowGetter={this.rowGetter}
                rowsCount={this.props.data.length}
                minHeight={700}
                onAddFilter={this.handleFilterChange}
                onClearFilters={this.onClearFilters}
            />);
    }
}

