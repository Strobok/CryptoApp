import React, { useState, useEffect } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Grid, Autocomplete, TextField, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import LineChart from './LineChart';
import { HeadingTypography, DividerLine, ListItems } from './CryptoDetailsStyles';
import { Loader } from './index.js'
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import { Container } from '@mui/system';
import { useTheme } from '@mui/material/styles';

const CryptoDetails = () => {
const theme = useTheme();
const { coinId } = useParams();

const [timeperiod, setTimeperiod] = useState('24h')
const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
const { data: coinHistory, isTimeFetching } = useGetCryptoHistoryQuery({ coinId, timeperiod });
const cryptoDetails = data?.data?.coin;

if ( isFetching) return <Loader />


const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

const stats = [
  { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,   },
  { title: 'Rank', value: cryptoDetails?.rank, icon: 0 },
  { title: '24h Volume', value: `$ ${cryptoDetails?.['24hVolume'] && millify(cryptoDetails?.['24hVolume'])}`, },
  { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`,  },
  { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`,  },
];

const genericStats = [
  { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, },
  { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges,  },
  { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <FileDownloadDoneIcon /> : <NotInterestedIcon />,  },
  { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`,  },
  { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`,  },
];

return (
  <Container>
    <Container>
      <HeadingTypography mb={2} mt={2} variant="h5" color="primary" id='back-to-top-anchor'>
        {cryptoDetails.name} ({cryptoDetails.symbol}) 
      </HeadingTypography>
      <Typography variant="body1" color="text.secondary">
        {cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.
      </Typography>
    </Container>  

    <Container>      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <List>
            {stats.map(({ icon, title, value }, index) => (
              <React.Fragment key={title}>
                <ListItems>
                  <ListItemText primary={title} secondary={value} />
                </ListItems>
                {index !== stats.length - 1 && <DividerLine variant="inset" component="li" />} 
              </React.Fragment>
            ))}
          </List>
        </Grid>

        <Grid item xs={12} md={6}>
          <List>
            {genericStats.map(({ icon, title, value }, index) => (
              <React.Fragment key={title}>
                <ListItems>
                  <ListItemText primary={title} secondary={value} />
                </ListItems>
                {index !== stats.length - 1 && <DividerLine variant="inset" component="li" />} 
              </React.Fragment>
            ))}
          </List>
        </Grid>  
      </Grid>
    </Container>
      
    <Container>
    <HeadingTypography variant="h5" color="primary"  >{cryptoDetails?.name} Price Chart </HeadingTypography>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={12} md={6}>
          <Typography mt={1} variant="subtitle2" color="text.secondary">Change: <b>{coinHistory?.data?.change}%</b></Typography>
          <Typography variant="subtitle2" color="text.secondary">Current {cryptoDetails?.name} Price: $ <b>{millify(cryptoDetails?.price)}</b></Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} pb={1} >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={time}
            sx={{ width: 300 }}
            onChange={(event, value)=> setTimeperiod(value)}
            renderInput={(params) => 
          <TextField {...params} 
            label="Set Time"  
            variant="standard"
            InputLabelProps={{
              style: { color: theme.palette.primary.main, fontWeight: 600 }
            }}
            />}
          />
        </Grid>
      </Grid>
    </Container>
    
    {isTimeFetching? <Loader /> : <LineChart coinHistory={coinHistory}/>}
    
    <Container>
      <HeadingTypography mb={2} mt={2} variant="h5" color="primary">
        What is {cryptoDetails.name}? 
      </HeadingTypography>
      <Typography mb={2} variant="body1" color="text.secondary">
        {HTMLReactParser(cryptoDetails.description)}  
      </Typography>
    </Container> 

    <Container>
      <HeadingTypography mb={2} variant="h5" color="primary">{cryptoDetails.name} Links</HeadingTypography>
    </Container>  
    <Container style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
      {cryptoDetails.links?.map((link) => (
      <Grid key={link.name} mb={5} style={{width: '125px', marginRight: '50px'}}>
        <Typography >{link.type}</Typography>
        <a href={link.url} target="_blank" rel="noreferrer"  style={{ color: 'blue', textDecoration: 'none' }}>{link.name}</a>
      </Grid>
      ))}
    </Container>
  </Container>
)
}

export default CryptoDetails