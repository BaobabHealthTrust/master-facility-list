import React from 'react';
import { CollectionItem, Row, Col, Button } from 'react-materialize';
import '../App.css';

const User = props => (
    <CollectionItem 
        className="mfl-pointable" 
        onClick={evt => props.onUserSelected(props.user)}
        >
        <Row>
            <Col s={12}>
                <h4>{`${props.user.firstName} ${props.user.lastName}`}</h4>
                <p>System administrator</p>
                <p>
                    {props.user.email}
                    <Button waves='light' className="mfl-fl-right">
                        View User
                    </Button>
                </p>
            </Col>
        </Row>
    </CollectionItem>
);

export default User;