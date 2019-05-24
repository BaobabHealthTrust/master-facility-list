import React from "react";
import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch);

const Search = (props: Props) => {
  return (
    <>
      <SearchButton className={props.className}>
        <FontAwesomeIcon icon={faSearch} />
      </SearchButton>
    </>
  );
};

export default Search;

type Props = {
  className?: string;
};
const SearchButton = styled.div`
  background-color: #94afd0;
  padding: 24px;
  margin: 0px 15px;
  border-radius: 2px;
  cursor: pointer;
`;
