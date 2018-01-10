import React, { Component } from "react";
import Card from "../common/MflCard";

class ServicesContainer extends Component {
    render() {
        const topLevelServices = this.props.services.filter(service => {
            return service.service.service_category_id === 0;
        });

        return (
            <div className="row">
                {topLevelServices.length > 0 ? (
                    topLevelServices.map(service => {
                        return (
                            <div className="col m4 s12">
                                <Card
                                    heading={service.service.service_name}
                                    data={[]}
                                />
                            </div>
                        );
                    })
                ) : (
                    <h6>There are no Clinical Services for this Facility</h6>
                )}
            </div>
        );
    }
}

export default ServicesContainer;
