//@flow
import React from "react";
import { BasicDetailsForm, ContactsForm, ResourcesForm, UtilitiesForm, ServicesForm } from '../FacilityForms'
import footerResize from '../../helpers/footerResize';

class FacilityTabs extends React.Component<{}> {

    state = {
        active: 'basic'
    }

    componentWillUpdate() {
        footerResize();
    }

    componentDidMount() {
        footerResize();
    }

    render() {
        return (
            <div>
                <div
                    className="mfl-form-wizard"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        fontSize: 20,
                        marginTop: 20
                    }}
                >
                    <div
                        className={this.state.active == 'basic' ? "mfl-active-form-wizard" : ""}
                    >
                        <span>1</span> Basic Details
                    </div>
                    <div
                        className={this.state.active == 'contacts' ? "mfl-active-form-wizard" : ""}
                    >
                        <span>2</span> Contacts and Locations
                    </div>
                    <div
                        className={this.state.active == 'resources' ? "mfl-active-form-wizard" : ""}
                    >
                        <span>3</span> Facility Resources
                    </div>
                    <div><span>4</span> Facility Utilities</div>
                    <div><span>5</span> Facility Services</div>
                </div>
                <div>
                    {this.state.active == 'basic'
                        ? <BasicDetailsForm onNext={() => this.setState({ active: 'contacts' })} />
                        : ""
                    }
                    {this.state.active == 'contacts'
                        ? <ContactsForm onNext={() => this.setState({ active: 'resources' })} />
                        : ''
                    }
                    {this.state.active == 'resources' ? <h5>Facility Resources Form</h5> : ''}
                </div>
            </div >
        );
    }
}

export default FacilityTabs;
