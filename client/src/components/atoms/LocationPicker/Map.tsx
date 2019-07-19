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
  withHandlers(() => {
    const refs = {
      map: undefined
    };

    return {
      onMapMounted: () => (ref: any) => {
        refs.map = ref;
      },
      onClick: ({ onClick }: any) => () => {
        //   @ts-ignore
        onClick(refs.map.getProjection());
      }
    };
  }),
  withScriptjs,
  withGoogleMap
)((props: Props) => {
  const { position, isMarkerShown, onLocationClick } = props;
  return (
    <GoogleMap
      onClick={pro => onLocationClick(pro)}
      defaultZoom={6.5}
      defaultCenter={{ lat: position.lat, lng: position.lng }}
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
  onLocationClick: Function;
};
export default MFLGoogleMapBg;
