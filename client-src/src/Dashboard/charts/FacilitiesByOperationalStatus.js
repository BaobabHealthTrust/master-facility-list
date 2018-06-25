import React from 'react';
import {
    PieChart,
    Pie,
    Legend
} from 'recharts';

export default class FacilitiesByOperationalStatus extends React.Component{
    render (){
        const data = [
            { name: 'Closed', value: 30 },
            { name: 'Opened', value: 20 }
        ]
        return (
            <PieChart width={800} height={400}>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#0D47A1" />
                <Legend verticalAlign="bottom" height={40} />
            </PieChart>
        )
    }
}