import React from "react";
import { InputLabel, FormControl, Select, MenuItem } from "@material-ui/core";

function SelectField(props: SelectProps) {
  const { values, onChange, model, modelName, label } = props;
  return (
    <>
      <InputLabel htmlFor="facilityType">{label}</InputLabel>
      <FormControl className="mfl-max-width">
        <Select
          data-test={props["data-test"] || "input"}
          value={values[modelName]}
          onChange={(e: any) => {
            onChange(e, model, modelName);
          }}
          inputProps={{
            name: modelName
          }}
        >
          <MenuItem value={-1}>{"All"}</MenuItem>
          {model.map((option: any, index: any) => (
            <MenuItem key={option.id} value={index}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default SelectField;
type SelectProps = {
  values: any;
  onChange: Function;
  model: Array<any>;
  modelName: string;
  label: string;
  "data-test"?: any;
};
