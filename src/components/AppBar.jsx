import React from 'react'
import { AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { DarkIcon } from '../App';

const Appbar = ({handleDrawerToggle}) => {
  const theme = useTheme();


  return (
    <AppBar position="sticky" elevation={1} sx={{ backgroundColor: theme.palette.secondary.dark }} style={{width: '100%'}}>
        <Toolbar >
          <Box
          sx={{
          
            display: 'flex',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'flex-start',
            color: 'text.primary',
            borderRadius: 1,
            p: 2
          }}
          >
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{  color: 'white', mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <img src ="/logo.png" alt="Logo" width="140px" />
          </Box>
          <DarkIcon />
        </Toolbar>
    </AppBar> 
  )
}

export default Appbar







