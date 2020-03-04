import React, { useState } from "react";
import styled from "styled-components";
import SelectField from "../atoms/FilterSelect";
import { Grid } from "@material-ui/core";

function FacilityBasicFilterTab(props: Props) {
  const [values, setValues] = useState({
    districts: -1,
    facilityTypes: -1,
    regulatoryStatuses: -1,
    operationalStatuses: -1,
    facilityOwners: -1
  });
  const { dependancies } = props;
  const districts = dependancies.districts.list.map((district: any) => {
    return {
      type: "districts",
      id: district.id,
      label: district.district_name
    };
  });

  const facilityTypes = dependancies.facilityTypes.list.map((type: any) => {
    return {
      type: "facilityTypes",
      id: type.id,
      label: type.facility_type
    };
  });

  const regulatoryStatuses = dependancies.regulatoryStatuses.list.map(
    (status: any) => {
      return {
        type: "regulatoryStatuses",
        id: status.id,
        label: status.facility_regulatory_status
      };
    }
  );

  const operationalStatuses = dependancies.operationalStatuses.list.map(
    (status: any) => {
      return {
        type: "operationalStatuses",
        id: status.id,
        label: status.facility_operational_status
      };
    }
  );

  const facilityOwners = dependancies.owners.list.map((owner: any) => {
    return {
      type: "facilityOwners",
      id: owner.id,
      label: owner.facility_owner
    };
  });

  const getValue: any = (model: any, type: any, value: any) =>
    value == -1 ? { type, id: -1 } : model[value];

  const onChange = (e: any, model: Array<any>, modelName: string) => {
    let value = getValue(model, modelName, e.target.value);
    props.onAddFilter(value);
    setValues({ ...values, [modelName]: e.target.value });
  };
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <SelectField
            label="Filter By District"
            values={values}
            model={districts}
            modelName="districts"
            onChange={onChange}
            data-test="districts"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <SelectField
            label="Filter By Type"
            values={values}
            model={facilityTypes}
            modelName="facilityTypes"
            onChange={onChange}
            data-test="facilityTypes"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <SelectField
            label="Filter By Regulatory Status"
            values={values}
            model={regulatoryStatuses}
            modelName="regulatoryStatuses"
            onChange={onChange}
            data-test="regulatoryStatuses"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <SelectField
            label="Filter By Operational Status"
            values={values}
            model={operationalStatuses}
            modelName="operationalStatuses"
            onChange={onChange}
            data-test="operationalStatuses"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <SelectField
            label="Filter By Ownership"
            values={values}
            model={facilityOwners}
            modelName="facilityOwners"
            onChange={onChange}
            data-test="facilityOwners"
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default FacilityBasicFilterTab;

type Props = {
  dependancies: any;
  filterOptions: any;
  onAddFilter: any;
};

const Container = styled.div`
  padding: 15px 30px;
`;
