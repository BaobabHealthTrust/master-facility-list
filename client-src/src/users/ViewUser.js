import React from 'react';
import { Card, CardTitle, Table, Button } from 'react-materialize';
import '../App.css';

export default props => {

    const emptyUserState = (
        <Card
            title="No user selected">
            <p>
                Select a user from the list for more details
            </p>
        </Card>
    );

    const userView = props.user ? (
        <Card
            title="User Details"
            actions={[
                <a href='#' className="">Edit User</a>,
                <a href='#' className="">Change Password</a>
            ]}>
            <Table>
                <tbody>
                    <tr>
                        <td>First Name</td>
                        <td>{props.user.firstName}</td>
                    </tr>
                    <tr>
                        <td>Last Name</td>
                        <td>{props.user.lastName}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{props.user.email}</td>
                    </tr>
                    <tr>
                        <td>Role</td>
                        <td>{props.user.role}</td>
                    </tr>
                </tbody>
            </Table>
        </Card>
    ) : '';

    return (
        <React.Fragment>
            {props.user ? userView: emptyUserState}
        </React.Fragment>
    );
}