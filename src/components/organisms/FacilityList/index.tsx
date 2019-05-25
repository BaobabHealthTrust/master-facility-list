import React from "react";
import FacilityTable from "../../molecules/FacilityTable";
import { Paper } from "@material-ui/core";

const FacilityList = (props: Props) => {
  const { onSelect, className, data } = props;
  const facilitiesGridColumns = [
    { name: "code", title: "CODE" },
    { name: "name", title: "NAME" },
    { name: "common", title: "COMMON NAME" },
    { name: "ownership", title: "OWNERSHIP" },
    { name: "type", title: "TYPE" },
    { name: "status", title: "STATUS" },
    { name: "district", title: "DISTRICT" },
    { name: "dateOpened", title: "DATE OPENED" }
  ];

  const facilitiesGridSorting = [{ columnName: "name", direction: "asc" }];

  return (
    <Paper style={{ width: "100%" }} className={className}>
      {
        <FacilityTable
          data={data}
          columns={facilitiesGridColumns}
          pageSize={10}
          defaultSorting={facilitiesGridSorting}
          onSelected={(facility: any) => onSelect(facility.id)}
        />
      }
    </Paper>
  );
};

export default FacilityList;

type Props = {
  onSelect: Function;
  data: Array<any>;
  className?: string;
};
