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

const index = (props: Props) => {
  const {
    cardsData,
    licenseStatusGrapphData,
    operationalStatusGraphData,
    selectedDistricts,
    onRemoveDistrictFilter,
    onMapClick,
    onSummaryCardClick
  } = props;

  const map = (
    <MapContainer>
      <Map
        districtsSelected={selectedDistricts}
        onClick={(district: any) => onMapClick(district)}
        height={700}
        selectedColor="#0468b1"
        fill="#9D9D9D"
      />
    </MapContainer>
  );
  return (
    <Container style={{ minHeight: "100%", padding: "25px", flexGrow: "1" }}>
      <Grid container spacing={3}>
        <Grid className="hide-on-med-and-down" item xs={12} md={3}>
          <Card heading="Select District">{map}</Card>
        </Grid>

        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <WelcomeBanner
                districts={selectedDistricts}
                onRemoveFilter={onRemoveDistrictFilter}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <StatCards
                statistics={cardsData}
                onSummaryCardClick={onSummaryCardClick}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Charts
                licenseStatusData={licenseStatusGrapphData}
                operationalStatusData={operationalStatusGraphData}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default index;
type Props = {
  cardsData: Array<any>;
  licenseStatusGrapphData: Array<any>;
  operationalStatusGraphData: Array<any>;
  selectedDistricts: Array<any>;
  onRemoveDistrictFilter: Function;
  onMapClick: Function;
  onSummaryCardClick: Function;
};
const MapContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 74vh;
`;
