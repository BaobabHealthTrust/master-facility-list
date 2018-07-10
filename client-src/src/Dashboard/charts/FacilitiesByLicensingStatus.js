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

import { MflCardGeneric } from '../../common';

class FacilitiesByLicensingStatus extends React.Component{
    render() {
        const data = [];
        const view = (
            <BarChart width={400} height={300} data={this.props.data}>
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