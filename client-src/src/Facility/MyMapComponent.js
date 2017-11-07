import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Summary from "./Summary";

import {
	AxiosProvider,
	Request,
	Get,
	Delete,
	Head,
	Post,
	Put,
	Patch,
	withAxios
} from "react-axios";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker
} from "react-google-maps";
import { compose, withProps } from "recompose";

class MyMapComponent extends Component {
	render() {
		const MyMapComponent = withScriptjs(
			withGoogleMap(props => (
				<GoogleMap
					defaultZoom={8}
					defaultCenter={{ lat: -13.9626121, lng: 33.7741195 }}
				>
					{props.isMarkerShown && (
						<Marker
							position={{ lat: -13.9626121, lng: 33.7741195 }}
						/>
					)}
				</GoogleMap>
			))
		);
		return (
			<MyMapComponent
				isMarkerShown
				googleMapURL="https://maps.googleapis.com/maps/api/js?key= AIzaSyB-MrJ0WnBYzAA1A2SwzyCX4UTnDi-fjw8
&v=3.exp&libraries=geometry,drawing,places"
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `400px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
		);
	}
}
export default MyMapComponent;
