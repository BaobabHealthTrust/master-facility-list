import React from "react";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { MuiRail, MuiHandle, MuiTrack, MuiTick } from "./components";

export default class SliderInput extends React.Component {
  initialValues = [0, 1000];

  state = {
    domain: [...this.initialValues],
    values: [...this.initialValues],
    update: [...this.initialValues]
  };

  componentDidMount() {
    const { min, max } = this.props.field;
    const values =
      this.props.field.values.length > 0 ? this.props.field.values : [min, max];
    this.setState({
      values: values,
      domain: [min, max],
      update: [min, max]
    });
  }

  onUpdate = update => {
    this.setState({ update });
    if (this.props.onUpdate) {
      this.props.onUpdate(update);
    }
  };

  onChange = values => {
    this.setState({ values });
    if (this.props.onChange) {
      this.props.onChange(this.props.field.name, values);
    }
  };

  render() {
    const { domain, values } = this.state;
    const { name } = this.props.field;
    return (
      <div style={{ margin: "10px 0", height: 60, width: "100%" }}>
        <div style={{ margin: "10px 0" }}>{name}</div>
        <Slider
          mode={2}
          step={1}
          domain={domain}
          rootStyle={{
            position: "relative",
            width: "100%"
          }}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          values={values}
        >
          <Rail>
            {({ getRailProps }) => <MuiRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <MuiHandle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <MuiTrack
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={5}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <MuiTick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
    );
  }
}
