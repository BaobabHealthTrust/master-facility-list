//@flow
import React from 'react'

export default ({ icon, title, entityName }) => {
    return (
        <div className="row">
            <div className="col s4 m2 mfl-add-facility">
                <h5>
                    <i className="material-icons mfl-tm-2">
                        {icon}
                    </i>
                </h5>
            </div>
            <div className="col s4 m2  mfl-facility-name">
                <h5>{title}</h5>
            </div>
            <div className="mfl-vertical-ruler" />
            <div className="col s4 m2">
                <h5>
                    <b>{entityName}</b>
                </h5>
            </div>
        </div>
    )
}
