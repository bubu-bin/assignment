import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { OfferCard, QuestionnaireDialog } from '../components';
import { useApi, useBoolean } from '../hooks';
import {
  ProductCategoryDefinition,
  FormTypeDefinition,
  Offer,
  ProductCategory,
  UserFavouriteOffers
} from '../api/types';
import { Button, Grid, Stack, Typography } from '@mui/material';
import makeFormApi from '../api/formApi';
import makeQuestionApi from '../api/questionApi';
import makeOfferApi from '../api/offerApi';
import { FormStatus, FormikValues } from '../types';

const api = {
  form: makeFormApi({
    productCategory: ProductCategoryDefinition.VEHICLE_INSURANCE,
    formType: FormTypeDefinition.SEARCH
  }),
  question: makeQuestionApi({
    productCategory: ProductCategoryDefinition.VEHICLE_INSURANCE,
    formType: FormTypeDefinition.SEARCH
  }),
  offer: makeOfferApi({
    productCategory: ProductCategoryDefinition.VEHICLE_INSURANCE
  })
};

const InsuranceOffers = () => {
  const isDialogOpen = useBoolean(false);
  const [formStatus, setFormStatus] = useState<FormStatus>('FILLED');
  const [offers, fetchOffersApi] = useApi<
    Array<
      Offer & { productCategory: ProductCategory } & {
        userFavouriteOffers: UserFavouriteOffers[];
      }
    >
  >(
    useMemo(
      () => ({
        throwError: true,
        requestConfig: api.offer.getOffersRequestConfig()
      }),
      []
    )
  );

  const fetchOffers = useCallback(async () => {
    try {
      await fetchOffersApi();
    } catch (err) {
      setFormStatus('NOT_FILLED');
      const openDialog = isDialogOpen.setTrue;
      openDialog();
    }
  }, [fetchOffersApi, isDialogOpen.setTrue]);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  const onFormSubmit = async (values: FormikValues) => {
    if (formStatus === 'NOT_FILLED') {
      await api.form.postForm({ data: values });
      setFormStatus('FILLED');
    } else {
      await api.form.patchForm({ data: values });
    }

    isDialogOpen.setFalse();
    fetchOffers();
  };

  return (
    <>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        sx={{ mb: 4, mt: 2 }}
      >
        <Typography variant="h5">Offers:</Typography>
        <Button onClick={isDialogOpen.setTrue} variant="outlined">
          Refine your search...
        </Button>
      </Stack>
      <Grid container gap={2} justifyContent={'space-between'}>
        {offers.data?.map((offer, id) => (
          <Grid item key={id}>
            <OfferCard {...offer} fetchOffers={fetchOffers} />
          </Grid>
        ))}
      </Grid>
      {isDialogOpen.value && (
        <QuestionnaireDialog
          api={api}
          formStatus={formStatus}
          onFormSubmit={onFormSubmit}
          isOpen={isDialogOpen.value}
          onClose={isDialogOpen.setFalse}
        />
      )}
    </>
  );
};

export default InsuranceOffers;
