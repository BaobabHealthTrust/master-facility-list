import React from "react";
import styled from "styled-components";
import moment from "moment";
import { Chip } from "@material-ui/core";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "../atoms/Button";
import { Link } from "react-router-dom";

library.add(faPlusCircle, faFilePdf);

function FacilityViewOptionsBar(props: Props) {
  const { facility } = props;
  return (
    <Container>
      <Details facility={facility} />
      <ActionButtons facility={facility} />
    </Container>
  );
}
type Props = {
  facility: any;
};
export default FacilityViewOptionsBar;

export function Details(props: Props) {
  const { facility } = props;
  return (
    <div>
      {<Code>{`${facility.facility_code && facility.facility_code}, `}</Code>}
      {`${facility.district && facility.district.district_name}`}
      <br />
      aka {<b>{facility.common_name}</b>}
      {
        <LastUpdated>{` Last Updated - ${moment(facility.updated_at).format(
          "LLLL"
        )}`}</LastUpdated>
      }
    </div>
  );
}

export function ActionButtons(props: Props) {
  return (
    <div className="hide-on-med-and-down" style={{ whiteSpace: "nowrap" }}>
      <Button
        style={{ marginLeft: "0px" }}
        theme="warning"
        icon={<FontAwesomeIcon icon={faFilePdf} />}
      >
        Download Pdf
      </Button>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LastUpdated = styled.small`
  font-style: italic;
  color: #7d7d7d;
`;

const Code = styled.b`
  font-size: 18px;
`;
