import React, { Component } from "react";
import Table from "../common/Table";
import { Switch, Route } from "react-router-dom";
import Summary from "./Summary";

class FacilityDetails extends Component {
	render() {
		return (
			<div className="">
				<nav>
					<div class="nav-wrapper grey darken-2 col s12">
						<a href="#!" class="brand-logo center" />
						<ul class="left hide-on-med-and-down">
							<li>
								<a href="#">FACILITY SUMMARY</a>
							</li>
							<li>
								<a href="#">CONTACT & LOCATION</a>
							</li>
							<li>
								<a href="#">FACILITY RESOURCES</a>
							</li>
							<li class="active">
								<a href="collapsible.html">
									FACILITY UTILITIES
								</a>
							</li>
						</ul>
					</div>
				</nav>
				<br />
				<Switch>
					<Route path="/summary" render={()=> <h1>Facility Summary</h1>} />
				</Switch>
			</div>
		);
	}
}

export default FacilityDetails;
