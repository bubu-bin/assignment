import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useApi } from '../hooks';
import makeOfferApi from '../api/offerApi';
import { useEffect, useMemo } from 'react';
import { Offer, UserFavouriteOffers } from '../api/types';
import Stack from '@mui/material/Stack';
import { IconButton, List, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavouriteOfferRow from './FavouriteOfferRow';

export default function TemporaryDrawer({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [userFavourites, fetchUserFavouritesApi] = useApi<
    Array<UserFavouriteOffers & { offer: Offer }>
  >(
    useMemo(
      () => ({
        requestConfig: makeOfferApi({}).getUserFavourites()
      }),
      []
    )
  );

  useEffect(() => {
    const fetchUserFavourites = async () => {
      fetchUserFavouritesApi();
    };

    fetchUserFavourites();
  }, [fetchUserFavouritesApi]);

  return (
    <Drawer anchor={'right'} open={isOpen}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <Typography variant="h6">Favourites offers</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>

      <Box sx={{ width: 400 }}>
        <List>
          {userFavourites.data?.map((favourite) => {
            return <FavouriteOfferRow {...favourite.offer} onClose={onClose} />;
          })}
        </List>
      </Box>
    </Drawer>
  );
}
