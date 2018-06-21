//@flow
import React from 'react'

export default ({ message = "Sorry, we cannot connect to the Server. Please check your Network" }) => {
  return (
    <div className='container mt-8'>
      <blockquote>
        <h4>{message} </h4>
      </blockquote>
    </div>
  )
}
