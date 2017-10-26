import React, { Component } from 'react';
import './App.css';
import Table from './common/Table';
import Navbar from './Navbar';

class App extends Component {
    render() {
        const data = {
            headers: [
                'CODE',
                'NAME',
                'COMMON NAME',
                'OWNERSHIP',
                'TYPE',
                'STATUS',
                'DISTRICT',
                'DATE OPENED'
            ],
            records: [
                [
                    '001',
                    'Misuku',
                    'chitipa',
                    'CHAM',
                    'PUBLIC',
                    'OPERATIONAL',
                    'CHITIPA',
                    'MAY 1987'
                ]
            ]
        };
        return (
            <div>
                <Navbar />
                <br />
                <div className="container mfl-container">
                    <Table data={data} />
                </div>
            </div>
        );
    }
}

export default App;
