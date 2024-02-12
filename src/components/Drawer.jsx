import * as React from 'react';
import { Grid,Drawer } from '@mui/material';
import DrawerContent from './DrawerContent'
import { useTheme } from '@mui/material/styles';

function ResponsiveDrawer({ mobileOpen, handleDrawerToggle }) {
  const theme = useTheme();

  return (
    <>
      {mobileOpen && <Grid 
        style={{zIndex: '9999', position: 'fixed', backgroundColor: theme.palette.background.paper }}
        onClose={handleDrawerToggle}
        onClick={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { backgroundColor: 'white', color: '#666666', boxSizing: 'border-box' },
      }}
      >
        <DrawerContent />
      </Grid>}
      
    
      <Grid  
        style={{position: 'fixed'}}
        sx={{ 
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {  backgroundColor: 'white', color: '#666666', boxSizing: 'border-box' },
        }}
      >
        <DrawerContent />
      </Grid>
     
    </>
  );
}

export default ResponsiveDrawer;

