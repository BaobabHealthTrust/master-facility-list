import React, { Component } from "react";
import Facilitydetails from "./FacilityDetails";
import Card from "../common/MflCard";
import MyMapComponent from "./MyMapComponent";


class FacilityLocation extends Component {
	
	render() {
		const locationData = [];
		const weatherData = [];

		
		this.props.facilityDetails.forEach(facility => {
			locationData.push(
				["catchment area", facility.locations.catchment_area],
				["population",facility.locations.catchment_population],
				["district",facility.contactPeople.contact_person_phone],
				["zone",facility.contactPeople.contact_person_phone]
			);

			 weatherData.push(
				["sunny", facility.addresses.postal_address],
				["max temp", ],
				["min temp",]
			 );
			
});




		return (
			<div className="container">
				<div className="row">
					<div className="col m6">
						<MyMapComponent
							isMarkerShown
							googleMapURL="https://maps.googleapis.com/maps/api/js?key= AIzaSyB-MrJ0WnBYzAA1A2SwzyCX4UTnDi-fjw8
&v=3.exp&libraries=geometry,drawing,places"
							loadingElement={<div style={{ height: `100%` }} />}
							containerElement={
								<div style={{ height: `400px` }} />
							}
							mapElement={<div style={{ height: `100%` }} />}
						/>
					</div>

					<div className="col m6">
						<div className="row">
							<Card heading="location" data={locationData}  />
							
						</div>
						<div className="row">
							<Card
								heading="todays weather details"
								data={weatherData}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default FacilityLocation;