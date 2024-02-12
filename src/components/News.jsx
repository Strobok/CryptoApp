import React, { useEffect, useState} from 'react';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { NewsSummary, CardContainer, CardStyled, CardContentStyled, TypographyStyled, SearchInput } from './NewsStyle';
import moment from 'moment';
import { Container } from '@mui/material';
import { Loader } from './index.js'
import { useTheme } from '@mui/material/styles';

const News = ({ countSix }) => {
  const theme = useTheme();
  const { data, isFetching } = useGetCryptoNewsQuery();
  const dataNews = data?.payload || [];

  const [news, setNews] = useState([]);
  const [searchNewsInput, setSearchNewsInput] = useState('');

  useEffect(() => {
    const searchNewsData = dataNews.filter((i) => i.summary.toLowerCase().includes(searchNewsInput));
    setNews(searchNewsData || []);
  }, [data, searchNewsInput]);

  

  const extractImagesFromSummary = () => {
    return news.map((news) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(news.summary, 'text/html');
      const imageElements = doc.getElementsByTagName('img');
      return Array.from(imageElements).map((img) => img.getAttribute('src'));
    });
  };
  
  if (isFetching) return <Loader/>
  
  const images = extractImagesFromSummary();
  const defImg = 'https://cdn.britannica.com/36/241736-159-D40F2AEC/Abstract-cryptocurrency-with-gold-bitcoin-background.jpg';
  
  return (
      <Container >
        {!countSix && (
          <SearchInput
            label="Search"
            variant="standard"
            onChange={(e) => setSearchNewsInput(e.target.value.toLowerCase())}
            id='back-to-top-anchor'
            InputLabelProps={{
              style: { color: theme.palette.primary.main, fontWeight: 600 }}}
          />
        )}
        <CardContainer>
          {news.slice(0, countSix ? 6 : undefined).map((news, index) => (
            <a key={news.id} href={news.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              <CardStyled key={news.id} id='back-to-top-anchor'>
                <CardContentStyled>
                  <TypographyStyled variant="h6" fontWeight={600} color="text.secondary" style={{height: '150px'}}>
                    {news.title}
                  </TypographyStyled>
                  <NewsSummary>
                    <img src={images[index]?.length !== 0 ? images[index] : defImg } alt="Img" />
                  </NewsSummary>
                  <TypographyStyled component="p" mt={2}>
                    {moment(news.feed_item_published_at).startOf('ss').fromNow()}
                  </TypographyStyled>
                </CardContentStyled>
              </CardStyled>
            </a>
          ))}
        </CardContainer>
      </Container>
  );
};

export default News;

    



