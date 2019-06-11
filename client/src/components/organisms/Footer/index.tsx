import React from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";

export default () => {
  return (
    <footer>
      <Container>
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <img
              style={{ width: 90, height: 30 }}
              src="/static/images/kuunika_logo.png"
              alt="Kuunika"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} style={{ textAlign: "right" }}>
            <span style={{ alignContent: "right" }}>
              © {new Date().getFullYear()} Copyright, Republic of Malawi,
              Ministry of Health
            </span>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

const Container = styled.div`
  min-height: 60px;
  background: #0d47a1;
  color: white;
  display: flex;
  align-items: center;
  padding: 0px 20px;
  @media (max-width: 440px) {
    font-size: 12px;
  }
`;
