import { GetInterDependentQuestionsQuery } from '../controllers/get-inter-dependent-questions';
import { Repository } from '../repository';
import _ from 'lodash';
import QuestionService from '../services/QuestionService';

const makeListInterDependentQuestions = ({
  repository
}: {
  repository: Repository;
}) => {
  const execute = async (query: GetInterDependentQuestionsQuery) => {
    const interDependentQuestions =
      await repository.questionStore.findInterDependentQuestions({
        where: {
          leadingQuestionId: +query.questionId
        }
      });

    const answer = JSON.parse(query.value);

    const passedInterDependentQuestions = interDependentQuestions.filter(
      (interDependentQuestion) => {
        const { leadingQuestion, inputOutputTrigger } = interDependentQuestion;

        if (!inputOutputTrigger) return false;

        return QuestionService.checkCondition({
          answer,
          questionType: leadingQuestion.questionType.name,
          conditionToFulfill: JSON.parse(inputOutputTrigger.inputWhen as string)
        });
      }
    );

    return passedInterDependentQuestions;
  };

  return { execute };
};

export default makeListInterDependentQuestions;

export type ListInterDependentQuestions = ReturnType<
  typeof makeListInterDependentQuestions
>;
