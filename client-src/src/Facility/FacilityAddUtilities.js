//@flow
import React, { Component } from "react";
import footerResizer from "../helpers/footerResize";
import { Input, Row } from "react-materialize";
import { addFormValues, postFormData } from "../actions";
import FacilityAddFooter from "./FacilityAddFooter";
import { chunk, map } from "lodash";
import { connect } from "react-redux";

type Props = {
    handleNextForTabs: Function,
    handlePreviousForTabs: Function,
    handleCancel: Function,
    addFormValues: Function,
    postFormData: Function,
};

type State = {
    tabPreviousName: string,
    notice: string,
 }

class FacilityAddUtilities extends Component<Props, State> {

    state= {
      tabPreviousName: "Resources",
      notice: ""
    };

    submitCreateUtilityData = async ()=>{
        if(this.props.postResponse.basicResponse !== ""){
        const facilityId = this.props.postResponse.basicResponse.data.id;
        const data =  this.props.formValues.utilities.map(utility=>{
               return Object.assign({},
                {
                facility_id: facilityId,
                utility_id: utility,
                 })
                });
               const token = sessionStorage.getItem("token");
               const resource = "/FacilityUtilities";
               const method = "post";
               const actionName = "POST_FORM_FACILITY_UTILITY_DATA";
               await this.props.postFormData(
                   data,
                   resource,
                   method,
                   actionName,
                   token
               );
               if (this.props.postResponse.facilityUtilityResponse.status === 200) {
                   this.props.handleNextForTabs("Services");
               }
           }else{
            const msg = "Please you have not saved data from previous tab";
               this.setState({notice: msg});
           }
    }

    async addUtilities(e) {
       if(!this.props.formValues.utilities.includes(e.target.id)){
        await this.props.addFormValues(
            e.target.id,
            "ADD_UTILITY"
        );
    }else{
        await this.props.addFormValues(
            e.target.id,
            "REMOVE_UTILITY"
        );
    }
    }

    componentWillMount() {
       let utilityData = [];
       this.props.isEditUtilities && (
            utilityData = map(this.props.currentUtilities,"utility_id"),
            utilityData.map(utilityId=>this.props.addFormValues(utilityId.toString(),"ADD_UTILITY")));
    }

    componentDidMount() {
        footerResizer();
    }
    render() {
        let oldUtilities = [];
        this.props.isEditUtilities && (
           oldUtilities = map(this.props.currentUtilities,"utility_id")
           );
        const utilityTypes = chunk(this.props.utilityTypes,2);
        return (
            <div>
                <div class="row">
                <form
                        className="col s12"
                    >
                    <span className="red-text">
                    {this.state.notice}
                     </span>
                     {utilityTypes.map(utilityTypes=> {return(
                         <div className="row">
                        {utilityTypes.map(utilityType => {return(
                            <div class="input-field col s6">
                                <h6>{utilityType.utility_type}</h6>
                                <hr />
                                <div className="row">
                                { this.props.utilities
                                    .filter(
                                        utility=> 
                                        utility.utility_type_id ===
                                        utilityType.id
                                        )
                                        .map(utility=>{
                                        return (<div className="col s6">
                                            
                                            <Input
                                                type="checkbox"
                                                checked={oldUtilities.includes(utility.id)}
                                                id={utility.id}
                                                name={utility.utility_name}
                                                label={utility.utility_name}
                                                onClick={e=> this.addUtilities(e)}   
                                            />
                                           
                                    </div> )
                                   })
                                }
                                    </div>
                                    </div>
                            )})}

                            
                        </div>
                        )})}
                        
                        <FacilityAddFooter
                            isEditFacility={this.props.isEditUtilities}
                            tabPreviousName={this.state.tabPreviousName}
                            submitFormData={this.props.isEditUtilities? this.props.submitUtilityData: this.submitCreateUtilityData}
                            handlePreviousForTabs={(tabName)=>this.props.handlePreviousForTabs(tabName)}
                            handleNextForTabs={this.props.handleNextForTabs}
                            handleCancel={this.props.handleCancel}
                        />
                     </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return {
        formValues: state.formValues,
        utilityTypes: state.dependancies.utilityTypes,
        utilities: state.facilities.utilities,
        currentUtilities: state.facilities.currentUtilities,
        postResponse: state.postResponse,
    };
};

export default connect(mapStateToProps,{addFormValues, postFormData})(FacilityAddUtilities);
