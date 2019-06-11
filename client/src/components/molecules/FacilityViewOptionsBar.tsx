import React from "react";
import styled from "styled-components";
import moment from "moment";
import { Chip } from "@material-ui/core";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "../atoms/Button";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

library.add(faPlusCircle, faFilePdf);

function FacilityViewOptionsBar(props: Props) {
  const { facility } = props;
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <Details facility={facility} />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <ActionButtons facility={facility} />
        </Grid>
      </Grid>
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
    <div style={{ whiteSpace: "nowrap", textAlign: "right" }}>
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
