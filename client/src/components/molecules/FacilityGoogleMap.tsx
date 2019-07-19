import React from "react";
// @ts-ignore
import { compose, withProps, withHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MFLGoogleMapBg = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyB-MrJ0WnBYzAA1A2SwzyCX4UTnDi-fjw8&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: (
      <div
        style={{
          minHeight: `57vh`
        }}
      />
    ),
    containerElement: (
      <div
        test-id="fgooglemap"
        style={{
          height: `57vh`,
          overflow: "hidden"
        }}
      />
    ),
    mapElement: (
      <div
        style={{
          height: `100%`
        }}
      />
    )
  }),
  withScriptjs,
  withGoogleMap
)((props: Props) => {
  const { position, isMarkerShown } = props;
  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: position.lat, lng: position.lng + 0.016 }}
    >
      {isMarkerShown && <Marker position={position} />}
    </GoogleMap>
  );
});

type Props = {
  position: {
    lat: any;
    lng: any;
  };
  isMarkerShown?: boolean;
};
export default MFLGoogleMapBg;
