//@flow
import React from 'react'
import { Input } from 'react-materialize'

export default (props) => {
    const { suffix } = props;
    return (
        <React.Fragment>
            <Input s={2} type='select' label={`Select Year ${suffix}`}>
                {[...Array(45).keys()].map(year => <option>{year + 1975}</option>)}
            </Input>
            <Input s={2} type='select' label={`Select Month ${suffix}`}>
                <option>Jan</option>
                <option>Feb</option>
                <option>Mar</option>
                <option>Apr</option>
                <option>May</option>
                <option>Jun</option>
                <option>Jul</option>
                <option>Aug</option>
                <option>Sep</option>
                <option>Oct</option>
                <option>Nov</option>
                <option>Dec</option>
            </Input>
            <Input s={2} type='select' label={`Select Day ${suffix}`} >
                {[...Array(31).keys()].map(day => <option>{(day + 1).toString().padStart(2, '0')}</option>)}
            </Input>
        </React.Fragment >
    )
}
