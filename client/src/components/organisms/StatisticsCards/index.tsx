import React from "react";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import StatCard from "../../molecules/StatCard";

const StatCards = (props: Props) => {
  const { statistics, onSummaryCardClick } = props;
  return (
    <Grid container spacing={3}>
      {statistics.map((stat, index: number) => (
        <Grid
          item
          md={true}
          xs={12}
          sm={6}
          key={stat.title}
          data-test={stat.title.replace(/ /g, "")}
        >
          <StatCard
            highlight={index == 0}
            icon={stat.icon}
            count={stat.count}
            title={stat.title}
            onClick={() => {
              onSummaryCardClick(stat.type);
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;

type Props = {
  statistics: Array<any>;
  onSummaryCardClick: Function;
};
