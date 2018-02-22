import ReactDataGrid from "react-data-grid";
import * as React from "react";
import { Redirect } from "react-router-dom";
import { hideSearchContainer } from "../actions";
import { connect } from "react-redux";

class GridTable extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._columns = [
            {
                key: "code",
                name: "CODE",
                locked: true
            },
            {
                key: "name",
                name: "NAME",
                width: 200,
                sortable: true
            },
            {
                key: "commonname",
                name: "COMMON NAME",
                width: 200,
                sortable: true
            },
            {
                key: "ownership",
                name: "OWNERSHIP",
                width: 200,
                sortable: true
            },
            {
                key: "type",
                name: "TYPE",
                width: 200,
                sortable: true
            },
            {
                key: "status",
                name: "STATUS",
                width: 200,
                sortable: true
            },
            {
                key: "district",
                name: "DISTRICT",
                width: 200,
                sortable: true
            },
            {
                key: "dateopened",
                name: "DATE OPENED",
                width: 200,
                sortable: true,
                sortDescendingFirst: true
            }
        ];
        let data = [];
        this.state = {
            data,
            filters: {},
            redirect: false,
            redirectLink: null
        };
    }

    handleGridSort = (sortColumn, sortDirection) => {
        const comparer = (a, b) => {
            if (sortDirection === "ASC") {
                return a[sortColumn] > b[sortColumn] ? 1 : -1;
            } else if (sortDirection === "DESC") {
                return a[sortColumn] < b[sortColumn] ? 1 : -1;
            }
        };

        const data =
            sortDirection === "NONE"
                ? this.props.data.slice(0)
                : this.props.data.sort(comparer);

        this.setState({ data });
    };

    rowGetter = i => {
        return this.props.data[i];
    };

    onRowClick = (rowIndex, row) => {
        rowIndex > -1
            ? this.setState(prevState => ({
                  redirect: !prevState.redirect,
                  redirectLink: `/facilities/${this.props.data[rowIndex]["id"]}`
              }))
            : "";
    };

    render() {
        if (!this.state.redirect) {
            return (
                <ReactDataGrid
                    onGridSort={this.handleGridSort}
                    columns={this._columns}
                    rowGetter={this.rowGetter}
                    onRowClick={this.onRowClick}
                    rowsCount={this.props.data.length}
                    minHeight={550}
                />
            );
        }
        this.props.hideSearchContainer(true);
        return <Redirect to={this.state.redirectLink} />;
    }
}
const mapStateToProps = state => {
    return {};
};
export default connect(mapStateToProps, { hideSearchContainer })(GridTable);
