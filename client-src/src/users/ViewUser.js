import React from 'react';
import { Card, CardTitle, Table, Button } from 'react-materialize';
import { EditUserModal } from './index';
import { connect } from 'react-redux';
import { postFormData, fetchUsers } from '../actions/index';
import moment from 'moment';
import '../App.css';

class ViewUser extends React.Component {

  archiveUser = async () => {
    await this.props.postFormData(
      { archived_date: moment().format('YYYY-MM-DD') },
      `Clients/${this.props.user.id}`,
      'PATCH',
      'ARCHIVE_USER'
    );
    // TODO: Check if this has really deleted the user
    await this.props.fetchUsers();
  }

  emptyUserState = () => (
    <Card
      title="No user selected">
      <p>Select a user from the list for more details</p>
    </Card>
  );

  userView = () => (this.props.user ? (
    <Card
      title="User Details"
      actions={[
        // <EditUserModal />,
        <Button waves='light' className="red mfl-lm-" onClick={this.archiveUser}>archive user</Button>
      ]}>
      <Table>
        <tbody>
          <tr>
            <td>First Name</td>
            <td>{this.props.user.firstname}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>{this.props.user.lastname}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{this.props.user.email}</td>
          </tr>
          <tr>
            <td>Role</td>
            <td>System administrator</td>
          </tr>
        </tbody>
      </Table>
    </Card>
  ) : 'what??');

  render() {
    return (
      <React.Fragment>
        {this.props.user ? this.userView() : this.emptyUserState()}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  postFormData,
  fetchUsers
}

export default connect(null, mapDispatchToProps)(ViewUser);
