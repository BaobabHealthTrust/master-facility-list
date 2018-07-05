import React from 'react';
import { MflCardGeneric } from '../../common';
import { facilityTypeAndOwnership } from '../../actions'
import { connect } from 'react-redux';
import { MflBar } from './index'
import _ from 'lodash'
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
    componentDidMount() {
        this.props.facilityTypeAndOwnership()
    }
    render() {
        const view = (
            <React.Fragment>
                <BarChart width={1100} height={300} data={this.props.facilitiesByTypeAndOwnership}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {this.props.facilitiesByTypeAndOwnershipKeys.map(key => (
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
const mapStateToProps = state => {
    return {
        facilitiesByTypeAndOwnership: state.facilities.facilitiesByTypeAndOwnership,
        facilitiesByTypeAndOwnershipKeys: state.facilities.facilitiesByTypeAndOwnershipKeys
    }
}

const mapDispatchToProps = {
    facilityTypeAndOwnership
}
export default connect(mapStateToProps, mapDispatchToProps)(FacilitiesByTypeAndOwnership);