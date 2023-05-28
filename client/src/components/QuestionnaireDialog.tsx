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
import { MultiHandler } from '../handlers/MultiHandler';

// TODO: create trigger handler
// TODO: after form submit the interdepedent questions do not work

type QuestionnaireDialogProps = {
  onClose: () => void;
  isOpen: boolean;
  onFormSubmit: (values: FormikValues) => Promise<void>;
  formStatus: FormStatus;
  // TODO: handle any
  api: any;
};

// TODO: this can be inside Context

export default function QuestionnaireDialog({
  onClose,
  isOpen,
  onFormSubmit,
  formStatus,
  api
}: QuestionnaireDialogProps) {
  // TODO: dynamic generic type for the question
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
      const hasInterDependentQuestion =
        leadingQuestion.interDependentQuestionsId.length > 0;

      const isDuplicate =
        questionnaireData.data?.find((q) =>
          leadingQuestion.interDependentQuestionsId.includes(q.id)
        ) && !leadingQuestion.isMulti;

      if (
        !questionnaireData.data ||
        !hasInterDependentQuestion ||
        value === '' ||
        isDuplicate
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

      let payload = [...questionnaireData.data, ...interDependentQuestions];

      if (leadingQuestion.isMulti) {
        const multiHandler = new MultiHandler(
          questionnaireData.data,
          leadingQuestion,
          interDependentQuestions
        );

        payload = multiHandler.getPayload();
      }

      apiDispatch({
        type: 'setData',
        payload
      });

      actions.setFormikValues([
        ...Object.entries(formikState).map(([name, value]) => ({
          name,
          value
        })),
        ...interDependentQuestions.map((n: any) => ({
          value: '',
          name: n.name
        }))
      ]);
    }
  });

  useEffect(() => {
    const fetchQuesionnaireData = async () => {
      await fetchQuestionnaireDataApi({
        callback: (data) => {
          const setFormikValues = actions.setFormikValues;

          // TODO: tidy up this logic
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

    // TODO: it is not working
    const order = _.orderBy(questionnaireData.data, ['order'], 'asc');
    return order;
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
