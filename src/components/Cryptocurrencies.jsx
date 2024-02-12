import React, { useEffect, useState, useCallback } from 'react';
import Avatar from '@mui/material/Avatar';
import millify from 'millify';
import { useGetCryptoQuery } from '../services/cryptoApi';
import { Container, Chip, Stack } from '@mui/material';
import { CardContentStyledDown, ChipContainer, SearchInput, CardContainer, CardStyled, CardContentStyled, CoinDetails, TypographyStyled,} from './CryptocurrenciesStyles';
import { Link as RouterLink } from "react-router-dom";
import { Link, Typography } from '@mui/material';
import { Loader } from './index.js'
import { useTheme } from '@mui/material/styles';



const Cryptocurrencies = ({ countTen }) => {
  const theme = useTheme();
  const count = countTen ? 10 : 100;
  const { data, isFetching } = useGetCryptoQuery(count);
  const [cryptos, setCryptos] = useState([]);
 
  const [searchInput, setSearchInput] = useState('');
 
  useEffect(() => {
    const searchData = data?.data?.coins.filter((i) => i.name.toLowerCase().includes(searchInput));
    setCryptos(searchData || []);
  }, [data, searchInput]);

  const handleMarketCapClick = useCallback(() => {
    setCryptos(prevCryptos => {
      const sortedMarketCap = [...prevCryptos].sort((a, b) => {
        return b.marketCap.localeCompare(a.marketCap);
      });
      return sortedMarketCap;
    });
  }, []);;

  const handleRankClick = useCallback(() => {
    setCryptos(prevCryptos => {
      const sortedMarketCap = [...prevCryptos].sort((a, b) => {
        return parseFloat(a.rank) - parseFloat(b.rank);
      });
      return sortedMarketCap;
    });
  }, []);;
    
  const handleChangeClick = useCallback(() => {
    setCryptos(prevCryptos => {
      const sortedMarketCap = [...prevCryptos].sort((a, b) => {
        return parseFloat(b.change) - parseFloat(a.change);
      });
      return sortedMarketCap;
    });
  }, []);;

    const handlePriceClick = useCallback(() => {
      setCryptos(prevCryptos => {
        const sortedMarketCap = [...prevCryptos].sort((a, b) => {
          return parseFloat(b.price) - parseFloat(a.price);
        });
        return sortedMarketCap;
      });
    }, []);;

    if (isFetching) return <Loader />;
    
  return (
      <Container>
        {!countTen && (
          <>
          <SearchInput
            label="Search"
            variant="standard"
            onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
            id='back-to-top-anchor'
            InputLabelProps={{
              style: { color: theme.palette.primary.main, fontWeight: 600 }}}
          />
          <ChipContainer>
            <Stack direction="row" m={1}>
              <Chip size='small' label="Rank" variant="outlined" onClick={handleRankClick} />
            </Stack>
            <Stack direction="row" m={1}>
              <Chip size='small' label="Price" variant="outlined" onClick={handlePriceClick} />
            </Stack>
            <Stack direction="row" m={1}>
              <Chip size='small' label="Market Cap" variant="outlined" onClick={handleMarketCapClick} />
            </Stack>
            <Stack direction="row" m={1}>
              <Chip size='small' label="24h Change" variant="outlined" onClick={handleChangeClick} />
            </Stack>
          </ChipContainer>
          </> 
        )}
        <CardContainer>
          {cryptos.map((coin) => (
            <Link 
            component={RouterLink} key={coin.uuid} to={`/crypto/${coin.uuid}`}
            underline="none"
          >
            <CardStyled >
              <CardContentStyled>
                <TypographyStyled variant="h6" color="text.secondary" style={{ lineHeight: '25px'}}>
                  {coin.rank}. {coin.name}
                </TypographyStyled>
                <div style={{ marginLeft: 'auto' }}>
                  <Avatar alt="Coin" src={coin.iconUrl} style={{ backgroundColor: 'white' }}/>
                </div>
              </CardContentStyled>
                <CardContentStyledDown>
                  <CoinDetails sx={{ flexDirection: 'column' }}>
                    <TypographyStyled variant="body2" color="text.secondary">
                      Price: <b>{millify(coin.price)}</b>
                    </TypographyStyled>
                    <TypographyStyled variant="body2" color="text.secondary">
                      Market Cap: <b>{millify(coin.marketCap)}</b>
                    </TypographyStyled>
                    <TypographyStyled variant="body2" color="text.secondary">
                      Daily Change: <b>{coin.change}%</b>
                    </TypographyStyled>
                  </CoinDetails>
                  <Typography variant="subtitle2" color="primary" style={{ marginBottom: '2px', textAlign: 'right', lineHeight: '15px'}}>Click for more</Typography>
                </CardContentStyledDown>
            </CardStyled>
          </Link> 
          ))}
        </CardContainer>
      </Container>
  );
};

export default Cryptocurrencies;
