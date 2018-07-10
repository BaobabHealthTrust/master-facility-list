import React from 'react';
import { MflCardGeneric } from '../../common';
import randomcolor from 'randomcolor';

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
        const view = (
            <React.Fragment>
                <BarChart width={1100} height={300} data={this.props.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {this.props.keys.map(key => (
                        <Bar dataKey={key} fill={randomcolor()} />
                    ))}
                </BarChart>
            </React.Fragment>
        )
        return (
            <MflCardGeneric heading="facilities by type and ownership" view={view}/>
        );

    }
}

export default FacilitiesByTypeAndOwnership;