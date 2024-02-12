import React from 'react';
import { Typography, Container, Link } from '@mui/material';
import millify from 'millify';
import { useGetCryptoQuery } from '../services/cryptoApi';
import { Loader, Cryptocurrencies, News } from './index.js'
import { Link as RouterLink } from "react-router-dom";
import {  StatsContainer, HomePageContainer, HeadingContainer, HeadingTypography, SubtitleLink } from './HomePageStyle'


const HomePage = () => {
  const { data, isFetching } = useGetCryptoQuery(10);

  if (isFetching) return <Loader />;

  const homeStats = data?.data?.stats;

  const stats = [
    { label: 'Total Cryptocurrencies', value: millify(homeStats.total) },
    { label: 'Total Exchanges', value: homeStats.totalExchanges },
    { label: 'Total Market Cap', value: millify(homeStats.totalMarketCap) },
    { label: 'Total 24h Volume', value: millify(homeStats.total24hVolume) },
    { label: 'Total Markets', value: millify(homeStats.totalMarkets) },
    { label: 'Total Coins', value: millify(homeStats.totalCoins) },
  ];

  const renderStats = () =>
    stats.map((stat, index) => (
      <StatsContainer key={index}>
        <Typography variant="subtitle2" color="text.secondary">
          {stat.label}
        </Typography>
        <Typography variant="h5" color="text.secondary" fontWeight="600">
          {stat.value}
        </Typography>
      </StatsContainer>
    ));

  return (
    <Container style={{maxWidth: '1300px'}}>
      <HomePageContainer id='back-to-top-anchor'>{renderStats()}</HomePageContainer>
      <HeadingContainer>
        <HeadingTypography variant="h5" color="primary">
          Top 10 Cryptocurrencies
        </HeadingTypography>
        <SubtitleLink
          component={RouterLink} to="/cryptocurrencies"
          variant="subtitle2"
          color="text.secondary"
          underline="none"
        >
          Click For More
        </SubtitleLink>
      </HeadingContainer>
      <Cryptocurrencies countTen />
      <HeadingContainer>
        <HeadingTypography variant="h5" color="primary">
          Latest News
        </HeadingTypography>
        <SubtitleLink
          component={RouterLink} to="/News"
          variant="subtitle2"
          color="text.secondary"
          underline="none"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          Click For More News
        </SubtitleLink>
      </HeadingContainer>
      <News countSix />
    </Container>
  );
};

export default HomePage;
