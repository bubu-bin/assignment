import React from 'react';
import { Offer } from '../api/types';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
  IconButton
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';

const OfferCard = ({ amount, name, id, productCategory }: Offer) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Stack>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {name}
            </Typography>
            <Typography variant="h5" component="div"></Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {amount} $
            </Typography>
          </Stack>
          <IconButton>
            <FavoriteBorderIcon color="primary" />
          </IconButton>
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            navigate(`/purchase/${id}`);
          }}
        >
          Buy now
        </Button>
      </CardActions>
    </Card>
  );
};

export default OfferCard;
