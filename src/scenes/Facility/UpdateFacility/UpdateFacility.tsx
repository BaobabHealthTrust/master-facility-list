import React from "react";
import { basicSchema } from "../../../components/organisms/FacilityForms/schema";
import { basic } from "../../../components/organisms/FacilityForms/initialValues";
import BasicDetailsForm from "../../../components/organisms/FacilityForms/BasicDetails";
import Container from "../../../components/atoms/Container";
import Title from "../../../components/molecules/PageTitle";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FacilitySubMenu from "../../../components/organisms/FacilitySubmenu";
import { faHospital } from "@fortawesome/free-solid-svg-icons";
import { Grid } from "@material-ui/core";
import Card from "../../../components/atoms/Card";
import OptionsBar from "../../../components/molecules/FacilityViewOptionsBar";
import { FacilityPages as pages } from "../../../services/utils";

library.add(faHospital);

function UpdateFacility(props: Props) {
  const {
    sections,
    dependancies,
    activePage,
    onSubmit,
    facilitySubMenu,
    onChangePage,
    facility
  } = props;
  return (
    <>
      {facility.id && (
        <Container style={{ paddingTop: "20px" }}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12} md={3}>
              <Card heading="Facility menu">
                <FacilitySubMenu
                  menu={facilitySubMenu}
                  onClick={onChangePage}
                  activePage={activePage}
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={9}>
              <Grid item xs={12} sm={12} md={12}>
                <Title
                  title={facility.facility_name}
                  icon={<FontAwesomeIcon icon={faHospital} />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Card>
                  <OptionsBar facility={facility} />
                </Card>
              </Grid>
              {activePage == pages.summary && (
                <BasicDetailsForm
                  initialValues={basic(facility)}
                  schema={basicSchema}
                  onSubmit={onSubmit}
                  networkError={[]}
                  dependancies={dependancies}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}

type Props = {
  sections: any;
  activePage: string;
  onSubmit: Function;
  dependancies: any;
  facility: any;
  onChangePage: Function;
  facilitySubMenu: Array<any>;
};
export default UpdateFacility;

const getInitialValues: any = () => ({});
