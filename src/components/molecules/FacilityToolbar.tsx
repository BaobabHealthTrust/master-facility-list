import React from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFilePdf,
  faFileExcel
} from "@fortawesome/free-solid-svg-icons";

library.add(faPlus, faFilePdf, faFileExcel);

function FacilityToolbar() {
  return (
    <ButtonsContainer>
      <DownloadButtonsContainer>
        <Button theme="success" icon={<FontAwesomeIcon icon={faFileExcel} />}>
          Download EXCEL
        </Button>
        <Button theme="warning" icon={<FontAwesomeIcon icon={faFilePdf} />}>
          Download PDF
        </Button>
      </DownloadButtonsContainer>
      <AddButtonContainer>
        <Button theme="primary" icon={<FontAwesomeIcon icon={faPlus} />}>
          Add Facility
        </Button>
      </AddButtonContainer>
    </ButtonsContainer>
  );
}

export default FacilityToolbar;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const DownloadButtonsContainer = styled.div``;

const AddButtonContainer = styled.div`
  text-align: right;
`;
