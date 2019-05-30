import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ButtonContainer = styled.div`
  position: fixed;
  top: 100px;
  left: 0px;
  z-index: 1000;
`;
export default function SearchButton(props) {
  return (
    <ButtonContainer className={props.className} title="Advanced Search">
      <Link
        style={{
          borderRadius: "0px",
          width: props.open ? "340px" : "0",
          transition: "all 2s ease-in-out !important",
          backgroundColor: "#375a8c"
        }}
        className="waves-effect btn"
        to="#"
      >
        {!props.open && (
          <span>
            <i
              test_id="search_drawer_btn"
              onClick={() => props.onClick()}
              className="material-icons left"
            >
              filter_list
            </i>
          </span>
        )}

        {props.open && (
          <span>
            <span>Advanced Filter</span>
            <i
              test_id="search_drawer_btn"
              onClick={() => props.onClick()}
              className="material-icons right"
            >
              close
            </i>
          </span>
        )}
      </Link>
    </ButtonContainer>
  );
}
