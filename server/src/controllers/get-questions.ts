import { Response, Request, NextFunction } from 'express';
import { ListQuestions } from '../use-cases/list-questions';
import _ from 'lodash';
import { ProductCategoryDefinition, FormTypeDefinition } from '@prisma/client';
import QuestionService from '../services/QuestionService';

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

      const questions = (await listQuestions.execute(params))
        .map((question) => ({
          ..._.pick(question, [
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
          inputType: question.inputType.name,
          options: QuestionService.getOptions({
            questionType: question.questionType.name,
            options: question.options
          })
        }))
        .filter((question) => !question.isInterDependent);

      res.send(questions);
    } catch (err) {
      next(err);
    }
  };
};

export default makeGetQuestions;
