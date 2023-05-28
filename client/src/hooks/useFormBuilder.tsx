import { ChangeEvent, FocusEvent, useCallback } from 'react';
import { useFormik } from 'formik';
import { InputTypeDefinition, Question } from '../api/types';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { FormikValues } from '../types';
import FormGroup from '@mui/material/FormGroup';

type UseFormBuilderProps = {
  onFormSubmit: (values: FormikValues) => Promise<void>;
  onTrigger: ({
    question,
    value,
    formikState
  }: {
    question: Question;
    value: any;
    formikState: FormikValues;
  }) => Promise<void>;
};

const useFormBuilder = ({ onFormSubmit, onTrigger }: UseFormBuilderProps) => {
  const formik = useFormik<FormikValues>({
    initialValues: {},
    onSubmit: onFormSubmit
  });

  const setFormikValues = useCallback(
    (input: Array<{ name: string; value: string }>) => {
      const values = input.map((i) => [i.name, i.value]);
      const setValues = formik.setValues;
      setValues(Object.fromEntries(values));
    },
    [formik.setValues]
  );

  const handleRadioChange =
    (question: Question) => async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value: selectedValue } = e.target;
      formik.setFieldValue(question.name, selectedValue);

      await onTrigger({
        question,
        value: selectedValue,
        formikState: {
          ...formik.values,
          [question.name]: selectedValue
        }
      });
    };

  const handleTextInputBlur =
    (question: Question) => async (e: FocusEvent<HTMLInputElement>) => {
      const { value } = e.target;

      await onTrigger({
        question,
        value,
        formikState: formik.values
      });
    };

  const handleTextInputChange =
    (question: Question) => async (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      formik.setFieldValue(question.name, value);
    };

  const handleCheckboxChange =
    (question: Question) => async (e: ChangeEvent<HTMLInputElement>) => {
      const { value: id } = e.target;

      let value: string[] = [];

      const checkedIds = formik.values[question.name] as string[];

      const isDuplicate = checkedIds!.find((checkedId) => checkedId === id);

      if (isDuplicate) {
        value = checkedIds!.filter((checkedId) => checkedId !== id);
      } else {
        value = [...checkedIds, id];
      }

      formik.setFieldValue(question.name, value);

      await onTrigger({
        question,
        value,
        formikState: {
          ...formik.values,
          [question.name]: value
        }
      });
    };

  const renderCheckbox = (question: Question) => {
    return (
      <>
        <Typography>{question.prompt}</Typography>
        <FormGroup>
          {question.options.map((option) => (
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckboxChange(question)}
                  name={option.value}
                  value={option.id}
                  checked={(formik.values[question.name] as string[]).includes(
                    String(option.id)
                  )}
                />
              }
              label={option.value}
            />
          ))}
        </FormGroup>
      </>
    );
  };

  const renderTextInput = (question: Question) => {
    return (
      <TextField
        onChange={handleTextInputChange(question)}
        type={question.textFieldType}
        InputLabelProps={{ shrink: true }}
        value={formik.values[question.name]}
        id={question.name}
        onBlur={handleTextInputBlur(question)}
        label={question.prompt}
        variant="standard"
        fullWidth
      />
    );
  };

  const renderRadio = (question: Question) => {
    return (
      <>
        <Typography>{question.prompt}</Typography>
        <RadioGroup
          row
          name={question.name}
          value={formik.values[question.name]}
          onChange={handleRadioChange(question)}
        >
          {question.options.map((option) => (
            <FormControlLabel
              key={option.id}
              value={option.id}
              control={<Radio />}
              label={option.value}
            />
          ))}
        </RadioGroup>
      </>
    );
  };

  const inputFactory = (question: Question) => {
    switch (question.inputType) {
      case InputTypeDefinition.CHECKBOX:
        return renderCheckbox(question);
      case InputTypeDefinition.RADIO:
        return renderRadio(question);
      case InputTypeDefinition.TEXT:
        return renderTextInput(question);
      default:
        throw new Error(`Unhandled input, ${question.inputType}`);
    }
  };

  const actions = {
    renderCheckbox,
    renderTextInput,
    renderRadio,
    inputFactory,
    setFormikValues
  };

  return { actions, formik };
};

export default useFormBuilder;
