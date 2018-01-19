import React, { Component } from "react";
import {connect} from "react-redux";

class AdvancedResourceType extends Component {
    render() {
        let resourceTypeOptions = <option>Select Resource Type</option>;
        if (this.props.resourceTypes.length > 0) {
            resourceTypeOptions = this.props.resourceTypes.map(rt => (
                <option key={rt.id} value={rt.id}>{rt.resource_type}</option>
            ));
        }

        let resourceTypeInstanceOptions = <option>Select Instance Type</option>;
        if (this.props.typeInstances.length > 0) {
            resourceTypeInstanceOptions = this.props.typeInstances.map(ti => (
                <option key={ti.id} value={ti.id}>{ti.resource_name}</option>
            ));
        }

        return (
            <div className="container mfl-tm-5">
            <div className="row">
             <div className ="col l6 m12 s12">
                <select
                    className="browser-default"
                    onChange={e =>
                        this.props.handleChange(e)
                    }
                >
                    <option value="0">-- Select Resource Type --</option>
                    {resourceTypeOptions}
                </select>
                </div>
                
                <div className ="col l6 m12 s12">

                {this.props.typeInstances.length>0?(
                <select
                    className="browser-default"
                    onChange={e =>
                        this.props.handleChangeAddSearchValue(e, "ADD_RESOURCE_TYPE_INSTANCE")
                    }
                >
                    <option value="0">-- Select Instance Type --</option>
                    {resourceTypeInstanceOptions}
                </select>):""
            }
            </div>
            <div className="chip">
                <i
                    // onClick={id =>
                    //     this.props.removeSearchValues(
                    //         this.props.id,
                    //         this.props.actionType
                    //     )
                    // }
                    className="mfl-close material-icons"
                >
                    add
                </i>
            </div>
            </div>
            </div>
        );
    }
}
const mapStateToprops = state => {
    return{
     typeInstances: state.facilities.typeInstances
    }
};

export default connect(mapStateToprops,{}) (AdvancedResourceType);
