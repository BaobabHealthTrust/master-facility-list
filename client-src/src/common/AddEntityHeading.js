//@flow
import React from 'react'
// TODO: Grab the Facility Name from Redux or something
export default ({ icon, title, entityName }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
      <i className="material-icons mfl-rm-2">{icon}</i>
      <h5 className="mfl-rm-2">{title}</h5>
      {/* <div className="mfl-vertical-ruler mfl-rm-2" /> */}
      <h5><b>{entityName}</b></h5>
    </div>
  )
}
