import React, { Component } from 'react';
import Table from '../common/Table';
import { connect } from 'react-redux';
import getFacilities from '../actions/get-facilities';
import { truncate } from 'lodash';
import moment from 'moment';

class FacilityList extends Component {
    componentDidMount() {
        this.props.getFacilities();
    }

    render() {
        const data = {
            headers: [
                'CODE',
                'NAME',
                'COMMON NAME',
                'OWNERSHIP',
                'TYPE',
                'STATUS',
                'DISTRICT',
                'DATE OPENED'
            ],
            records: []
        };

        this.props.facilities.forEach(facility => {
            data.records.push([
                '002',
                facility.facility_name.toUpperCase(),
                'Common Name'.toUpperCase(),
                facility.owner.facility_owner.toUpperCase(),
                facility.facilityType.facility_type.toUpperCase(),
                truncate(
                    facility.operationalStatus.facility_operational_status.toUpperCase(),
                    { length: 12 }
                ),
                facility.locations.district.district_name.toUpperCase(),
                moment(facility.facility_date_opened).format('MMM Do YY')
            ]);
        });

        return (
            <div className="container mfl-container">
                <br />
                {this.props.facilities.data}
                <Table data={data} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { facilities: state.facilities };
};

export default connect(mapStateToProps, { getFacilities })(FacilityList);
