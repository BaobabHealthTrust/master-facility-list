import React, { Component } from "react";
import DistrictTags from "../Facility/AdvancedSearch/DistrictTags";
import FacilityTypeTags from "../Facility/AdvancedSearch/FacilityTypeTags";
import FacilityOwnerTags from "../Facility/AdvancedSearch/FacilityOwnerTags";
import OperationalStatusTags from "../Facility/AdvancedSearch/OperationalStatusTags";


class FilterTags extends Component {

    getObjectFromIds(ids, entities) {
        return entities.filter(e => ids.includes(e.id.toString()));
    }


    render() {
        return (
            <div class="modal-footer">
                <div className="advanced-search-tag-container">
                    {/* DISPLAY TAGS FOR DISTRICT VALUES */}
                    <DistrictTags
                        getObjectFromIds={(ids, entities) =>
                            this.getObjectFromIds(ids, entities)
                        }
                        manageCheckbox={(id) => this.props.manageCheckbox(id)}
                    />
                    {/* DISPLAY TAGS FOR OPERATIOANAL STATUS VALUES */}
                    <OperationalStatusTags
                        getObjectFromIds={(ids, entities) =>
                            this.getObjectFromIds(ids, entities)
                        }
                    />
                    {/* DISPLAY TAGS FOR FACILITY TYPE VALUES */}
                    <FacilityTypeTags
                        getObjectFromIds={(ids, entities) =>
                            this.getObjectFromIds(ids, entities)
                        }
                    />
                    {/* DISPLAY TAGS FOR FACILITY OWNER VALUES */}
                    <FacilityOwnerTags
                        getObjectFromIds={(ids, entities) =>
                            this.getObjectFromIds(ids, entities)
                        }
                    />
                </div>
            </div>
        );
    }
}


export default FilterTags;
