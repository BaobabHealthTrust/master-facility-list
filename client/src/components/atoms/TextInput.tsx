import React from "react";
import { FormControl, TextField, FormHelperText } from "@material-ui/core";

function TextInput(props: Props) {
  const {
    value,
    name,
    label,
    touched,
    error,
    onChange,
    onBlur,
    placeholder
  } = props;
  return (
    <FormControl className="mfl-max-width">
      <TextField
        value={value}
        name={name}
        label={label}
        placeholder={placeholder}
        error={touched && typeof error != "undefined"}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && touched && (
        <FormHelperText data-test={`fieldError${name}`}>{error}</FormHelperText>
      )}
    </FormControl>
  );
}

type Props = {
  value: any;
  name: string;
  label: string;
  touched: boolean | undefined;
  error: string | undefined;
  onChange: any;
  onBlur?: any;
  placeholder?: string;
};
export default TextInput;
