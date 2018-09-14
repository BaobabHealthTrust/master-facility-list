import React from 'react'
import { MflCardGeneric } from '../common'

export default (props) => {
  const districtTags = (
    <div>
      {
        props.districts.map(district => {
          return <div className="chip">
            {district}
            <i
              onClick={props.closeTag}
              className='mfl-close material-icons'
              id={district}
            >
              close
            </i>
          </div>
        })
      }
    </div>
  )

  const content = (
    <h5>
      Welcome to the <strong> Master Health Facility Register of Malawi</strong>.
      You may Select any of the districts to your left to filter the charts below.
    </h5>
  )

  return <MflCardGeneric
    heading={
      props.districts.length
        ? 'currently showing statistics from : '
        : 'currently showing national statistics'
    }
    view={props.districts.length ? districtTags : content}
  />
}
