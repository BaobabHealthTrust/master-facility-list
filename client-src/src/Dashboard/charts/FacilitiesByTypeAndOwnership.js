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

        const view = (
            <BarChart width={800} height={300} data={data} id="bwighane">
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
        )
        return (
            <MflCardGeneric heading="facilities by type and ownership" view={view}/>
        );

    }
}

export default FacilitiesByTypeAndOwnership;