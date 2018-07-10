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
        const view = (
            <PieChart width={400} height={300} onMouseEnter={this.onPieEnter}>
                <Pie
                    data={data}
                    outerRadius={100}
                    fill="#8884d8">
                    { data.map((entry, index) => <Cell fill={'#443235'} />) }
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