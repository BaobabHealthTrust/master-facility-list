import React from "react";
import { basicSchema } from "../../../components/organisms/FacilityForms/schema";
import { basic } from "../../../components/organisms/FacilityForms/initialValues";
import BasicDetailsForm from "../../../components/organisms/FacilityForms/BasicDetails";
import Container from "../../../components/atoms/Container";
import PageTitle from "../../../components/molecules/PageTitle";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital } from "@fortawesome/free-solid-svg-icons";
import Stepper from "../../../components/molecules/AddFacilityStepper";

library.add(faHospital);

function CreateFacility(props: Props) {
  const { sections, dependancies, active, onSubmit } = props;
  return (
    <div>
      <Container style={{ paddingTop: "40px", marginBottom: "20px" }}>
        <PageTitle
          icon={<FontAwesomeIcon icon={faHospital} />}
          title="New Facility"
        />
      </Container>
      <Stepper active={active} sections={sections} />
      {
        <Container>
          <BasicDetailsForm
            initialValues={basic()}
            schema={basicSchema}
            onSubmit={onSubmit}
            networkError={[]}
            dependancies={dependancies}
          />
        </Container>
      }
    </div>
  );
}

type Props = {
  sections: Array<string>;
  active: string;
  onSubmit: Function;
  dependancies: any;
};
export default CreateFacility;
