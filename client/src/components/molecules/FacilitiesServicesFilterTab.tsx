import React, { useState } from "react";
import styled from "styled-components";
import SelectField from "../atoms/FilterSelect";
import { Grid } from "@material-ui/core";

function FacilityServicesFilterTab(props: Props) {
  const { dependancies } = props;
  let initialState = {};
  const servicesFields = dependancies.services.types.map((serviceType: any) => {
    const servicesForType = dependancies.services.list
      .filter((service: any) => service.service_type_id == serviceType.id)
      .map((service: any, index: number) => {
        return {
          id: service.id,
          type: "services",
          label: service.service_name
        };
      });
    initialState = { ...initialState, [`services${serviceType.id}`]: -1 };
    return {
      id: serviceType.id,
      label: serviceType.service_type,
      options: servicesForType
    };
  });

  const [values, setValues] = useState(initialState);

  const getValue: any = (model: any, type: any, value: any) =>
    value == -1 ? { type, id: -1 } : model[value];

  const onChange = (e: any, model: Array<any>, modelName: string) => {
    let value = getValue(model, "services", e.target.value);
    props.onAddFilter(value, model.map(val => val.id));
    setValues({ ...values, [modelName]: e.target.value });
  };
  return (
    <Container>
      <Grid container spacing={3}>
        {servicesFields.map((serType: any) => (
          <Grid item xs={12} sm={12} md={12}>
            <SelectField
              label={`Filter By ${serType.label}`}
              values={values}
              model={serType.options}
              modelName={`services${serType.id}`}
              onChange={onChange}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default FacilityServicesFilterTab;

type Props = {
  dependancies: any;
  filterOptions: any;
  onAddFilter: any;
};

const Container = styled.div`
  padding: 15px 30px;
`;
