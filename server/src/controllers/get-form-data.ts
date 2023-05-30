import { Response, Request, NextFunction } from 'express';
import { ListFormData } from '../use-cases/list-form-data';
import _ from 'lodash';
import QuestionService from '../services/QuestionService';

export type GetFormDataRequestParams = any;

const makeGetFormData = ({ listFormData }: { listFormData: ListFormData }) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params = {
        productCategory: req.query.productCategory,
        formType: req.query.formType
      } as GetFormDataRequestParams;

      const formData = (await listFormData.execute(params)).map((formData) => ({
        ..._.pick(formData.question, [
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
        inputType: formData.question.inputType.name,
        questionType: formData.question.questionType.name,
        productCategory: formData.question.productCategory.name,
        value: formData.answer,
        options: QuestionService.getOptions({
          questionType: formData.question.questionType.name,
          options: formData.question.options
        }),
        interDependentQuestionsId:
          formData.question.interDependentQuestions.map(
            (interDependentQuestion) =>
              interDependentQuestion.interDependentQuestionId
          )
      }));

      res.send(formData);
    } catch (err) {
      next(err);
    }
  };
};

export default makeGetFormData;
