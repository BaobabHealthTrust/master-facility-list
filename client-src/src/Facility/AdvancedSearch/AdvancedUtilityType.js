import React, { Component } from "react";
import { connect } from "react-redux";

class AdvancedUtilityType extends Component {

  renderChildUtilities = (utilityTypeInstanceOptions, handleAddSearchValue) => (
    <select
      className="browser-default"
      onChange={e => handleAddSearchValue(e, "ADD_UTILITY_TYPE_INSTANCE")}
    >
      <option value="0">-- Select Instance Type --</option>
      {utilityTypeInstanceOptions}
    </ select>
  )

  render() {
    const { typeUtilityInstances, utilityTypes, handleChange, handleChangeAddSearchValue } = this.props

    const utilityTypeId = (typeUtilityInstances.length && typeUtilityInstances[0].utility_type_id) || 0;

    let utilityTypeOptions = <option>Select Utility Type</option>

    if (utilityTypes.length) {
      utilityTypeOptions = utilityTypes.map(ut => (
        <option selected={ut.id === utilityTypeId ? true : false} key={ut.id} value={ut.id}>
          {ut.utility_type}
        </option>
      ));
    }

    let utilityTypeInstanceOptions = <option>Select Instance Type</option>

    if (utilityTypes.length) {
      utilityTypeInstanceOptions = typeUtilityInstances.map(tui => (
        <option key={tui.id} value={tui.id}>{tui.utility_name}</option>
      ));
    }

    return (
      <div className="container mfl-tm-5">
        <select
          className="browser-default"
          onChange={e => handleChange(e)}
        >
          <option value="0">-- Select Utility Type --</option>
          {utilityTypeOptions}
        </select>
        <br />
        {
          typeUtilityInstances.length > 0
          && this.renderChildUtilities(utilityTypeInstanceOptions, handleChangeAddSearchValue)
        }
      </div>
    )
  }
}
const mapStateToprops = state => {
  return {
    typeUtilityInstances: state.facilities.typeUtilityInstances,
  }
};

export default connect(mapStateToprops, {})(AdvancedUtilityType);
