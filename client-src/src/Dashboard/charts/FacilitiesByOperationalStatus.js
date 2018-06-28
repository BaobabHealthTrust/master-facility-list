import React from 'react';
import { MflCardGeneric } from '../../common';
import {
    PieChart,
    Pie,
    Legend,
    Cell
} from 'recharts';

export default class FacilitiesByOperationalStatus extends React.Component{
    render (){
        const data = [
            { name: 'Closed', value: 30 },
            { name: 'Opened', value: 20 }
        ]
        const COLORS = ['#0D47A1', '#87CEEB'];
        const view = (
            <PieChart width={400} height={300} onMouseEnter={this.onPieEnter}>
                <Pie
                    data={data}
                    outerRadius={100}
                    fill="#8884d8">
                    { data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />) }
                </Pie>
                <Legend verticalAlign="bottom" height={40} />
            </PieChart>
        )
        return (
            <MflCardGeneric heading="Facilities by operational status" view={view}/>
        );
    }
}