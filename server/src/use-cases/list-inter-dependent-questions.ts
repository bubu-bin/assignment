import { Option, QuestionTypeDefinition } from '@prisma/client';
import { GetInterDependentQuestionsQuery } from '../controllers/get-inter-dependent-questions';
import { Repository } from '../repository';
import _ from 'lodash';

const makeListInterDependentQuestions = ({
  repository
}: {
  repository: Repository;
}) => {
  const execute = async (query: GetInterDependentQuestionsQuery) => {
    const interDependentQuestions =
      await repository.questionStore.findInterDependentQuestions({
        leadingQuestionId: +query.questionId
      });

    let answer = JSON.parse(query.value);

    const passed = interDependentQuestions.filter((interDependentQuestion) => {
      const { leadingQuestion, inputOutputTrigger } = interDependentQuestion;

      if (!inputOutputTrigger) return false;

      const inputWhen = JSON.parse(inputOutputTrigger!.inputWhen as string);

      const checkWhenCondition = (questionType: QuestionTypeDefinition) => {
        switch (questionType) {
          case 'OPTION':
            if (!Array.isArray(answer)) {
              answer = [answer];
            }
            return answer.some((a: string) =>
              inputWhen.map(String).includes(String(a))
            );
          case 'BOOLEAN':
            return String(answer) === String(inputWhen);
          case 'INPUT':
            if (inputWhen === '*') return true;
            return String(answer) === String(inputWhen);
        }
      };

      return checkWhenCondition(leadingQuestion.questionType.name);
    });

    const result = passed.map((p) => {
      const { interDependentQuestion, inputOutputTrigger } = p;

      const outputWith = JSON.parse(inputOutputTrigger!.outputWith as string);

      const getOptions = (questionType: QuestionTypeDefinition) => {
        switch (questionType) {
          case 'OPTION':
            return interDependentQuestion.options
              .filter((option) => outputWith.includes(option.id))
              .map((option) => _.omit(option, ['questionId']));
          case 'BOOLEAN':
            return [
              { id: 1, value: 'Yes' },
              { id: 0, value: 'No' }
            ];
          case 'INPUT':
            return null;
          default:
            'Unhandled action';
        }
      };

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
        options: getOptions(interDependentQuestion.questionType.name),
        interDependentQuestionsId:
          interDependentQuestion.interDependentQuestions.map(
            (interDependentQuestion) => interDependentQuestion.id
          )
      };
    });

    const groupedQuestions = _.groupBy(result, 'id');

    const mergedQuestions = Object.values(groupedQuestions).map((questions) => {
      const mergedOptions = questions.reduce(
        (options: Omit<Option, 'questionId'>[], question) => {
          if (question.options) {
            options = [...options, ...question.options];
          }
          return options;
        },
        []
      );

      const mergedQuestion = {
        ...questions[0],
        options: mergedOptions
      };

      return mergedQuestion;
    });

    return mergedQuestions;
  };

  return { execute };
};

export default makeListInterDependentQuestions;

export type ListInterDependentQuestions = ReturnType<
  typeof makeListInterDependentQuestions
>;
