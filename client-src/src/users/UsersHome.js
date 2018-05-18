import React from 'react';
import footerResizer from "../helpers/footerResize";
import { Row, Col, Button, Icon, Input, Modal, Card} from 'react-materialize';
import{ UsersList, ViewUser } from './index';
import '../App.css';

export default class UsersHome extends React.Component{
    state = {
        user: null
    }

    componentDidMount() {
        footerResizer();
    }

    onUserSelected = user => {
        this.setState({
            user
        });
    }

    render() {
        return (
            <div className="container mfl-container mfl-tm-2">
                <Row>
                    <Col s={12}>
                        <h3>
                            USER MANAGEMENT
                            <Modal
                                header='New user'
                                trigger={<Button waves='light' className="blue mfl-fl-right" style={{ fontSize: '40%' }}>add user</Button>}>
                                <Row>
                                    <Input placeholder="Placeholder" s={6} label="First Name" />
                                    <Input s={6} label="Last Name" />
                                    <Input s={12} label="disabled" defaultValue="I am not editable" disabled />
                                    <Input type="password" label="password" s={12} />
                                    <Input type="email" label="Email" s={12} />
                                </Row>
                            </Modal>
                        </h3>
                        <Row>
                            <Col s={12}>
                                <Input placeholder="search users here" s={12} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col s={7}>
                        <UsersList onUserSelected={this.onUserSelected} />
                    </Col>
                    <Col s={5}>
                        <ViewUser user={this.state.user} />
                    </Col>
                </Row>
            </div>
        );
    }
}
