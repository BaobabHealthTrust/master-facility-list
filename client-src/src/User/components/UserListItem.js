import React from "react";
import { CollectionItem, Row, Col, Button, Icon } from "react-materialize";
import "../../App.css";

const UserListItem = props => (
  <CollectionItem className="mfl-collection-item">
    <Row>
      <Col s={2} style={{ padding: "2%", textAlign: "center" }}>
        <Icon>person</Icon>
      </Col>
      <Col s={5}>
        <h5 style={{ textTransform: "capitalize" }}>{`${props.user.firstname} ${
          props.user.lastname
        }`}</h5>
        <p>System administrator</p>
      </Col>
      <Col s={5} style={{ textAlign: "right" }}>
        <p style={{ color: "blue" }}>{props.user.email}</p>
        <Button onClick={evt => props.onUserSelected(props.user)}>
          View User
        </Button>
      </Col>
    </Row>
  </CollectionItem>
);

export default UserListItem;
