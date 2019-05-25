import React from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import Card from "../../components/atoms/Card";
import Container from "../../components/atoms/Container";
//@ts-ignore
import Map from "../../components/organisms/MalawiMap";
import WelcomeBanner from "../../components/organisms/Welcome";
import StatCards from "../../components/organisms/StatisticsCards";
import Charts from "../../components/organisms/Charts";

const index = () => {
  const grahpData = [
    { name: "Other", value: 10 },
    { name: "Test", value: 50 },
    { name: "Test1", value: 60 }
  ];
  // make sure you have the svg file in images folder
  const statistics = [
    {
      count: 10,
      title: "Total Facilities",
      icon: "hospital.svg",
      onClick: () => {}
    },
    {
      count: 10,
      title: "Dist Hospitals",
      icon: "district.svg",
      onClick: () => {}
    },
    {
      count: 10,
      title: "Health Centers",
      icon: "clinic.svg",
      onClick: () => {}
    },
    {
      count: 10,
      title: "Dispensaries",
      icon: "normal-hospital.svg",
      onClick: () => {}
    }
  ];

  const map = (
    <MapContainer>
      <Map
        districtsSelected={[]}
        onClick={(districts: any) => console.log(districts)}
        height={700}
        selectedColor="#0468b1"
        fill="#9D9D9D"
      />
    </MapContainer>
  );
  return (
    <Container style={{ minHeight: "100%", padding: "25px", flexGrow: "1" }}>
      <Grid container spacing={32}>
        <Grid className="hide-on-med-and-down" item xs={12} md={3}>
          <Card heading="Select District">{map}</Card>
        </Grid>

        <Grid item xs={12} md={9}>
          <Grid container spacing={24}>
            <Grid item xs={12} md={12}>
              <WelcomeBanner districts={[]} />
            </Grid>
            <Grid item xs={12} md={12}>
              <StatCards statistics={statistics} />
            </Grid>
            <Grid item xs={12} md={12}>
              <Charts
                licenseStatusData={grahpData}
                operationalStatusData={grahpData}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default index;

const MapContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
