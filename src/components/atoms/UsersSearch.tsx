import React, { useState } from "react";
import styled from "styled-components";

function UsersSearch(props: Props) {
  const [value, setValue] = useState("" as any);
  return (
    <Input
      placeholder="Search..."
      onChange={e => {
        setValue(e.target.value);
        props.onFilter(e.target.value);
      }}
      value={value}
    />
  );
}

type Props = {
  onFilter: Function;
};
export default UsersSearch;

const Input = styled.input`
  border-radius: 5px;
  padding: 5px 15px;
  margin: 0px 20px;
  background: #ededed;
`;
