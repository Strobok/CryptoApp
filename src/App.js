import React, { useState }from 'react'
import { BackToTop, Appbar, ResponsiveDrawer, HomePage, Exchanges, Cryptocurrencies, CryptoDetails, News } from './components'
import { Routes, Route } from "react-router-dom";
import { Grid,  Box,  CssBaseline } from '@mui/material';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
 

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export function DarkIcon() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      sx={{
        overflow: 'hidden',
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        color: 'text.primary',
        borderRadius: 1,
      }}
    >
      
      <IconButton sx={{ ml: 1, color: theme.palette.common.white }} onClick={colorMode.toggleColorMode} >
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}

const App = () => {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary:{
            main: '#F29327'
          },
          secondary: {
            main:'#303030'
          },
        },
        typography: {
          fontFamily: 'Rethink Sans',
            fontWeightLight: 300,
            fontWeightRegular: 400, 
            fontWeightMedium: 500,
            fontWeightBold: 600,  
        },
      }),
    [mode],
  );

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Appbar handleDrawerToggle={handleDrawerToggle}/>
        <Grid container spacing={2} >
          <Grid item xs={0} sm={0} md={3} lg={2} xl={1}>
            <ResponsiveDrawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/> 
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={10} xl={11} mt={2}>
              <Routes>
                <Route>
                  <Route index element={<HomePage />} />
                  {/* <Route path="/exchanges" element={<Exchanges />} /> */}
                  <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
                  <Route path="/crypto/:coinId" element={<CryptoDetails />} />
                  <Route path="/news" element={<News />} />
                </Route>
              </Routes>
          </Grid>
          <BackToTop/>
        </Grid> 
        
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App


 




      
     
      