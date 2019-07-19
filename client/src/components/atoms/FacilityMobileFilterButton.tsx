import React from "react";
import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";

library.add(faFilter, faTimes);

export default function SearchButton(props: Props) {
  return (
    <ButtonContainer title="Advanced Search">
      <div onClick={(e: any) => props.onClick()}>
        {props.open ? (
          <FontAwesomeIcon icon={faTimes} />
        ) : (
          <FontAwesomeIcon icon={faFilter} />
        )}
      </div>
    </ButtonContainer>
  );
}

type Props = {
  open: boolean;
  onClick: Function;
};
const ButtonContainer = styled.div`
  cursor: pointer;
  font-size: 16px;
`;
