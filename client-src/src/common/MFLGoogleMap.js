import React from "react";
import { compose, withProps } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";

const MFLGoogleMap = compose(
    withProps({
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyB-MrJ0WnBYzAA1A2SwzyCX4UTnDi-fjw8&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `720px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -13.9626121, lng: 33.7741195 }}
    >
        {props.isMarkerShown && (
            <Marker position={{ lat: -13.9626121, lng: 33.7741195 }} />
        )}
    </GoogleMap>
));

export default MFLGoogleMap;
