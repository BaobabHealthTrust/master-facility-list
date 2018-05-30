import React from 'react';
import footerResizer from "../helpers/footerResize";
import { Row, Col, Button, Icon, Input, Modal, Card} from 'react-materialize';
import{ UserList, ViewUser, UserForm } from './index';
import '../App.css';

export default class UsersHome extends React.Component{
    state = {
        user: null,
        delay: 3000
    }

    componentWillMount(){
        if(!sessionStorage.getItem('token')){
            this.props.history.replace('/');
        }
    }
    
    componentDidMount() {
        footerResizer();
    }

    onUserSelected = user => {
        console.log('Called with user ', user);
        this.setState({
            user
        });
    }

    showToastMessage = message => {
        window.Materialize.toast(message, this.state.delay);
    }

    onUserCreationSuccess = () => {
        this.showToastMessage('User created successfully');
        setTimeout(() => {
            window.location.reload(); 
        }, this.state.delay);
    }

    onUserCreationError = () => {
        this.showToastMessage('Failed to create user, try again');
    }

    render() {
        return (
            <div className="container mfl-container mfl-tm-2">
                <Row>
                    <Col s={12}>
                        <h4>
                            <Icon>people</Icon> USER MANAGEMENT
                            <UserForm 
                                onUserCreationSuccess={this.onUserCreationSuccess} 
                                onUserCreationError={this.onUserCreationError}
                            />
                        </h4>
                    </Col>
                </Row>
                <Row>
                    <Col s={7}>
                        <UserList onUserSelected={this.onUserSelected} />
                    </Col>
                    <Col s={5}>
                        <ViewUser user={this.state.user} />
                    </Col>
                </Row>
            </div>
        );
    }
}
