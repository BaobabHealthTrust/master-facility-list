import React from "react";

export default ({ districts, handleChange, action }) => {
  let options = <option>Select District</option>

  if (districts.length) {
    options = districts
      .map(d => <option key={d.id} value={d.id}>{d.district_name}</option>)
  }

  return (
    <div className="container mfl-tm-5">
      <select
        className="browser-default"
        onChange={e => handleChange(e, action)}
      >
        <option value="0">-- Select District --</option>
        {options}
      </select>
    </div>
  );
}
