import React from 'react';
import { Button, Row, Col } from 'react-materialize';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../App.css';

class UsersPaginator extends React.Component{
    propTypes = {
        onNext: PropTypes.func,
        onPrevious: PropTypes.func
    }  
    render() {
        return (
            <React.Fragment>
                <Row className="mfl-max-width" style={{textAlign: 'left'}}>
                    <Col s={8}/>
                    <Col s={4}>
                        {
                            this.props.showPrevious
                                ?
                                <Button
                                    waves='light'
                                    className="mfl-rm-2 btn-flat"
                                    onClick={this.props.onPrevious}>
                                    previous
                            </Button>
                                :
                                ''
                        }
                        <Button waves='light' className="btn-flat" onClick={this.props.onNext}>next</Button>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}
export default UsersPaginator;