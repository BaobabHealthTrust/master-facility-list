import React from "react";
import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../atoms/Button";

library.add(faFilter, faTimes);

export default function SearchButton(props: Props) {
  return (
    <ButtonContainer title="Advanced Search">
      <Button
        style={{
          borderRadius: "0px",
          width: props.open ? "340px" : "",
          transition: "all 2s ease-in-out !important",
          backgroundColor: "#375a8c",
          margin: "0px"
        }}
        onClick={(e: any) => props.onClick()}
        icon={
          props.open ? (
            <FontAwesomeIcon icon={faTimes} />
          ) : (
            <FontAwesomeIcon icon={faFilter} />
          )
        }
        iconPosition="right"
      >
        {props.open ? <span>Advanced Filter</span> : <div />}
      </Button>
    </ButtonContainer>
  );
}

type Props = {
  open: boolean;
  onClick: Function;
};
const ButtonContainer = styled.div`
  position: fixed;
  top: 100px;
  left: 0px;
  z-index: 1000;
`;
