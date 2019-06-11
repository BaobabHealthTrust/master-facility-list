import React from "react";
import { Paper } from "@material-ui/core";
import styled from "styled-components";
import { Link } from "react-router-dom";

function SearchResultsList(props: Props) {
  const { facilities, onClick } = props;
  return (
    <Paper>
      <table>
        <tbody>
          {facilities.map(facility => (
            <TableRow onClick={() => onClick(facility)}>
              <TableCell style={{ textAlign: "center" }}>
                {facility.code}
              </TableCell>
              <TableCell>{facility.name}</TableCell>
              <TableCell>{facility.district}</TableCell>
              <TableCell>{facility.regulatoryStatus}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </table>
    </Paper>
  );
}

type Props = {
  facilities: Array<any>;
  onClick: Function;
};
export default SearchResultsList;

const TableCell = styled.td`
  text-align: center;
`;

const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background: #f1f1f1;
  }
  &:nth-of-type(odd) {
    background: #f1f1f1;
  }
`;
