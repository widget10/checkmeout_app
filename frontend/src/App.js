import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkout from './components/Checkout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6aae20',
    },
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            maxWidth: 'lg',
            mx: 'auto'
          }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#6aae20',
              mb: 4
            }}
          >
            Agrichain Checkout System
          </Typography>
          <Checkout />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
