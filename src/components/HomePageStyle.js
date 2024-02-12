import { Typography, Container, Link } from '@mui/material';
import { styled } from '@mui/system';


  export const StatsContainer = styled(Container)({
    paddingLeft: 0,
    width: '200px',
    marginLeft: 0,
    marginBottom: '10px',
  });
  
  export const HomePageContainer = styled(Container)({
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 'auto',
    marginLeft: '0px',
    marginTop: '18px',
  });
  
  export const HeadingContainer = styled(Container)({
    marginBottom: '20px',
    display: 'inline-block',
    marginTop: '25px',
    
  });
  
  export const HeadingTypography = styled(Typography)({
    width: '100%',
    overflow: 'hidden',
    fontWeight: '800',
  });
  
  export const SubtitleLink = styled(Link)({
    marginBottom: '50px',
    textDecoration: 'none',
  });