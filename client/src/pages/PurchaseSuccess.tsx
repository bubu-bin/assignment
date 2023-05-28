import { Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PurchaseSuccess = () => {
  const navigation = useNavigate();

  return (
    <>
      <Typography sx={{ mb: 5 }}>Congratulations!</Typography>
      <Button variant="contained" onClick={() => navigation('/')}>
        Go to home
      </Button>
    </>
  );
};

export default PurchaseSuccess;
