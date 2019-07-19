import React from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Pagination(props: Props) {
  const { currentPage, pages, onPageChange } = props;
  return (
    <Container>
      <Button
        style={{
          borderRadius: "50%",
          minWidth: "40px",
          height: "40px"
        }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage == 1}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>
      <div>{`Page ${currentPage} of ${pages}`}</div>
      <Button
        style={{
          borderRadius: "50%",
          minWidth: "40px",
          height: "40px"
        }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage == pages}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    </Container>
  );
}

type Props = {
  currentPage: number;
  pages: number;
  onPageChange: Function;
};
export default Pagination;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
