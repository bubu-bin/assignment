import { Box } from '@mui/material';
import React from 'react';
type BodyProps = {
  children: React.ReactNode;
};
const Body = ({ children }: BodyProps) => {
  return (
    <Box className="body" sx={{ background: '#F3F5F7', p: 2 }}>
      {children}
    </Box>
  );
};

export default Body;
