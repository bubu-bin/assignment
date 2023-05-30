import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { QuestionWithAnswer } from '../api/types';
import { useApi, useFormBuilder } from '../hooks';
import { Grid } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { FormStatus, FormikValues } from '../types';
import _ from 'lodash';
import { TriggerHandler } from '../handlers/TriggerHandler';

type QuestionnaireDialogProps = {
  onClose: () => void;
  isOpen: boolean;
  onFormSubmit: (values: FormikValues) => Promise<void>;
  formStatus: FormStatus;
  api: any;
};

export default function QuestionnaireDialog({
  onClose,
  isOpen,
  onFormSubmit,
  formStatus,
  api
}: QuestionnaireDialogProps) {
  const [questionnaireData, fetchQuestionnaireDataApi, apiDispatch] = useApi<
    QuestionWithAnswer[]
  >(
    useMemo(
      () => ({
        requestConfig:
          formStatus === 'FILLED'
            ? api.form.getFormDataRequestConfig()
            : api.question.getQuestionsRequestConfig()
      }),
      [api.form, api.question, formStatus]
    )
  );

  const { actions, formik } = useFormBuilder({
    onFormSubmit,
    onTrigger: async ({ question: leadingQuestion, value, formikState }) => {
      if (
        TriggerHandler.stopCall({
          leadingQuestion
        })
      ) {
        return;
      }

      const interDependentQuestions =
        await api.question.getInterDependentQuestions({
          params: {
            questionId: leadingQuestion.id,
            value: JSON.stringify(value)
          }
        });

      const triggerHandler = new TriggerHandler({
        questionnaireData: questionnaireData.data as QuestionWithAnswer[],
        leadingQuestion: leadingQuestion,
        interDependentQuestions
      });

      const payload = triggerHandler.getPayload();

      if (!payload) return;

      apiDispatch({
        type: 'setData',
        payload
      });

      const newFormikValues = payload.map((payload) => {
        const formikValue = formikState[payload.name];

        return {
          name: payload.name,
          value: formikValue ? formikValue : ''
        };
      });

      actions.setFormikValues(newFormikValues);
    }
  });

  useEffect(() => {
    const fetchQuesionnaireData = async () => {
      await fetchQuestionnaireDataApi({
        callback: (data) => {
          const setFormikValues = actions.setFormikValues;

          setFormikValues(
            data.map((d) => ({
              value: formStatus === 'FILLED' ? d.value : d.isMulti ? [] : '',
              name: d.name
            }))
          );
        }
      });
    };

    fetchQuesionnaireData();
  }, [fetchQuestionnaireDataApi, actions.setFormikValues, formStatus]);

  const sortedQuestionnaireData = useMemo(() => {
    if (!questionnaireData.data) return [];

    return _.orderBy(questionnaireData.data, ['order'], 'asc');
  }, [questionnaireData.data]);

  return (
    <Dialog open={isOpen} scroll="paper">
      <DialogTitle>Questionnaire</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: 3 }}>
          To refine your search, please answer the questions below
        </DialogContentText>
        <Grid container direction="column" rowSpacing={2}>
          {sortedQuestionnaireData.map((questionnaireData) => {
            return (
              <Grid item key={questionnaireData.id}>
                {actions.inputFactory(questionnaireData)}
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={formStatus === 'NOT_FILLED'}>
          Close
        </Button>
        <Button onClick={() => formik.handleSubmit()}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
