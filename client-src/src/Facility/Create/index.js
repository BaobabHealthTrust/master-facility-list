//@flow
import React from "react";
import CreateFacilityWizard from "./components/CreateFacilityWizard";
import { FormHeading } from "../../common";
import styled from "styled-components";

const Container = styled.div.attrs({
  className: "mt-8 container"
})``;

export default () => {
  return (
    <Container>
      <FormHeading
        title="Add New Facility"
        entityName=""
        icon="local_hospital"
      />
      <CreateFacilityWizard />
    </Container>
  );
};
