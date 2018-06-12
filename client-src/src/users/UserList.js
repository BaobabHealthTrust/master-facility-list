import React from 'react';
import { connect } from 'react-redux';
import { Collection, Row, Input, Card } from 'react-materialize';
import { UserListItem } from './index';
import { fetchUsers } from '../actions/index';
import '../App.css';

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
} from '@devexpress/dx-react-grid';

class UsersList extends React.Component{
    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        const TableRow = ({ row, ...restProps }) => (
            <Table.Row
                {...restProps}
                onClick={() => this.props.onUserSelected(row)}
                style={{
                    cursor: 'pointer',
                }}
            />
        );
        return (
            <React.Fragment>
                {
                    this.props.users ? 

                    <React.Fragment>
                            <Card className="user-list">
                            <Grid
                                rows={this.props.users}
                                columns={[
                                    { name: 'firstname', title: 'Firstname' },
                                    { name: 'lastname', title: 'Lastname' },
                                    { name: 'email', title: 'Email' },
                                ]}>
                                <SortingState
                                    defaultSorting={[{ columnName: 'firstname', direction: 'asc' }]}
                                />
                                <IntegratedSorting />
                                <PagingState
                                    defaultCurrentPage={0}
                                    pageSize={10}
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
                        </Card>
                    </React.Fragment>

                    :

                    <Card title="No users">
                        <p>
                            Currently, there are no users in the system
                        </p>
                    </Card>
                }
                
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return { 
        users: state.users.users
    }
}
const mapDispatchToProps = {
    fetchUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);