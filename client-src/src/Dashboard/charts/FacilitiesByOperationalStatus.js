import React from 'react';
import { MflCardGeneric } from '../../common';
import {
    PieChart,
    Pie,
    Legend,
    Cell
} from 'recharts';
import randomcolor from 'randomcolor';

class FacilitiesByOperationalStatus extends React.Component{

    render (){
        const data = this.props.data;

        const COLORS = randomcolor({
          count: data.length,
          hue: '#0D47A1',
          format: 'rgb'
        });

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

export default FacilitiesByOperationalStatus;
