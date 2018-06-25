import React from 'react';
import { Card, CardTitle, Table, Button, Icon } from 'react-materialize';
import { EditUserModal, UserForm, ChangePasswordForm } from './index';
import { connect } from 'react-redux';
import { postFormData, fetchUsers } from '../actions/index';
import moment from 'moment';
import '../App.css';

class ViewUser extends React.Component {

  state = {
    delay: 3000,
    userId: sessionStorage.getItem('userId')
  }

  constructor(props) {
    super(props);
  }
  
  showToastMessage = message => {
    window.Materialize.toast(message, this.state.delay);
  }

  archiveUser = async () => {
    if(await window.confirm('Are you sure you want archive this user?')){
      await this.props.postFormData(
        { archived_date: moment().format('YYYY-MM-DD') },
        `Clients/${this.props.user.id}`,
        'PATCH',
        'ARCHIVE_USER'
      );
      // TODO: Check if this has really deleted the user
      await this.props.fetchUsers();
      this.props.onUserArchived();
    }
  }

  emptyUserState = () => (
    <Card
      title="No user selected">
      <p>Select a user from the list for more details</p>
    </Card>
  );

  showDeleteButton = () => {
    const propsUserId = Number(this.props.user.id);
    const storageUserId = Number(sessionStorage.getItem('id'));

    if(propsUserId === storageUserId){
      return ''
    }
    return (
      <Button
        waves='light'
        className="red"
        onClick={this.archiveUser}>
        delete
      </Button>
    );
  }

  userView = () => (this.props.user ? (
    <Card
      title="User Details"
      actions={[
        <EditUserModal 
          user={this.props.user}
          onUserUpdateSuccess={this.props.onUserUpdateSuccess}
          onUserUpdateError={this.props.onUserUpdateError}
        />,
        <ChangePasswordForm user={this.props.user}/>,
        this.showDeleteButton()

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
  ) : '');

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
