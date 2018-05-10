import React, { Component } from "react";
import {
    fetchCurrentDetails,
    fetchCurrentServices,
    setCurrentDetails
} from "../actions";
import Container from "./ServicesContainer";
import { connect } from "react-redux";

class FacilityServices extends Component {
    async componentDidMount() {
        const id = this.props.match.params.id;
        await this.props.fetchCurrentDetails(id);
        await this.props.fetchCurrentServices(id);
    }

    render() {
        const clinicalServices = this.props.services.filter(service => {
            return (
                service.service.serviceType.service_type.toUpperCase() ===
                "CLINICAL SERVICES"
            );
        });

        return (
            <div className="container mfl-container">
                <div className="nav-content">
                    <ul className="tabs blue accent-1 mfl-tabs">
                        <li className="tab">
                            <a href="#clinical">Clinical</a>
                        </li>
                        <li className="tab">
                            <a href="#test2">Community Health</a>
                        </li>
                        <li className="tab">
                            <a href="#test3">Reproductive</a>
                        </li>
                        <li className="tab">
                            <a href="#test4">Other Services</a>
                        </li>
                    </ul>
                </div>

                <br />

                <div id="clinical" class="col s12">
                    <Container services={clinicalServices} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        facilities: store.facilities.list,
        services: store.facilities.currentServices
    };
};

export default connect(mapStateToProps, {
    setCurrentDetails,
    fetchCurrentDetails,
    fetchCurrentServices
})(FacilityServices);
