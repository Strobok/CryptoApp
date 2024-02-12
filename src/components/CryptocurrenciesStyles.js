import { styled } from '@mui/system';
import { Container, Card, CardContent, TextField, Typography } from '@mui/material';

export const SearchInput = styled(TextField)({
  marginBottom: '20px',
});

export const CardContainer = styled('div')({
  marginLeft: '0px',
  display: 'flex',
  gap: '20px',
  flexWrap: 'wrap',
});

export const CardStyled = styled(Card)({
  width: '250px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const CardContentStyled = styled(CardContent)({
  display: 'flex',
  alignItems: 'center',
  height: '25px',
  marginTop:'30px',
  marginBottom:'10px',
  
});

export const CardContentStyledDown = styled(CardContent)({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  
});

export const CoinDetails = styled(CardContent)({
  padding: '0',
  
});

export const TypographyStyled = styled(Typography)({
  width: '150px',
  marginRight: '10px',
  lineHeight: '20px'
});


export const ChipContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: '20px',
  paddingLeft: '0px'
});


