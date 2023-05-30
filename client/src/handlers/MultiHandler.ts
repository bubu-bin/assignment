import _ from 'lodash';
import { Question, QuestionWithAnswer, Option } from '../api/types';

export class MultiHandler {
  private questions: QuestionWithAnswer[];
  private leadingQuestion: Question;
  private interDependentQuestions: QuestionWithAnswer[];
  private interDependentQuestionId!: number;

  constructor(
    questions: QuestionWithAnswer[],
    leadingQuestion: Question,
    interDependentQuestions: QuestionWithAnswer[]
  ) {
    this.questions = questions;
    this.leadingQuestion = leadingQuestion;
    this.interDependentQuestions = interDependentQuestions;
  }

  private newQuestionsAreEmpty() {
    return this.interDependentQuestions.length === 0;
  }

  private newQuestionIsDuplicated() {
    return this.interDependentQuestionId !== -1;
  }

  private removeInterDependentQuestionFromQuestions() {
    return this.questions.filter(
      (d) => !this.leadingQuestion.interDependentQuestionsId.includes(d.id)
    );
  }

  private extractInterDependentQuestionIndexPos() {
    this.interDependentQuestionId = this.questions.findIndex((question) =>
      this.interDependentQuestions
        .map((interDependentQuestion) => interDependentQuestion.id)
        .includes(question.id)
    );
  }

  private mergeInterDependentQuestionIntoQuestions() {
    return [...this.questions, ...this.interDependentQuestions];
  }

  private replaceInterDependentQuestion() {
    return [
      {
        ...this.questions[this.interDependentQuestionId],
        options: this.interDependentQuestions[0].options
      },
      ...this.questions.filter((d, i) => i !== this.interDependentQuestionId)
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

  getPayload(): QuestionWithAnswer[] {
    if (this.newQuestionsAreEmpty()) {
      return this.removeInterDependentQuestionFromQuestions();
    }

    this.mergeInterDependentQuestions();

    this.extractInterDependentQuestionIndexPos();

    if (this.newQuestionIsDuplicated()) {
      return this.replaceInterDependentQuestion();
    }

    return this.mergeInterDependentQuestionIntoQuestions();
  }
}
