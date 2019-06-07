import React from "react";
import {
  basicSchema,
  contactSchema,
  getResourcesSchema
} from "../../../components/organisms/FacilityForms/schema";
import {
  basic,
  contact,
  resources,
  utilities,
  services
} from "../../../components/organisms/FacilityForms/initialValues";
import BasicDetailsForm from "../../../components/organisms/FacilityForms/BasicDetails";
import ContactDetails from "../../../components/organisms/FacilityForms/ContactDetails";
import ResourceDetails from "../../../components/organisms/FacilityForms/Resources";
import UtilityDetails from "../../../components/organisms/FacilityForms/Utilities";
import ServicesForm from "../../../components/organisms/FacilityForms/Services";
import Container from "../../../components/atoms/Container";
import PageTitle from "../../../components/molecules/PageTitle";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital } from "@fortawesome/free-solid-svg-icons";
import Stepper from "../../../components/molecules/AddFacilityStepper";
import FinishWindow from "../../../components/molecules/FacilityAddFinish";
import Facility from "../Facility";

library.add(faHospital);

function CreateFacility(props: Props) {
  const {
    sections,
    dependancies,
    active,
    onSubmit,
    onCancel,
    facility
  } = props;
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
          {active == sections[0] && (
            <BasicDetailsForm
              initialValues={basic()}
              schema={basicSchema}
              onSubmit={onSubmit}
              networkError={[]}
              dependancies={dependancies}
              onCancel={onCancel}
            />
          )}
          {active == sections[1] && (
            <ContactDetails
              initialValues={contact()}
              schema={contactSchema}
              onSubmit={onSubmit}
              networkError={[]}
              dependancies={dependancies}
              onCancel={onCancel}
            />
          )}
          {active == sections[2] && (
            <ResourceDetails
              initialValues={resources(dependancies.resources.list)}
              schema={getResourcesSchema(dependancies.resources.list)}
              onSubmit={onSubmit}
              networkError={[]}
              dependancies={dependancies}
              onCancel={onCancel}
            />
          )}
          {active == sections[3] && (
            <UtilityDetails
              initialValues={utilities()}
              onSubmit={onSubmit}
              networkError={[]}
              dependancies={dependancies}
              onCancel={onCancel}
            />
          )}
          {active == sections[4] && (
            <ServicesForm
              initialValues={services()}
              onSubmit={onSubmit}
              networkError={[]}
              dependancies={dependancies}
              onCancel={onCancel}
            />
          )}
          {active == "Finish" && facility.id && (
            <FinishWindow facility={facility} error={true} />
          )}
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
  onCancel: Function;
  facility: any;
};
export default CreateFacility;
