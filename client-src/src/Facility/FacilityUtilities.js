import React, { Component } from "react";
import Card from "../common/MflCard";
import { fetchCurrentDetails, fetchCurrentUtilities, fetchUtilityTypes, setCurrentDetails,addFormValues, postFormData, editFacilityDependancies } from "../actions";
import { connect } from "react-redux";
import FacilityAddUtilities from "./FacilityAddUtilities";
import { uniq, chunk, map, pull } from "lodash";

class FacilityUtilities extends Component {

    state = {
        isEditUtilities: false
    };

    submitEditUtilityData = async () => {
        const facilityId = this.props.match.params.id;
        const token = sessionStorage.getItem("token");
        const resourceName = "FacilityUtilities/";
        const actionType = "EDIT_FACILITY_UTILITY_DATA";
        const oldUtilityData = map(this.props.utilities,"id");
        await oldUtilityData.map(id=> {
          this.props.editFacilityDependancies(id, resourceName, actionType);
        });

        const newUtilityData =  this.props.formValues.utilities.map(utility=>{
               return Object.assign({},
                {
                facility_id: facilityId,
                utility_id: utility,
                 })
        });

        const resource = "/FacilityUtilities";
        const method = "post";
          const actionName = "POST_FORM_FACILITY_UTILITY_DATA";
          await this.props.postFormData(
                   newUtilityData,
                   resource,
                   method,
                   actionName,
                   token
               );
          if (this.props.postResponse.facilityUtilityResponse.status === 200) {
                   await this.props.fetchCurrentUtilities(facilityId);   
                   this.setState({isEditUtilities: false});
                   await this.props.addFormValues("","REMOVE_ALL_FORM_VALUES");
            } 

    }

    toggleEditUtilities = ()=>{
       this.setState({isEditUtilities: true});
    }

    handleCancel= ()=>{
         this.props.addFormValues("","REMOVE_ALL_FORM_VALUES");
         this.setState({isEditUtilities: false});
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        await this.props.fetchCurrentDetails(id);
        await this.props.fetchUtilityTypes();
        await this.props.fetchCurrentUtilities(id);
    }

    getResourceTypeIcon(utilityType) {
        switch (utilityType.toUpperCase()) {
            case "ENERGY PROVIDER":
                return "lightbulb_outline";
            case "WATER PROVIDER":
                return "opacity";
            case "WASTE DISPOSAL":
                return "wc";
            case "NETWORK PROVIDER":
                return "wifi";
            default:
                return "local_hospital";
        }
    }

    render() {
        const presentTypes = this.props.utilityTypes.filter(util =>
            uniq(
                this.props.utilities.map(util => util.utility.utility_type_id)
            ).includes(util.id)
        );

        const cards = chunk(presentTypes, 3);

        return (
            <div className="container mfl-container">
                {sessionStorage.getItem("token") && (
                     !this.state.isEditUtilities?( <a
                         class="waves-effect waves-light green btn mfl-tab-btn-space-previous"
                         onClick ={this.toggleEditUtilities}
                            >
                         <i class="material-icons left">edit</i> Edit
                      </a>):(
                        ""
                      )
                        )}
                {!this.state.isEditUtilities?(
                <div>
                {cards.map(card => {
                    return (
                        <div className="row">
                            {card.map(type => {
                                const data = this.props.utilities
                                    .filter(
                                    util =>
                                        util.utility.utility_type_id ===
                                        type.id
                                    )
                                    .map(util => [util.utility.utility_name]);
                                return (
                                    <div className="col m4 s12">
                                        <Card
                                            heading={type.utility_type}
                                            data={data}
                                            icon={this.getResourceTypeIcon(
                                                type.utility_type
                                            )}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
                </div>):(<FacilityAddUtilities
                          submitUtilityData={this.submitEditUtilityData}
                          isEditUtilities={this.state.isEditUtilities}
                          currentUtilities={this.props.utilities}
                          handleCancel={this.handleCancel}
                        />)}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        utilities: state.facilities.currentUtilities,
        facilities: state.facilities.list,
        isLoading: state.facilities.isLoading,
        utilityTypes: state.dependancies.utilityTypes,
        postResponse: state.postResponse,
        formValues: state.formValues,
    };
};

export default connect(mapStateToProps, {
    fetchCurrentUtilities,
    fetchCurrentDetails,
    setCurrentDetails,
    fetchUtilityTypes,
    addFormValues,
    postFormData,
    editFacilityDependancies
})(FacilityUtilities);
