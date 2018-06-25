import React from 'react';

import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar
} from 'recharts';

class FacilitiesByLicensingStatus extends React.Component{
    render() {
        const data = [
            {
                name: 'Registered',
                count: 1,
            },
            {
                name: 'Pending Certification',
                count: 3,
            },
            {
                name: 'Reg Suspended',
                count: 9,
            },
            {
                name: 'Reg Canceled',
                count: 1,
            },
            {
                name: 'NotRegistered',
                count: 6,
            }
        ]
        return (
            <BarChart width={800} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#0D47A1" />
            </BarChart>
        );
    }
}
export default FacilitiesByLicensingStatus;