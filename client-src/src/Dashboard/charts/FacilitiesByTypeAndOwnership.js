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

import { curveCatmullRom } from 'd3-shape';


class FacilitiesByTypeAndOwnership extends React.Component{
    render() {
        const data = [
            {
                name: 'Private',
                clinic: 2,
                dispensary: 1,
                health_center: 2,
                hospital: 1,
                central_hospital: 4
            },
            {
                name: 'Government',
                clinic: 2,
                dispensary: 1,
                health_center: 10,
                hospital: 3,
                central_hospital: 4
            },
            {
                name: 'Parastatal',
                clinic: 2,
                dispensary: 1,
                health_center: 3,
                hospital: 3,
                central_hospital: 9
            },
            {
                name: 'CHAM',
                clinic: 2,
                dispensary: 1,
                health_center: 0,
                hospital: 7,
                central_hospital: 4
            },
            {
                name: 'Non-Governmental',
                clinic: 2,
                dispensary: 1,
                health_center: 2,
                hospital: 1,
                central_hospital: 8
            }
        ]
        return (
            <BarChart width={800} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="clinic" fill="#0D47A1" />
                <Bar dataKey="health_center" fill="#7b82ff" />
                <Bar dataKey="dispensary" fill="#9a2eff" />
                <Bar dataKey="hospital" fill="#ff3300" />
                <Bar dataKey="central_hospital" fill="#ff29f4" />
            </BarChart>
        );

    }
}

export default FacilitiesByTypeAndOwnership;