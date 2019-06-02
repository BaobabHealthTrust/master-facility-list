import React, { useState } from "react";
import styled from "styled-components";
import SelectField from "../atoms/FilterSelect";
import { Grid } from "@material-ui/core";

function FacilityBasicFilterTab(props: Props) {
  const [values, setValues] = useState({
    district: -1,
    facilityType: -1,
    regulatoryStatus: -1,
    operationalStatus: -1,
    facilityOwner: -1
  });
  const { dependancies } = props;
  const districts = dependancies.districts.list.map((district: any) => {
    return {
      type: "district",
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
      type: "facilityOwner",
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
      <Grid container spacing={24}>
        <Grid item sm={12} md={12}>
          <SelectField
            label="Filter By District"
            values={values}
            model={districts}
            modelName="district"
            onChange={onChange}
          />
        </Grid>
        <Grid item sm={12} md={12}>
          <SelectField
            label="Filter By Type"
            values={values}
            model={facilityTypes}
            modelName="facilityType"
            onChange={onChange}
          />
        </Grid>
        <Grid item sm={12} md={12}>
          <SelectField
            label="Filter By Regulatory Status"
            values={values}
            model={regulatoryStatuses}
            modelName="regulatoryStatus"
            onChange={onChange}
          />
        </Grid>
        <Grid item sm={12} md={12}>
          <SelectField
            label="Filter By Operational Status"
            values={values}
            model={operationalStatuses}
            modelName="operationalStatus"
            onChange={onChange}
          />
        </Grid>
        <Grid item sm={12} md={12}>
          <SelectField
            label="Filter By Ownership"
            values={values}
            model={facilityOwners}
            modelName="facilityOwner"
            onChange={onChange}
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
