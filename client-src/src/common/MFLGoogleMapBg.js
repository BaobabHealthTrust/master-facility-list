import React from "react";
import { compose, withProps, withHandlers } from "recompose";
import Loader from "./Loader";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import Loading from "./LoadingMap";

const MFLGoogleMapBg = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyB-MrJ0WnBYzAA1A2SwzyCX4UTnDi-fjw8&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <Loading style={{ height: "610px" }} />,
    containerElement: (
      <div
        test-id="fgooglemap"
        style={{
          height: `610px`
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
  withHandlers(() => {
    const refs = {
      map: undefined
    };

    return {
      onMapMounted: () => ref => {
        refs.map = ref;
      },
      onClick: ({ onClick }) => () => {
        onClick(refs.map.getProjection());
      }
    };
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const { position, isMarkerShown } = props;
  return (
    <GoogleMap
      //onClick={pro => alert(JSON.stringify(pro))}
      defaultZoom={15}
      defaultCenter={{ lat: position.lat, lng: position.lng + 0.016 }}
    >
      {isMarkerShown && <Marker position={position} />}
    </GoogleMap>
  );
});

export default MFLGoogleMapBg;
