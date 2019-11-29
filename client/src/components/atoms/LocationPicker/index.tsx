import React, { Component } from "react";
import Map from "./Map";
import { CoordinatesContainer } from "./styles";

type Props = {
  position: { lat: any; lng: any };
  isMarkerShown?: boolean;
  onChange: Function;
};

export class index extends Component<Props> {
  state = {
    position: { lat: 0, lng: 0 }
  };

  componentDidMount() {
    this.setState({ position: this.props.position });
  }

  onClick = (location: any) => {
    const position = { lat: location.latLng.lat(), lng: location.latLng.lng() };
    this.setState({ position });
    this.props.onChange(position);
  };

  render() {
    return (
      <>
        <Map
          position={this.state.position}
          isMarkerShown={this.props.isMarkerShown}
          onLocationClick={this.onClick}
        />
        <CoordinatesContainer>
          {JSON.stringify(this.state.position)}
        </CoordinatesContainer>
      </>
    );
  }
}
export default index;
