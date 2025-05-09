import React, { useState } from 'react';
import { 
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert
} from '@mui/material';

function Checkout() {
  const [skus, setSkus] = useState('');
  const [total, setTotal] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skus: skus.toUpperCase() }), // Convert to uppercase before sending
      });
      
      if (!response.ok) {
        throw new Error('Invalid input');
      }
      
      const data = await response.json();
      setTotal(data.total);
      setError(null);
    } catch (err) {
      setError(err.message);
      setTotal(null);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Allow both uppercase and lowercase letters
    if (!value || value.match(/^[a-zA-Z]*$/)) {
      setSkus(value);
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        maxWidth: 400, 
        mx: 'auto', 
        p: 3,
        mt: 4 
      }}
    >
      <Typography variant="h5" gutterBottom>
        Supermarket Checkout
      </Typography>
      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ mt: 2 }}
      >
        <TextField
          fullWidth
          value={skus}
          onChange={handleInputChange}
          placeholder="Enter SKUs (e.g., ABCD)"
          variant="outlined"
          margin="normal"
          helperText="Letters only (a-z or A-Z)"
          error={!!error}
        />
        <Button 
          type="submit"
          variant="contained" 
          fullWidth
          sx={{ mt: 2 }}
        >
          Calculate Total
        </Button>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {total !== null && (
        <Typography 
          variant="h4" 
          sx={{ mt: 3, color: 'success.main' }}
        >
          Total: ${(total / 100).toFixed(2)}
        </Typography>
      )}
    </Paper>
  );
}

export default Checkout;