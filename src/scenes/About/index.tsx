import React from "react";
import Banner from "../../components/atoms/Banner";
import Container from "../../components/atoms/Container";
import { Grid } from "@material-ui/core";

function index() {
  return (
    <>
      <Banner title="Get in Touch With Us" />
      <Container style={{ paddingTop: "20px" }}>
        <Grid container spacing={32}>
          <Grid item xs={12} sm={12} md={8}>
            play
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            play
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default index;
