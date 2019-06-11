import React, { useState } from "react";
import MobileListItem from "../atoms/MobileListItem";
import { Grid } from "@material-ui/core";
import Pagination from "../atoms/Pagination";
// @ts-ignore
import { chunk } from "lodash";
import Facility from "../../scenes/Facility/Facility";

const FacilityMobileList = (props: Props) => {
  const [page, setPage] = useState(1);
  const { data, onSelected } = props;
  const facilities: Array<any> = chunk(data, 10);
  return (
    <Grid container spacing={24}>
      <Grid item xs={12} md={12}>
        {facilities.length > 0 &&
          facilities[page - 1].map((d: any) => (
            <MobileListItem key={d.id} facility={d} onClick={onSelected} />
          ))}
      </Grid>
      <Grid item xs={12} md={12}>
        {facilities.length > 1 && (
          <Pagination
            currentPage={page}
            pages={facilities.length}
            onPageChange={setPage}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default FacilityMobileList;

type Props = {
  data: Array<{
    id: number;
    name: string;
    status: string;
    district: string;
  }>;
  onSelected: Function;
};
