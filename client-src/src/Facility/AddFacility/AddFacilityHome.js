//@flow
import React from "react";
import footerResizer from "../../helpers/footerResize";
import FacilityTabs from "./FacilityTabs";
import { AddEntityHeading } from '../../common'

export default ({ handleCancelAddFacility }) => {
    return (
        <div>
            <AddEntityHeading title="New Facility" entityName="Chibavi" icon="local_hospital" />
            <FacilityTabs
                handleCancelAddFacility={handleCancelAddFacility}
            />
        </div>
    )
}
