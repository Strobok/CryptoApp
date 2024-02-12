import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
  return (
    <Box style={{ position: 'relative', height: '90vh'}}>
        <Box style={{ position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -100%)' }}>
        <CircularProgress />
        </Box>
    </Box>
  );
}