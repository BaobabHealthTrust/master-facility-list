import React, { Component } from "react";
import Facilitydetails from "./FacilityDetails";
import Card from "../common/MflCard";

class FacilityLocation extends Component {
	render() {
		const locationData = [
			["catchment area", "urban"],
			["population", "-5,096,555"],
			["District", "lilongwe"],
			["zone", "central"]
		];
		const weatherData = [["sunny", ""], ["max temp", ""], ["min temo", ""]];

		return (
			<div className="container">
				<div className="row">
					<div className="col m6" />
					<div className="col m6 z-depth">
						<div className="row z-depth-2">
							<Card heading="location" data={locationData} />
						</div>
						<div className="row z-depth-2">
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
