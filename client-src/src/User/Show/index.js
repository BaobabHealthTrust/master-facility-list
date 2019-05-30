import React, { Component } from "react";
import { Card, Table, Button, Col } from "react-materialize";
import ChangePassword from "../Update/ChangePassword";
import UpdateUserModal from "../Update";
import { connect } from "react-redux";
import { postFormData, fetchUsers } from "../../actions/index";
import moment from "moment";
import { Toast } from "../../common";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "../../App.css";

export class Index extends Component {
  archiveUser = async () => {
    const { postFormData, user, fetchUsers, onUserArchived } = this.props;
    await postFormData(
      { archived_date: moment().format("YYYY-MM-DD") },
      `Clients/${user.id}`,
      "PATCH",
      "ARCHIVE_USER"
    );
    await fetchUsers();
    onUserArchived();
  };

  confirmUserArchive = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Col m={6} s={12} style={{ minWidth: "400px" }}>
            <Card
              title="Confirm"
              className="blu darken-4"
              textClassName="white-tex"
              actions={[
                <Button onClick={onClose} className="mfl-rm-2 btn-flat">
                  No
                </Button>,
                <Button
                  className="btn-flat"
                  onClick={async () => {
                    await this.archiveUser();
                    onClose();
                  }}
                >
                  Yes
                </Button>
              ]}
            >
              Are you sure you want to delete this user ?
            </Card>
          </Col>
        );
      }
    });
  };
  showDeleteButton = () => {
    const propsUserId = Number(this.props.user.id);
    const storageUserId = Number(sessionStorage.getItem("id"));

    if (propsUserId === storageUserId) {
      return "";
    }

    return (
      <Button waves="light" className="red" onClick={this.confirmUserArchive}>
        Delete User
      </Button>
    );
  };

  _renderUserDetails = () => {
    const { user } = this.props;
    return (
      <Table test-id="viewuser">
        <tbody>
          <tr>
            <td>First Name</td>
            <td>{user.firstname}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>{user.lastname}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>Role</td>
            <td>System administrator</td>
          </tr>
        </tbody>
      </Table>
    );
  };
  userView = () =>
    this.props.user ? (
      <Card
        title="User Details"
        actions={[
          <UpdateUserModal
            user={this.props.user}
            onUserUpdated={this.props.onUserUpdated}
            onUserUpdateError={this.props.onUserUpdateError}
          />,
          <ChangePassword
            user={this.props.user}
            redirect={this.props.redirect}
          />,
          this.showDeleteButton()
        ]}
      >
        <div className="mb-2" />
        {this._renderUserDetails()}
      </Card>
    ) : (
      ""
    );
  emptyUserState = () => (
    <Card title="No User Selected">
      <p>Select a user from the list for more details</p>
    </Card>
  );

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
};

export default connect(
  null,
  mapDispatchToProps
)(Index);
