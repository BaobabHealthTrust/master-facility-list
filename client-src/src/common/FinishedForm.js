import React from 'react';
import { Button } from 'react-materialize';

export default ({ handleBack }) => {
  return (
    <div className="w-full flex justify-center mt-8">
      <div className="w-1/2 border shadow-md rounded p-8 mt-8 flex flex-col">
        <i className="material-icons text-green text-center" style={{ fontSize: 200 }}>done_outline</i>
        <h6 className="text-center">Congratulations, you have successfully added a new Facility!</h6>
        <Button onClick={() => handleBack()} className="mt-4" >Go Back</Button>
      </div>
    </div>
  )
}
