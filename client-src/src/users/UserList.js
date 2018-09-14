import React from 'react';
import { connect } from 'react-redux';
import { Collection, Row, Input, Card } from 'react-materialize';
import { UserListItem } from './index';
import { fetchUsers } from '../actions/index';
import { MflGrid } from '../common/index';
import '../App.css';
import './UserStyles.css';

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
        const columns = [
            { name: 'username', title: 'Username' },
            { name: 'firstname', title: 'Firstname' },
            { name: 'lastname', title: 'Lastname' },
            { name: 'email', title: 'Email' },
        ];

        const defaultSorting = [{ columnName: 'firstname', direction: 'asc' }];

        return (
            <Card className="user-list pt-8" >
                <MflGrid
                    rows={this.props.users}
                    columns={columns}
                    pageSize={10}
                    defaultSorting={defaultSorting}
                    rowSelected={
                        (user) => this.props.onUserSelected(user)
                    }
                />
            </Card>
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
