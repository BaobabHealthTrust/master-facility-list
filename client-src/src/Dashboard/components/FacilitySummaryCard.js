import React, { Component } from "react";
import { GenericCard } from "../components";
import styled from "styled-components";

export default class FacilitySummaryCard extends Component {
  render() {
    const { count, title, icon } = this.props;
    return (
      <StyledCard
        className="col s12 l3 col-5"
        onClick={() => this.props.onClick()}
      >
        <GenericCard count={count} title={title} icon={icon} />
      </StyledCard>
    );
  }
}

const StyledCard = styled.div`
  cursor: pointer;
  &:first-child {
    color: #0f52ba !important;
  }
`;
