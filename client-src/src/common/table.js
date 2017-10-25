import React, { Component } from "react";
import { Table } from "react-materialize";

class MflTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const headerRows = this.props.data.headers.map(function(header) {
      return <th>{header}</th>;
    });

    const headerRecords = this.props.data.records.map(function(record) {
      return (
        <tr>
          {record.map(function(cell) {
            return <td>{cell}</td>;
          })}
        </tr>
      );
    });
    return (
      <div>
        <div className="container mfl-container">
          <Table striped className="mfl-table z-depth-2 centered">
            <thead className="grey darken-1 white-text">
              <tr>{headerRows}</tr>
            </thead>

            <tbody>{headerRecords}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default MflTable;
