//@flow
import React from 'react'
import { Input } from 'react-materialize'

export default class DatePicker extends React.Component<{}>{
  state = {
    year: this.props.year || "1975",
    day: this.props.day || "01",
    month: this.props.month || "01"
  }

  handleChange = async (e, property: string) => {
    await this.setState({ [property]: e.target.value })
    await this.props.onChange(`${this.state.year}-${this.state.month}-${this.state.day}`)
  }

  render() {
    const { suffix } = this.props
    return (
      <React.Fragment>
        <Input
          s={2}
          type='select'
          label={`Select Year ${suffix}`}
          onChange={(e) => this.handleChange(e, "year")}
          value={this.state.year}
        >
          {[...Array(45).keys()].map(year => <option>{year + 1975}</option>)}
        </Input>
        <Input
          s={2}
          type='select'
          label={`Select Month ${suffix}`}
          onChange={(e) => this.handleChange(e, "month")}
          value={this.state.month}
        >
          <option value="01">Jan</option>
          <option value="02">Feb</option>
          <option value="03">Mar</option>
          <option value="04">Apr</option>
          <option value="05">May</option>
          <option value="06">Jun</option>
          <option value="07">Jul</option>
          <option value="08">Aug</option>
          <option value="09">Sep</option>
          <option value="10">Oct</option>
          <option value="11">Nov</option>
          <option value="12">Dec</option>
        </Input>
        <Input
          s={2}
          type='select'
          label={`Select Day ${suffix}`}
          onChange={(e) => this.handleChange(e, "day")}
          value={this.state.day}
        >
          {[...Array(31).keys()].map(day => <option>{(day + 1).toString().padStart(2, '0')}</option>)}
        </Input>
      </React.Fragment >
    )
  }
}
