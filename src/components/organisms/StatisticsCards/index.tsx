import React from "react";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import StatCard from "../../molecules/StatCard";

const StatCards = (props: Props) => {
  const { statistics } = props;
  return (
    <Grid container spacing={32}>
      {statistics.map(stat => (
        <Grid item md={3} xs={12} sm={6}>
          <StatCard
            icon={stat.icon}
            count={stat.count}
            title={stat.title}
            onClick={() => {}}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;

type Props = {
  statistics: Array<any>;
};
