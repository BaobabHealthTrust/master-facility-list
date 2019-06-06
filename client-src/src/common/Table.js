import React, { Component } from "react";
import { Table } from "react-materialize";
import { Redirect } from "react-router-dom";
import { hideSearchContainer } from "../actions";
import { setActivePage } from "../actions/ui";
import { connect } from "react-redux";

class MflTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      redirectLink: null
    };
  }

  handleRedirect = id => {
    this.setState(prevState => ({
      redirect: !prevState.redirect,
      redirectLink: `/facilities/${id}/summary`
    }));
    this.props.setActivePage("facilities");
  };

  render() {
    const headerRows = this.props.data.headers.map(header => {
      return <th>{header}</th>;
    });

    const headerRecords = this.props.data.records.map(record => {
      const id = record.filter((cell, i) => i === 0);
      {
        if (!this.state.redirect) {
          return (
            <tr key={id} onClick={() => this.handleRedirect(id)}>
              {record
                .filter((cell, index) => index !== 0)
                .map((cell, index) => {
                  return (
                    <td key={index}>
                      <span className="truncate">{cell}</span>
                    </td>
                  );
                })}
            </tr>
          );
        }
        this.props.hideSearchContainer(true);
        return <Redirect to={this.state.redirectLink} />;
      }
    });

    return (
      <div className="mfl-bm-2">
        <Table
          hoverable
          className="mfl-table z-depth-2 centered responsive-table striped"
        >
          <thead className="grey">
            <tr>{headerRows}</tr>
          </thead>

          <tbody>{headerRecords}</tbody>
        </Table>
      </div>
    );
  }
}
const mapStateToProps = store => {
  return {};
};
export default connect(
  mapStateToProps,
  { hideSearchContainer, setActivePage }
)(MflTable);
