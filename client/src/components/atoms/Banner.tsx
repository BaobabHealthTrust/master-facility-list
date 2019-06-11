import React from "react";
import styled, { css } from "styled-components";

const BannerContainer = styled.div`
  background: rgba(0, 0, 0, 0.6);
  background-image: url("/static/images/kids.jpg");
  color: white;
  background-blend-mode: darken;
  padding: 6rem 2rem;
`;

const Title = styled.div.attrs({
  className: "text-center text-white text-4xl"
})`
  text-shadow: 1px 0px #666;
`;

const Banner = ({ title }: Props) => (
  <BannerContainer>
    <Title>{title}</Title>
  </BannerContainer>
);

type Props = {
  title: string;
};
export default Banner;
