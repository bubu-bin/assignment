import { Response, Request, NextFunction } from 'express';
import { ListQuestions } from '../use-cases/list-questions';
import _ from 'lodash';
import {
  Question,
  InputType,
  Option,
  QuestionType,
  ProductCategoryDefinition,
  FormTypeDefinition
} from '@prisma/client';

// TODO: fast function to get options. Should be somewhere else
const getOptions = (
  question: Question & {
    inputType: InputType;
    options: Option[];
    questionType: QuestionType;
  }
) => {
  switch (question.questionType.name) {
    case 'OPTION':
      return question.options.map((o) => _.omit(o, ['questionId']));
    case 'BOOLEAN':
      return [
        { id: 1, value: 'Yes' },
        { id: 0, value: 'No' }
      ];
    case 'INPUT':
      return null;
  }
};

export type GetQuestionsRequestParams = {
  productCategory: ProductCategoryDefinition;
  formType: FormTypeDefinition;
};

const makeGetQuestions = ({
  listQuestions
}: {
  listQuestions: ListQuestions;
}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params = {
        productCategory: req.query.productCategory,
        formType: req.query.formType
      } as GetQuestionsRequestParams;

      const result = await listQuestions.execute(params);

      // TODO: different handling for formatters
      // TODO: optimize later the hasInter...
      const format = result
        ?.map((r) => ({
          ..._.pick(r, [
            'id',
            'isInterDependent',
            'order',
            'prompt',
            'createdAt',
            'updatedAt',
            'name',
            'placeholder',
            'textFieldType',
            'isMulti',
            'interDependentQuestionsId'
          ]),
          inputType: r.inputType.name,
          options: getOptions(r)
        }))
        .filter((r) => !r.isInterDependent);

      res.send(format);
    } catch (err) {
      next(err);
    }
  };
};

export default makeGetQuestions;
