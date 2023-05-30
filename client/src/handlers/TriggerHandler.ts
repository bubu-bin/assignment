import _ from 'lodash';
import { Question, QuestionWithAnswer, Option } from '../api/types';

export class TriggerHandler {
  private leadingQuestion: Question;
  private questionnaireData: QuestionWithAnswer[];
  private interDependentQuestions: QuestionWithAnswer[];

  constructor({
    leadingQuestion,
    questionnaireData,
    interDependentQuestions
  }: {
    leadingQuestion: Question;
    questionnaireData: QuestionWithAnswer[];
    interDependentQuestions: QuestionWithAnswer[];
  }) {
    this.leadingQuestion = leadingQuestion;
    this.questionnaireData = questionnaireData;
    this.interDependentQuestions = interDependentQuestions;
  }

  static stopCall({ leadingQuestion }: { leadingQuestion: Question }) {
    const hasInterDependentQuestion =
      leadingQuestion.interDependentQuestionsId.length > 0;

    return !hasInterDependentQuestion;
  }

  private fetchedDataIsEmpty() {
    return this.interDependentQuestions.length === 0;
  }

  private removeInterDependentQuestionFromQuestions() {
    return this.questionnaireData.filter(
      (d) => !this.leadingQuestion.interDependentQuestionsId.includes(d.id)
    );
  }

  private addInterDependentQuestionIntoData() {
    return [...this.questionnaireData, ...this.interDependentQuestions];
  }

  private replaceInterDependentQuestion(interDependentQuestionId: number) {
    return [
      {
        ...this.questionnaireData[interDependentQuestionId],
        options: this.interDependentQuestions[0].options
      },
      ...this.questionnaireData.filter(
        (_d, i) => i !== interDependentQuestionId
      )
    ];
  }

  private mergeInterDependentQuestions() {
    const groupedQuestions = _.groupBy(this.interDependentQuestions, 'id');

    this.interDependentQuestions = Object.values(groupedQuestions).map(
      (questions) => {
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
      }
    );
  }

  findInterDependentQuestionIndex() {
    return this.questionnaireData.findIndex((record) =>
      this.interDependentQuestions
        .map((interDependentQuestion) => interDependentQuestion.id)
        .includes(record.id)
    );
  }

  private isDuplicate(interDependentQuestionId: number) {
    return interDependentQuestionId !== -1;
  }

  private handleMultiQuestion() {
    this.mergeInterDependentQuestions();

    const interDependentQuestionId = this.findInterDependentQuestionIndex();

    if (this.isDuplicate(interDependentQuestionId)) {
      return this.replaceInterDependentQuestion(interDependentQuestionId);
    }

    return this.addInterDependentQuestionIntoData();
  }

  getPayload() {
    if (this.fetchedDataIsEmpty()) {
      return this.removeInterDependentQuestionFromQuestions();
    }

    if (this.leadingQuestion.isMulti) {
      return this.handleMultiQuestion();
    }

    const interDependentQuestionId = this.findInterDependentQuestionIndex();

    if (this.isDuplicate(interDependentQuestionId)) return null;
    return this.addInterDependentQuestionIntoData();
  }
}
