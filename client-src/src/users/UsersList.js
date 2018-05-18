import React from 'react';
import { connect } from 'react-redux';
import { Collection, Row, Input } from 'react-materialize';
import User from './User';

class UsersList extends React.Component{
    state = {
        users: []
    }
    render() {
        return (
            <React.Fragment>
                <Collection>
                    {this.props.users.map(user => <User user={user} onUserSelected={this.props.onUserSelected}/>)}
                </Collection>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        users: state.users.users
    }
}
export default connect(mapStateToProps)(UsersList);