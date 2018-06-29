import React from 'react';
import { MflCardGeneric } from '../../common';
import { connect } from 'react-redux';
import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar
} from 'recharts';
import { regulatoryStatuses } from '../../actions';

class FacilitiesByLicensingStatus extends React.Component{
    componentDidMount() {
        this.props.regulatoryStatuses()
    }
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
const mapStateToProps = state => {
    return {
        data: state.facilities.facilitiesByRegulatoryStatus
    }
}
const mapDispatchToProps = {
    regulatoryStatuses
}
export default connect(mapStateToProps, mapDispatchToProps)(FacilitiesByLicensingStatus);