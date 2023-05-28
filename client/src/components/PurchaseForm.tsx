import * as React from 'react';
import { QuestionWithAnswer } from '../api/types';
import { useApi, useFormBuilder } from '../hooks';
import { Box, Button, Grid } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { FormikValues } from '../types';
import _ from 'lodash';
import { AxiosRequestConfig } from 'axios';

type QuestionnaireDialogProps = {
  onFormSubmit: (values: FormikValues) => Promise<void>;
  questionRequestConfig: AxiosRequestConfig;
};

export default function PurchaseForm({
  onFormSubmit,
  questionRequestConfig
}: QuestionnaireDialogProps) {
  const [questionnaireData, fetchQuestionnaireDataApi] = useApi<
    QuestionWithAnswer[]
  >(
    useMemo(
      () => ({
        requestConfig: questionRequestConfig
      }),
      [questionRequestConfig]
    )
  );

  const { actions, formik } = useFormBuilder({
    onFormSubmit,
    onTrigger: async ({ question: leadingQuestion, value, formikState }) => {}
  });

  useEffect(() => {
    const fetchQuesionnaireData = async () => {
      await fetchQuestionnaireDataApi({
        callback: (data) => {
          const setFormikValues = actions.setFormikValues;

          setFormikValues(
            data.map((d) => ({
              value: '',
              name: d.name
            }))
          );
        }
      });
    };

    fetchQuesionnaireData();
  }, [fetchQuestionnaireDataApi, actions.setFormikValues]);

  const sortedQuestionnaireData = useMemo(() => {
    if (!questionnaireData.data) return [];

    return _.orderBy(questionnaireData.data, ['order'], 'asc');
  }, [questionnaireData.data]);

  return (
    <>
      <Box>
        <Grid container direction="column" rowSpacing={2}>
          {sortedQuestionnaireData.map((questionnaireData) => {
            return (
              <Grid item key={questionnaireData.id}>
                {actions.inputFactory(questionnaireData)}
              </Grid>
            );
          })}
        </Grid>
        <Button
          variant="contained"
          sx={{ mt: 5 }}
          onClick={() => formik.handleSubmit()}
        >
          Purchase
        </Button>
      </Box>
    </>
  );
}
