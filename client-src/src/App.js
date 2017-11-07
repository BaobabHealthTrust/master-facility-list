import React, { Component } from 'react';
import './App.css';
import Table from './common/Table';
import Navbar from './Navbar';
import FacilityList from './Facility/FacilityList';
import { Route, Switch } from 'react-router-dom';
import FacilityDetails from './Facility/FacilityDetails';

class App extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Switch>
                    <Route exact path="/facilities" component={FacilityList} />
                    <Route path="/facilities/:id" component={FacilityDetails} />
                    <Route
                        exact
                        path="/"
                        render={() => <h1>This is homepage</h1>}
                    />
                </Switch>
            </div>
        );
    }
}

export default App;
