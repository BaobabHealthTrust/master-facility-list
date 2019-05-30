import React from "react";
import styled from "styled-components";

const Step = styled.li`
  list-style-type: none;
  color: white;
  text-transform: uppercase;
  float: left;
  position: relative;
  flex: 1;
  :before {
    content: counter(step);
    counter-increment: step;
    width: 40px;
    line-height: 40px;
    display: block;
    font-size: 14px;
    color: #333;
    background: white;
    border-radius: 50%;
    margin: 0 auto 10px auto;
    border: 1px solid #0d47a1;
    position: inherit;
    z-index: 2;
  }
  :after {
    content: "";
    width: 100%;
    height: 4px;
    background: #0d47a1;
    position: absolute;
    left: -50%;
    top: 18px;
    z-index: 1; /*put it behind the numbers*/
  }
  &.active:before {
    border: 1px solid #d8d8d8;
  }
  &.active:after {
    background: #4e7321;
  }
  &.completed:before {
    background: #a0ea50;
    border: 1px solid #a0ea50;
    color: #333;
  }
  &.completed:after {
    background: #a0ea50;
  }
`;
export default props => {
  return (
    <Step
      className={
        props.active == props.title
          ? "active"
          : props.completed
            ? "completed"
            : ""
      }
    />
  );
};
