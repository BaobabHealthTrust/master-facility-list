import React, { Component } from "react";

class Summary extends Component {
	render() {
		return (
			<div>
				<div className="row container mfl-container">
					<div className="col s12 m12 z-depth-1">
						<div className="row">
							<div className="col s6 m6">
								<p className="center">
									Facility Name <hr /> BWAILA DISTRICT
									HOSPITAL
								</p>
								<br />
								<p className="center">
									Facility Code <hr />LL001
								</p>
							</div>

							<div className="col s6 m6">
								<p className="center">
									DATE OPENED <hr /> MAY 1987
								</p>

								<br />

								<p className="center">
									Facility Type <hr /> HOSPITAL
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="row container mfl-container">
					<div className="col s4 m4 z-depth-1 ">
						<p className="center">
							CONTACT PERSON <hr /> FULL NAME: JAPHAT GONDWE
						</p>
					</div>

					<div className="col s4 m4 z-depth-1">
						<p className="center">
							ADDRESS <hr /> POSTAL ADDRESS: BOX 2505
						</p>
					</div>

					<div className="col s4 m4 z-depth-1">
						<p className="center">
							OWNERSHIP & REGULATION <hr />OWNER: MALAWI
							GOVERNMENT
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Summary;
