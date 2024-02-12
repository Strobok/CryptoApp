import * as React from 'react';
import { Link as RouterLink } from "react-router-dom";
import {  List, ListItem, ListItemButton, ListItemIcon, Toolbar, Typography } from '@mui/material';
import DataThresholdingOutlinedIcon from '@mui/icons-material/DataThresholdingOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const DrawerContent = () => {
  const theme = useTheme();
  const location = useLocation();

return (
    <div>
      <List>
        {[
          { key: 'Home', icon: <CottageOutlinedIcon />, text: 'Home', link: '/' },
          { key: 'Cryptocurrencies', icon: <DataThresholdingOutlinedIcon />, text: 'Cryptocurrencies', link: '/cryptocurrencies',},
          // { key: 'Exchanges', icon: <CurrencyExchangeOutlinedIcon />, text: 'Exchanges', link: '/exchanges',}
          { key: 'News', icon: <ArticleOutlinedIcon />, text: 'News', link: '/news' },
        ].map((item) => (
          <ListItem key={item.key} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.link}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                backgroundColor: location.pathname === item.link && theme.palette.action.hover ,
              }}
            >
              <ListItemIcon sx={{ minWidth:'40px', color: theme.palette.primary.main}}>
                {item.icon}  
              </ListItemIcon>
              <Typography>{item.text}</Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default DrawerContent;
