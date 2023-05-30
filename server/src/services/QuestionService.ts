import {
  InputOutputTrigger,
  Option,
  QuestionTypeDefinition
} from '@prisma/client';
import _ from 'lodash';

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
    inputOutputTrigger
  }: {
    answer: any;
    questionType: QuestionTypeDefinition;
    inputOutputTrigger: InputOutputTrigger;
  }) => {
    const inputWhen = JSON.parse(inputOutputTrigger!.inputWhen as string);

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
}
