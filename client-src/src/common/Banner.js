import React from "react";
import styled, { css } from "styled-components";
import { kids, baobab, kuunika, lin, moh } from "../images";

const BannerContainer = styled.div`
  background: rgba(0, 0, 0, 0.6);
  background-image: url(${kids});
  color: white;
  background-blend-mode: darken;
  padding: 6rem 2rem;
`;

const Title = styled.div.attrs({
  className: "text-center text-white text-4xl"
})`
  text-shadow: 1px 0px #666;
`;

const Banner = ({ title }) => (
  <BannerContainer>
    <Title>{title}</Title>
  </BannerContainer>
);

export default Banner;
