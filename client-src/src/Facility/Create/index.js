//@flow
import React from "react";
import CreateFacilityWizard from "./components/CreateFacilityWizard";
import { FormHeading } from "../../common";
import styled from "styled-components";

const Container = styled.div.attrs({
  className: "pt-8 container"
})``;

export default () => {
  return (
    <React.Fragment>
      <Container>
        <FormHeading title="New Facility" entityName="" icon="business" />
      </Container>
      <CreateFacilityWizard />
    </React.Fragment>
  );
};
