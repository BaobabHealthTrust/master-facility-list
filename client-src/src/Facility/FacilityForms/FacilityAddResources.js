//@flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { Input } from "react-materialize";
import { addFormValues, postFormData } from "../../actions";

type Props = {
    handleNextForTabs: Function
};

class FacilityAddResources extends Component<Props> {
    async submitFormData(e) {
        await e.preventDefault();

        // const data = {
        //     contact_person_fullname: this.props.contactName,
        //     contact_person_phone: this.props.phoneNumber,
        //     contact_person_email: this.props.contactEmail,
        //     postal_address: this.props.postalAddress,
        //     facility_id: this.props.postResponse.basicResponse.data.id
        // };

        // const token = sessionStorage.getItem("token");
        // await e.preventDefault();
        // const resource = "/ContactPeople";
        // const method = "post";
        // const actionName = "POST_FORM_CONTACT_DATA";
        // await this.props.postFormData(
        //     data,
        //     resource,
        //     method,
        //     actionName,
        //     token
        // );
        // if (this.props.postResponse.contactResponse.status === 200) {
        //     this.props.handleNextForTabs("Resources");
        // }
    }
    async addResources(e) {
        let resources = [];
        await this.props.addFormValues(
            e.target.value,
            "ADD_RESOURCE",
            e.target.name
        );
        resources.push({
            resource_name: this.props.formValues.name,
            quantity: this.props.formValues.quantity
        });
        console.log(resources);
    }

    render() {
        return (
            <div>
                <div class="row">
                    <form
                        onSubmit={e => this.submitFormData(e)}
                        className="col s12"
                    >
                        <div class="row">
                            {this.props.resourceTypes.map(resourceType => {
                                return (
                                    <div class="input-field col s6">
                                        <h6>{`${
                                            resourceType.resource_type
                                            }   Resources`}</h6>
                                        <hr />
                                        <div className="row">
                                            {this.props.resources
                                                .filter(
                                                    res =>
                                                        res.resource_type_id ===
                                                        resourceType.id
                                                )
                                                .map(resource => {
                                                    return (
                                                        <div className="col s6">
                                                            <p className="range-field">
                                                                <input
                                                                    type="range"
                                                                    id={
                                                                        resource.resource_name
                                                                    }
                                                                    name={
                                                                        resource.resource_name
                                                                    }
                                                                    value={
                                                                        this
                                                                            .props
                                                                            .formValues
                                                                            .ambulance
                                                                    }
                                                                    min="0"
                                                                    max="100"
                                                                    onChange={e =>
                                                                        this.addResources(
                                                                            e
                                                                        )
                                                                    }
                                                                />
                                                            </p>
                                                            <p className="mfl-tm-resource">
                                                                {
                                                                    resource.resource_name
                                                                }
                                                            </p>
                                                        </div>
                                                    );
                                                })}

                                            <div className="row" />
                                        </div>
                                        <div />
                                    </div>
                                );
                            })};
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        formValues: state.formValues,
        resourceTypes: state.dependancies.resourceTypes,
        resources: state.facilities.resources
    };
};

export default connect(mapStateToProps, { addFormValues, postFormData })(
    FacilityAddResources
);
