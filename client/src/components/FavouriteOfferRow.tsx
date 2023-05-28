import React from 'react';
import { Offer } from '../api/types';
import { Button, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type FavouriteOfferRowProps = Offer & { onClose: () => void };
const FavouriteOfferRow = ({
  name,
  amount,
  id,
  onClose
}: FavouriteOfferRowProps) => {
  const navigate = useNavigate();

  return (
    <ListItem key={name} disablePadding>
      <ListItemButton>
        <ListItemText primary={name} />
      </ListItemButton>
      <Button
        variant="outlined"
        onClick={() => {
          navigate(`/purchase/${id}`);
          onClose();
        }}
      >
        Buy now
      </Button>
    </ListItem>
  );
};

export default FavouriteOfferRow;
