import React, { Component } from 'react';
import Table from '../common/Table';

class FacilityList extends Component {
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
                'DATE OPENED',
                'ACTIONS'
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
                    'MAY 1987',
                    'VIEW'
                ],
                [
                    '002',
                    'Kamphata',
                    'Lilongwe',
                    'CHAM',
                    'PUBLIC',
                    'OPERATIONAL',
                    'CHITIPA',
                    'MAY 1987',
                    'VIEW'
                ]
            ]
        };
        return (
            <div className="container mfl-container">
                <br />
                <Table data={data} />
            </div>
        );
    }
}

export default FacilityList;
