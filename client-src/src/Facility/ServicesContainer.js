import React, { Component } from "react";
import { Col, Card } from 'react-materialize';
import { connect } from 'react-redux';

class ServicesContainer extends React.Component<> {

  render() {
    return (
      <Col m={4} s={12}>
        <Card title="hey there">
          <ul>

          </ul>
        </Card>
      </Col>
    )
  }

}

const mapStateToProps = state => {
  return {
    services: state.dependancies.services,
    serviceTypes: state.dependancies.serviceTypes
  }
}

export default connect(mapStateToProps)(ServicesContainer)
