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
import { isAdmin, getUser } from "../../services/helpers";
import Ac from "../atoms/Ac";

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
          data-test="downloadExcelBtn"
        >
          Download EXCEL
        </Button>
        <Button
          style={{ marginRight: "0px" }}
          theme="warning"
          icon={<FontAwesomeIcon icon={faFilePdf} />}
          onClick={() => downloadList("pdf")}
          data-test="downloadPdfBtn"
        >
          Download PDF
        </Button>
      </DownloadButtonsContainer>
      {isAdmin() && (
        <AddButtonContainer>
          <Ac
            role={getUser().role}
            action="facility:basic_details:create"
            allowed={() => (
              <Link to="/facilities/add">
                <Button
                  style={{ marginRight: "0px" }}
                  theme="primary"
                  icon={<FontAwesomeIcon icon={faPlus} />}
                  data-test="addFacilityBtn"
                >
                  Add Facility
                </Button>
              </Link>
            )}
          />
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
