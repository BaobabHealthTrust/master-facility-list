import React from "react";
import { Button } from "react-materialize";

export default ({ handleBack }) => {
  return (
    <div className="w-full flex justify-center mt-8 mb-8">
      <div className="w-1/2 p-8 mt-8 flex flex-col">
        <img
          src="/static/completed.svg"
          style={{ width: "300px", margin: "auto" }}
        />
        <h6 className="text-center">
          Congratulations, you have successfully added a new Facility!
        </h6>
        <Button onClick={() => handleBack()} className="mt-4">
          View Facilities
        </Button>
      </div>
    </div>
  );
};
