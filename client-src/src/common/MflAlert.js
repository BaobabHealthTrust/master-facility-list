//@flow
import React from 'react';
import { CardPanel } from 'react-materialize';

type Props = {
  message: string,
  color: string
}

export default (props) => {
  const {
    message = 'Message is not available for alert component',
    color = 'yellow'
  } = props

  const view = <CardPanel className={`${color} lighten-4 black-text center-align`} >
    <span className='text-2xl'>{message}</span>
  </CardPanel>

  return view
}
