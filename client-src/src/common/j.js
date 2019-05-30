import React, { Component } from "react";
import { Slider, Handles, Tracks, Rail } from "react-compound-slider";
import styled from "styled-components";

const sliderStyle = {
  position: "relative",
  width: "100%",
  height: 80,
  border: "1px solid steelblue"
};

const railStyle = {
  position: "absolute",
  width: "100%",
  height: 10,
  marginTop: 35,
  borderRadius: 5,
  backgroundColor: "#8B9CB6"
};

export class SliderInput extends Component {
  initialValues = [0, 300];

  state = {
    domain: [0, 300],
    values: [...this.initialValues],
    update: [...this.initialValues]
  };

  onUpdate = update => {
    this.setState({ update });
  };

  onChange = values => {
    this.setState({ values });
  };

  render() {
    const { domain, values, update } = this.state;
    return (
      <Slider
        rootStyle={sliderStyle}
        mode={2}
        step={1}
        domain={domain}
        onUpdate={this.onUpdate}
        onChange={this.onChange}
        values={values}
      >
        <div style={railStyle} />
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map(handle => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              ))}
            </div>
          )}
        </Tracks>
      </Slider>
    );
  }
}

export default SliderInput;

function Handle({ handle: { id, value, percent }, getHandleProps }) {
  return (
    <div
      style={{
        left: `${percent}%`,
        position: "absolute",
        marginLeft: -15,
        marginTop: 25,
        zIndex: 2,
        width: 30,
        height: 30,
        border: 0,
        textAlign: "center",
        cursor: "pointer",
        borderRadius: "50%",
        backgroundColor: "#2C4870",
        color: "#333"
      }}
      {...getHandleProps(id)}
    >
      <div style={{ fontFamily: "Roboto", fontSize: 11, marginTop: -35 }}>
        {value}
      </div>
    </div>
  );
}
function Track({ source, target, getTrackProps }) {
  // your own track component
  return (
    <div
      style={{
        position: "absolute",
        height: 10,
        zIndex: 1,
        marginTop: 35,
        backgroundColor: "#546C91",
        borderRadius: 5,
        cursor: "pointer",
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`
      }}
      {...getTrackProps()} // this will set up events if you want it to be clickeable (optional)
    />
  );
}
