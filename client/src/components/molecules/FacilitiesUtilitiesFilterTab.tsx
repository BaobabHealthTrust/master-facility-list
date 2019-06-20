import React, { useState } from "react";
import styled from "styled-components";
import SelectField from "../atoms/FilterSelect";
import { Grid } from "@material-ui/core";

function FacilityUtilitiesFilterTab(props: Props) {
  const { dependancies } = props;
  let initialState = {};
  const utilitiesFields = dependancies.utilities.types.map(
    (utilityType: any) => {
      const utilitiesForType = dependancies.utilities.list
        .filter((utility: any) => utility.utility_type_id == utilityType.id)
        .map((utility: any, index: number) => {
          return {
            id: utility.id,
            type: "utilities",
            label: utility.utility_name
          };
        });
      initialState = { ...initialState, [`utilities${utilityType.id}`]: -1 };
      return {
        id: utilityType.id,
        label: utilityType.utility_type,
        options: utilitiesForType
      };
    }
  );

  const [values, setValues] = useState(initialState);

  const getValue: any = (model: any, type: any, value: any) =>
    value == -1 ? { type, id: -1 } : model[value];

  const onChange = (e: any, model: Array<any>, modelName: string) => {
    let value = getValue(model, "utilities", e.target.value);
    props.onAddFilter(value, model.map(val => val.id));
    setValues({ ...values, [modelName]: e.target.value });
  };
  return (
    <Container>
      <Grid container spacing={3}>
        {utilitiesFields.map((utilType: any) => (
          <Grid item xs={12} sm={12} md={12}>
            <SelectField
              label={`Filter By ${utilType.label}`}
              values={values}
              model={utilType.options}
              modelName={`utilities${utilType.id}`}
              onChange={onChange}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default FacilityUtilitiesFilterTab;

type Props = {
  dependancies: any;
  filterOptions: any;
  onAddFilter: any;
};

const Container = styled.div`
  padding: 15px 30px;
`;
