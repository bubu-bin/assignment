import { Option, QuestionTypeDefinition } from '@prisma/client';
import _ from 'lodash';
import { Repository } from '../repository';

export default class QuestionService {
  static getOptions = ({
    questionType,
    options
  }: {
    questionType: QuestionTypeDefinition;
    options: Option[];
  }) => {
    switch (questionType) {
      case 'OPTION':
        return options.map((o) => _.omit(o, ['questionId']));
      case 'BOOLEAN':
        return [
          { id: 1, value: 'Yes' },
          { id: 0, value: 'No' }
        ];
      case 'INPUT':
        return null;
    }
  };

  static checkCondition = ({
    answer,
    questionType,
    conditionToFulfill
  }: {
    answer: any;
    questionType: QuestionTypeDefinition;
    conditionToFulfill: any;
  }) => {
    switch (questionType) {
      case 'OPTION':
        if (!Array.isArray(answer)) {
          answer = [answer];
        }
        return answer.some((a: string) =>
          conditionToFulfill.map(String).includes(String(a))
        );
      case 'BOOLEAN':
        return String(answer) === String(conditionToFulfill);
      case 'INPUT':
        if (conditionToFulfill === '*') return true;
        return String(answer) === String(conditionToFulfill);
    }
  };

  static getOutput = async ({
    repository,
    interDependentQuestionId,
    formId
  }: {
    repository: Repository;
    interDependentQuestionId: number;
    formId: number;
  }) => {
    const questionOnInterDependentQuestions =
      await repository.questionStore.findInterDependentQuestions({
        where: {
          interDependentQuestionId
        }
      });

    const leadingQuestion = await repository.questionStore.find({
      where: {
        id: questionOnInterDependentQuestions[0].leadingQuestionId
      }
    });

    const leadingQuestionAnswer = (
      await repository.formDataStore.find({
        where: {
          questionId: leadingQuestion.id,
          formId
        },
        include: {
          question: true
        }
      })
    )?.answer;

    if (leadingQuestion.isMulti) {
      return questionOnInterDependentQuestions
        .filter((interDependentQuestion) => {
          const { leadingQuestion, inputOutputTrigger } =
            interDependentQuestion;

          if (!inputOutputTrigger) return false;

          return QuestionService.checkCondition({
            answer: leadingQuestionAnswer,
            questionType: leadingQuestion.questionType.name,
            conditionToFulfill: JSON.parse(
              inputOutputTrigger.inputWhen as string
            )
          });
        })
        .map((interDependentQuestion) => {
          return JSON.parse(
            interDependentQuestion.inputOutputTrigger?.outputWith as any
          );
        })
        .flatMap((i) => i);
    }

    return [];
  };
}
