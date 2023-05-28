import { Response, Request, NextFunction } from 'express';
import { ListFormData } from '../use-cases/list-form-data';
import {
  FormData,
  Question,
  Option,
  InputType,
  QuestionType,
  ProductCategory,
  QuestionsOnInterDependentQuestions
} from '@prisma/client';
import _ from 'lodash';

export type GetFormDataRequestParams = any;

type FormatterData = FormData & {
  question: Question & {
    productCategory: ProductCategory;
    inputType: InputType;
    questionType: QuestionType;
    options: Option[];
    interDependentQuestions: QuestionsOnInterDependentQuestions[];
  };
};

const formatter = (data: FormatterData) => {
  const { question } = data;
  let value: unknown;
  let options: unknown;

  switch (question.questionType.name) {
    case 'OPTION':
      options = question.options.map((option) =>
        _.omit(option, ['questionId'])
      );
      break;
    case 'BOOLEAN':
      options = [
        { id: 1, value: 'Yes' },
        { id: 0, value: 'No' }
      ];
      break;
    case 'INPUT':
      options = null;
      break;
    default:
      'Unhandled action';
  }

  return {
    ..._.pick(question, [
      'isInterDependent',
      'order',
      'prompt',
      'createdAt',
      'updatedAt',
      'id',
      'name',
      'placeholder',
      'textFieldType',
      'isMulti'
    ]),
    inputType: question.inputType.name,
    questionType: question.questionType.name,
    productCategory: question.productCategory.name,
    value: data.answer,
    options: options,
    interDependentQuestionsId: question.interDependentQuestions.map(
      (interDependentQuestion) =>
        interDependentQuestion.interDependentQuestionId
    )
  };
};

const makeGetFormData = ({ listFormData }: { listFormData: ListFormData }) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params = {
        productCategory: req.query.productCategory,
        formType: req.query.formType
      } as GetFormDataRequestParams;

      const result = (await listFormData.execute(params)).map((r) =>
        formatter(r)
      );

      res.send(result);
    } catch (err) {
      next(err);
    }
  };
};

export default makeGetFormData;
