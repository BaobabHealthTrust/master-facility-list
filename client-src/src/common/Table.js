import React, { Component } from 'react';
import { Table } from 'react-materialize';
import { Link, Redirect } from 'react-router-dom';

class MflTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            redirectLink: null
        };
    }

    handleRedirect(id) {
        this.setState(prevState => ({
            redirect: !prevState.redirect,
            redirectLink: `/facilities/${id}`
        }));
    }

    render() {
        const headerRows = this.props.data.headers.map(header => {
            return <th>{header}</th>;
        });

        const headerRecords = this.props.data.records.map(record => {
            const id = record.filter((cell, i) => i == 0);
            {
                if (!this.state.redirect) {
                    return (
                        <tr onClick={this.handleRedirect.bind(this, id)}>
                            {record
                                .filter((cell, index) => index != 0)
                                .map(cell => {
                                    return (
                                        <td>
                                            <span className="truncate">
                                                {cell}
                                            </span>
                                        </td>
                                    );
                                })}
                        </tr>
                    );
                }

                return <Redirect to={this.state.redirectLink} />;
            }
        });

        return (
            <div>
                <Table
                    hoverable
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
