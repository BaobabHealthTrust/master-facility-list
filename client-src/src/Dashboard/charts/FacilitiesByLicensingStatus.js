import React from 'react';
import { MflCardGeneric } from '../../common';
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

        const view = (
            <BarChart width={400} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#0D47A1"/>
            </BarChart>
        )
        return (
            <MflCardGeneric heading="facilities by licensing status" view={view}/>
        );
    }
}
export default FacilitiesByLicensingStatus;