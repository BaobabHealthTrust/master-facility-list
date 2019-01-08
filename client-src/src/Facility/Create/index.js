//@flow
import React from "react";
import footerResizer from "../../helpers/footerResize";
import CreateFacilityWizard from "./components/CreateFacilityWizard";
import {FormHeading} from "../../common";

export default ({handleCancelAddFacility}) => {
  return (
    <div className="mt-8 container">
      <FormHeading
        title="Add New Facility"
        entityName=""
        icon="local_hospital"
      />
      <CreateFacilityWizard handleCancelAddFacility={handleCancelAddFacility} />
    </div>
  );
};
