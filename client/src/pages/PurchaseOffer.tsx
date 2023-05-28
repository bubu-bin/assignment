import React, { useEffect, useState } from 'react';
import { PurchaseForm } from '../components';
import { FormikValues } from 'formik';
import makeQuestionApi from '../api/questionApi';
import { FormTypeDefinition, Offer } from '../api/types';
import { Button, Stack, Typography } from '@mui/material';
import makeOfferApi from '../api/offerApi';
import { useLocation, useNavigate } from 'react-router-dom';
import makePurchaseApi from '../api/purchaseApi';

const purchaseApi = makePurchaseApi();
const offerApi = makeOfferApi({ formType: FormTypeDefinition.PURCHASE });

const PurchaseOffer = () => {
  const [offer, setOffer] = useState<Offer | null>(null);
  const [questionRequestConfig, setQuestionRequestConfig] = useState<any>(null);
  const location = useLocation();
  const navigation = useNavigate();

  useEffect(() => {
    const fetchOffer = async () => {
      const id = location.pathname.split('/').pop() as string;

      const offer = await offerApi.getOfferRequestConfig({ id });

      setOffer(offer);
      setQuestionRequestConfig(
        makeQuestionApi({
          productCategory: offer.productCategory.name,
          formType: FormTypeDefinition.PURCHASE
        }).getQuestionsRequestConfig()
      );
    };
    fetchOffer();
  }, [location.pathname]);

  const onFormSubmit = async (values: FormikValues) => {
    await purchaseApi.post({
      data: { ...values, id: offer!.id }
    });
    navigation('/success');
  };

  return (
    <>
      <Stack sx={{ width: 800 }} justifyContent={'center'}>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 5 }}>
          <Stack>
            <Typography>Product name: {offer?.name}</Typography>
            <Typography>Price: {offer?.amount} $</Typography>
          </Stack>
          <Button
            variant="outlined"
            onClick={async () => {
              await makeOfferApi({}).addToFavourite({
                data: { id: offer?.id }
              });
            }}
          >
            Add to favourite
          </Button>
        </Stack>
        {questionRequestConfig && (
          <PurchaseForm
            onFormSubmit={onFormSubmit}
            questionRequestConfig={questionRequestConfig}
          />
        )}
      </Stack>
    </>
  );
};

export default PurchaseOffer;
