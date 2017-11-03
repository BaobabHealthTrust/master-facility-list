import React, { Component } from "react";
import Facilitydetails from "./FacilityDetails";

class FacilityLocation extends Component {
	render() {
		return (
			<div className="container">
				<h6 className="mfl-summary-subheader">
					{"Bwaila District Hospital".toUpperCase()}
				</h6>
				<h5 className="mfl-summary-subtext">
					{"ll00001".toUpperCase()}
				</h5>
				<div className="row">
					<div className="col m6">
						<h5>hello</h5>
					</div>
					<div className="col m6 z-depth">
						<div className="row z-depth-2">
							<p className="center mfl-summary-header">
								location
							</p>

							<table>
								<tbody>
									<tr className="mfl-card-row">
										<td className="mfl-summary-subheader">
											catchment area
										</td>
										<td className="right-align mfl-summary-subtext">
											urban
										</td>
									</tr>
									<tr className="mfl-card-row">
										<td className="mfl-summary-subheader">
											population
										</td>
										<td className="right-align mfl-summary-subtext">
											-5,096,555
										</td>
									</tr>

									<tr className="mfl-card-row">
										<td className="mfl-summary-subheader">
											District
										</td>
										<td className="right-align mfl-summary-subtext">
											lilongwe
										</td>
									</tr>

									<tr className="mfl-card-row">
										<td className="mfl-summary-subheader">
											zone
										</td>
										<td className="right-align mfl-summary-subtext">
											central
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className="row z-depth-2">
							<p className="center mfl-summary-header">
								todays weather details
							</p>

							<table>
								<tbody>
									<tr className="mfl-card-row">
										<td className="mfl-summary-subheader">
											sunny
										</td>
										<td className="right-align mfl-summary-subtext">
											japhat gondwe
										</td>
									</tr>
									<tr className="mfl-card-row">
										<td className="mfl-summary-subheader">
											max temp :34 Degrees
										</td>
										<td className="right-align mfl-summary-subtext">
											<i class="material-icons">
												brightness_5
											</i>
										</td>
									</tr>

									<tr className="mfl-card-row">
										<td className="mfl-summary-subheader">
											min temp:18 Degrees
										</td>
										<td className="right-align mfl-summary-subtext">
										<i class="material-icons">
												brightness_5
											</i>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FacilityLocation;
