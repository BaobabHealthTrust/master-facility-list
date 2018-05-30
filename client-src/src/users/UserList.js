import React from 'react';
import { connect } from 'react-redux';
import { Collection, Row, Input, Card } from 'react-materialize';
import {UserListItem, UsersPaginator} from './index';
import { fetchUsers } from '../actions/index';
import '../App.css';

class UsersList extends React.Component{
    state = {
        limit: this.props.limit,
        page: this.props.page,
        skip: this.props.skip,
        prevPressed: false
    }

    componentWillMount() {
        this.fetchMoreUsers();
    }


    fetchMoreUsers = () => {
        this.props.fetchUsers(this.state.limit, this.state.skip);
        const page = this.state.page + 1;
        const skip = this.state.limit * this.state.page;
        this.setState((prevState, props) => ({
            page,
            skip,
            prevPressed: false
        }));
        console.log('Next button pressed');
        console.log(`Current state: page ${page} | skip ${skip} `);
    }

    fetchPreviousUser = () => {
        let page = this.state.page == 1 ? this.state.page : this.state.page - 1;
        if(!this.state.prevPressed){
            page = page - 1;
            this.setState({
                prevPressed: true
            });
        }
        const skip = this.state.skip < this.state.limit ? 0 : (page * this.state.limit) - this.state.limit;
        this.setState((prevState, props) => ({
            page,
            skip
        }));
        console.log('Previous button pressed');
        console.log(`Current state: page ${page} | skip ${skip} `);
        this.props.fetchUsers(this.state.limit, skip);
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.props.users ? 

                    <React.Fragment>
                        <Collection className="users-list">
                            {this.props.users.map(user => (
                                <UserListItem
                                    user={user}
                                    onUserSelected={this.props.onUserSelected}
                                />
                            ))}
                        </Collection>
                        <UsersPaginator
                            onNext={this.fetchMoreUsers}
                            onPrevious={this.fetchPreviousUser}
                            showPrevious={this.state.skip !== 0}
                        />
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
        users: state.users.users,
        limit: state.users.limit,
        skip: state.users.skip,
        page: state.users.page
    }
}
const mapDispatchToProps = {
    fetchUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);