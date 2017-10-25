import React from "react";
import logo from "./logo.png";

const Navbar = function() {
	return (
		<nav>
			<div className="nav-wrapper grey darken-3">
				<div className="left">
					<img src={logo} alt="logo" height="100" />
				</div>

				<div className="left">Master Health Facility Register</div>
				<div className="left">
					<div class="input-field searchbar">
						<input id="search" type="search" required />
						<label class="label-icon" for="search">
							<i class="material-icons">search</i>
						</label>
						<i class="material-icons">close</i>
					</div>
				</div>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li>
						<a href="sass.html">Sass</a>
					</li>
					<li>
						<a href="badges.html">Components</a>
					</li>
					<li>
						<a href="collapsible.html">JavaScript</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};
export default Navbar;
