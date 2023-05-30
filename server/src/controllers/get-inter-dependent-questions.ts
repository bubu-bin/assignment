import { Response, Request, NextFunction } from 'express';
import { ListInterDependentQuestions } from '../use-cases/list-inter-dependent-questions';
import _ from 'lodash';
import QuestionService from '../services/QuestionService';

export type GetInterDependentQuestionsQuery = {
  questionId: string;
  value: string;
};

const makeGetInterDependentQuestions = ({
  listInterDependentQuestions
}: {
  listInterDependentQuestions: ListInterDependentQuestions;
}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query as GetInterDependentQuestionsQuery;

      const interDependentQuestions = (
        await listInterDependentQuestions.execute(query)
      ).map((questionOnInterDependentQuestions) => {
        const { interDependentQuestion, inputOutputTrigger } =
          questionOnInterDependentQuestions;

        const outputWith = JSON.parse(inputOutputTrigger!.outputWith as string);

        return {
          ..._.pick(interDependentQuestion, [
            'id',
            'isInterDependent',
            'order',
            'prompt',
            'createdAt',
            'updatedAt',
            'name',
            'placeholder',
            'textFieldType',
            'isMulti'
          ]),
          inputType: interDependentQuestion.inputType.name,
          options: QuestionService.getOptions({
            questionType: interDependentQuestion.questionType.name,
            options: interDependentQuestion.options.filter((option) =>
              outputWith.includes(option.id)
            )
          }),
          interDependentQuestionsId:
            interDependentQuestion.interDependentQuestions.map(
              (interDependentQuestion) => interDependentQuestion.id
            ),
          order: Number(interDependentQuestion.order)
        };
      });

      res.send(interDependentQuestions);
    } catch (err) {
      next(err);
    }
  };
};

export default makeGetInterDependentQuestions;
