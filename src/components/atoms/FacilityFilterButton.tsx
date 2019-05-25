import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";

library.add(faFilter, faTimes);

export default function SearchButton(props: Props) {
  return (
    <ButtonContainer title="Advanced Search">
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
            {
              //@ts-ignore
              <i
                test_id="search_drawer_btn"
                onClick={e => props.onClick()}
                className="material-icons left"
              >
                <FontAwesomeIcon icon={faFilter} />
              </i>
            }
          </span>
        )}

        {props.open && (
          <span>
            <span>Advanced Filter</span>
            {
              //@ts-ignore
              <i
                test_id="search_drawer_btn"
                onClick={e => props.onClick()}
                className="material-icons right"
              >
                <FontAwesomeIcon icon={faTimes} />
              </i>
            }
          </span>
        )}
      </Link>
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
