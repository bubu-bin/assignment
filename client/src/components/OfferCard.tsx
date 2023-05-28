import React from 'react';
import { Offer } from '../api/types';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button
} from '@mui/material';

type OfferProps = Offer;

const OfferCard = ({
  productCategory,
  price,
  name,
  opinionsCount
}: OfferProps) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {name}
        </Typography>
        <Typography variant="h5" component="div"></Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {price} $
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Buy now</Button>
      </CardActions>
    </Card>
  );
};

export default OfferCard;
