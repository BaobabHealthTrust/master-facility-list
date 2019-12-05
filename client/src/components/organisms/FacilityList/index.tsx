import React from "react";
import FacilityTable from "../../molecules/FacilityTable";
import MobileFacilityList from "../../molecules/FacilityMobileList";
import { Paper } from "@material-ui/core";

const FacilityList = (props: Props) => {
  const { onSelect, className, data } = props;
  const facilitiesGridColumns = [
    { name: "code", title: "NEW CODE" },
    { name: "code", title: "OLD CODE" },
    { name: "name", title: "NAME" },
    { name: "district", title: "DISTRICT" },
    { name: "ownership", title: "OWNERSHIP" },
    { name: "type", title: "TYPE" },
    { name: "status", title: "STATUS" },
    { name: "district", title: "DISTRICT" },
    { name: "latitude", title: "LATITUDE" },
    { name: "longitude", title: "LONGITUDE" },
    { name: "dateOpened", title: "DATE OPENED" }
  ];

  const facilitiesGridSorting = [{ columnName: "name", direction: "asc" }];

  return (
    <>
      <Paper
        style={{ width: "100%" }}
        className={`${className} hide-on-med-and-down`}
      >
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

      <Paper
        style={{ width: "100%" }}
        className={`${className} hide-on-large-only`}
      >
        {
          <MobileFacilityList
            data={data}
            onSelected={(facility: any) => onSelect(facility.id)}
          />
        }
      </Paper>
    </>
  );
};

export default FacilityList;

type Props = {
  onSelect: Function;
  data: Array<any>;
  className?: string;
};
