import { styled } from '@mui/system';
import { Card, CardContent, TextField, Typography } from '@mui/material';

export const SearchInput = styled(TextField)({
  marginBottom: '20px',
});

export const CardContainer = styled('div')({
    marginTop: '10px',
    marginLeft: '0px',
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
});

export const CardStyled = styled(Card)({

    width: '250px',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
});

export const CardContentStyled = styled(CardContent)({
  display: 'block',
  alignItems: 'center',
  
});

export const TypographyStyled = styled(Typography)({
    marginTop: '10px',
    
});

export const NewsSummary = styled('div')({
    '& img': {
      marginTop: '10px' , 
      width: '220px',
      height: '150px',
    },
  });