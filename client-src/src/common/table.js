import React, { Component } from 'react';
import { Table } from 'react-materialize';

class MflTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const headerRows = this.props.data.headers.map(header => {
            return <th>{header}</th>;
        });

        const headerRecords = this.props.data.records.map(record => {
            return (
                <tr>
                    {record.map(cell => {
                        return <td>{cell}</td>;
                    })}
                </tr>
            );
        });

        return (
            <div>
                <Table
                    striped
                    className="mfl-table z-depth-2 centered responsive-table"
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

export default MflTable;