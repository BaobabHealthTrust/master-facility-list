import React from "react";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import Card from "../../atoms/Card";
import PieChart from "../../molecules/PieChar";

const StatCards = (props: Props) => {
  const { licenseStatusData, operationalStatusData } = props;
  return (
    <Grid container spacing={3}>
      <Grid item md={6} xs={12} sm={6}>
        <Card
          style={{ minHeight: "430px" }}
          heading="Facilities By License Status"
        >
          {<PieChart data={licenseStatusData} />}
        </Card>
      </Grid>
      <Grid item md={6} xs={12} sm={6}>
        <Card
          style={{ minHeight: "430px" }}
          heading="Facilities By Operational Status"
        >
          {<PieChart data={operationalStatusData} />}
        </Card>
      </Grid>
    </Grid>
  );
};

export default StatCards;

type Props = {
  licenseStatusData: Array<any>;
  operationalStatusData: Array<any>;
};
