import React from 'react';
import { Offer, ProductCategory, UserFavouriteOffers } from '../api/types';
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
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import makeOfferApi from '../api/offerApi';

type OfferCardProps = Offer & { productCategory: ProductCategory } & {
  userFavouriteOffers: UserFavouriteOffers[];
} & { fetchOffers: () => void };

const OfferCard = ({
  amount,
  name,
  id,
  userFavouriteOffers,
  fetchOffers
}: OfferCardProps) => {
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
          <IconButton
            onClick={async () => {
              await makeOfferApi({}).addToFavourite({
                data: { id }
              });
              fetchOffers();
            }}
          >
            {userFavouriteOffers.length > 0 ? (
              <FavoriteIcon color="primary" />
            ) : (
              <FavoriteBorderIcon color="primary" />
            )}
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
