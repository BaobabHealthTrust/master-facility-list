import React from "react";
import { connect } from "react-redux";
import { Card } from "react-materialize";
import { fetchUsers } from "../../actions/index";
import { MflGrid, Loader } from "../../common/index";

import "../../App.css";

import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
  Toolbar,
  SearchPanel
} from "@devexpress/dx-react-grid-material-ui";
import {
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
  FilteringState,
  IntegratedFiltering,
  SearchState
} from "@devexpress/dx-react-grid";

class UsersList extends React.Component {
  state = {
    loading: true,
    results: 0
  };

  componentDidMount() {
    this.props.fetchUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading)
      this.setState({
        loading: false
      });
  }

  columns = [
    { name: "username", title: "Username" },
    { name: "firstname", title: "Firstname" },
    { name: "lastname", title: "Lastname" },
    { name: "email", title: "Email" }
  ];

  defaultSorting = [{ columnName: "firstname", direction: "asc" }];

  render() {
    const { users, onUserSelected, isLoading } = this.props;
    return (
      <Card className="user-list">
        {isLoading && this.state.isLoading ? (
          <Loader />
        ) : (
          <MflGrid
            rows={users}
            columns={this.columns}
            pageSize={10}
            defaultSorting={this.defaultSorting}
            rowSelected={user => onUserSelected(user)}
          />
        )}
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    isLoading: state.users.isLoading
  };
};

const mapDispatchToProps = { fetchUsers };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
