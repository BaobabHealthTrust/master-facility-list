import React, { useState } from "react";
import styled from "styled-components";
import { Select, MenuItem } from "@material-ui/core";

function UsersSortField(props: Props) {
  const [valueIndex, setValueIndex] = useState(0 as any);
  const options = [
    { value: "username", label: "Username" },
    { value: "firstname", label: "Firstname" },
    { value: "lastname", label: "Lastname" }
  ];

  const onChange = (value: number) => {
    setValueIndex(value);
    props.onSort(options[value].value);
  };
  return (
    <SelectInput
      value={valueIndex}
      onChange={(e: any) => {
        onChange(e.target.value);
      }}
      inputProps={{
        name: "valueIndex"
      }}
    >
      {options.map((opt, index: number) => (
        <MenuItem value={index}>{`Sort By ${opt.label}`}</MenuItem>
      ))}
    </SelectInput>
  );
}

export default UsersSortField;

type Props = {
  onSort: Function;
};
const SelectInput = styled<any>(Select)`
  border: 0px;
`;
