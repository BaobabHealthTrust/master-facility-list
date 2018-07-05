import React from 'react';
import { MflCardGeneric } from '../../common';
import { connect } from 'react-redux';
import randomcolor from 'randomcolor';
import {
    PieChart,
    Pie,
    Legend,
    Cell
} from 'recharts';
import { operationalStatuses } from '../../actions';

class FacilitiesByOperationalStatus extends React.Component{
    componentDidMount() {
        this.props.operationalStatuses()
    }

    render (){
        const data = this.props.data;
        const view = (
            <PieChart width={400} height={300} onMouseEnter={this.onPieEnter}>
                <Pie
                    data={data}
                    outerRadius={100}
                    fill="#8884d8">
                    { data.map((entry, index) => <Cell fill={randomcolor()} />) }
                </Pie>
                <Legend verticalAlign="bottom" height={40} />
            </PieChart>
        )
        return (
            <MflCardGeneric heading="Facilities by operational status" view={view}/>
        );
    }
}
const mapStateToProps = state => {
    return {
        data: state.facilities.facilitiesByOperationalStatus
    }
}
const mapDispatchToProps = {
    operationalStatuses
}
export default connect(mapStateToProps, mapDispatchToProps)(FacilitiesByOperationalStatus);