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
import { Link } from "react-router-dom";
import { isAdmin } from "../../services/helpers";

library.add(faPlus, faFilePdf, faFileExcel);

function FacilityToolbar(props: Props) {
  const { downloadList } = props;
  return (
    <ButtonsContainer>
      <DownloadButtonsContainer>
        <Button
          style={{ marginLeft: "0px" }}
          theme="success"
          icon={<FontAwesomeIcon icon={faFileExcel} />}
          onClick={() => downloadList("excel")}
        >
          Download EXCEL
        </Button>
        <Button
          style={{ marginRight: "0px" }}
          theme="warning"
          icon={<FontAwesomeIcon icon={faFilePdf} />}
          onClick={() => downloadList("pdf")}
        >
          Download PDF
        </Button>
      </DownloadButtonsContainer>
      {isAdmin() && (
        <AddButtonContainer>
          <Link to="/facilities/add">
            <Button
              style={{ marginRight: "0px" }}
              theme="primary"
              icon={<FontAwesomeIcon icon={faPlus} />}
            >
              Add Facility
            </Button>
          </Link>
        </AddButtonContainer>
      )}
    </ButtonsContainer>
  );
}
type Props = {
  downloadList: Function;
};

export default FacilityToolbar;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
  font-size: 16px;
`;
const DownloadButtonsContainer = styled.div``;

const AddButtonContainer = styled.div.attrs({
  className: "hide-on-med-and-down"
})`
  text-align: right;
`;
