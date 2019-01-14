import React, {Component} from "react";
import {Icon} from "react-materialize";
import styled from "styled-components";

const MFLAlert = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1.2rem;
  font-size: 1.25rem;
  margin: 1rem 0rem;
  background-color: ${props => (props.warning ? "khaki" : "powderblue")};
  color: ${props => (props.warning ? "olive" : "midnightblue")};
  i {
    cursor: pointer;
  }
`;

type Props = {
  message: string,
  warning: boolean,
  danger: boolean
};

type State = {
  isOpen: boolean
};

export default class Alert extends Component<Props, State> {
  state = {
    isOpen: true
  };

  render() {
    return this.state.isOpen ? (
      <MFLAlert warning={this.props.warning}>
        <div>{this.props.message}</div>
        <div onClick={() => this.setState({isOpen: false})}>
          <Icon>close</Icon>
        </div>
      </MFLAlert>
    ) : (
      <div />
    );
  }
}
