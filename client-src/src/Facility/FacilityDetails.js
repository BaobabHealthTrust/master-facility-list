import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Summary from './Summary';

class FacilityDetails extends Component {
    render() {
        return (
            <div className="">
                <nav>
                    <div class="nav-wrapper grey darken-2">
                        <ul class="left hide-on-med-and-down">
                            <li className="active">
                                <Link to="/facilities/1">SUMMARY</Link>
                            </li>
                            <li>
                                <Link to="/facilities/1/locations">
                                    CONTACTS AND LOCATIONS
                                </Link>
                            </li>
                            <li>
                                <Link to="/facilities/1/resources">
                                    RESOURCES
                                </Link>
                            </li>
                            <li>
                                <a href="#">UTILITIES</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br />
                <Switch>
                    <Route
                        exact
                        path={`${this.props.match.url}`}
                        component={Summary}
                    />
                    <Route
                        path={`${this.props.match.url}/locations`}
                        render={() => <h1>Facility Locations</h1>}
                    />
                    <Route
                        path={`${this.props.match.url}/resources`}
                        render={() => <h1>Facility Resources</h1>}
                    />
                </Switch>
            </div>
        );
    }
}

export default FacilityDetails;
