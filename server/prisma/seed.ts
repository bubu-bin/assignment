import {
  InputTypeDefinition,
  PrismaClient,
  ProductCategoryDefinition,
  QuestionTypeDefinition
} from '@prisma/client';
import _ from 'lodash';

const prisma = new PrismaClient();

const seeds = {
  user: {
    password: 'hashsalt',
    email: 'email@email.com',
    name: 'Flow',
    surname: 'Centrum Badawcze',
    fakeId: 1
  },
  productCategories: [
    { name: ProductCategoryDefinition.CAR_DEAL, fakeId: 1 },
    { name: ProductCategoryDefinition.VEHICLE_INSURANCE, fakeId: 2 }
  ],
  inputTypes: [
    { name: InputTypeDefinition.CHECKBOX, fakeId: 1 },
    { name: InputTypeDefinition.RADIO, fakeId: 2 },
    { name: InputTypeDefinition.TEXT, fakeId: 3 }
  ],
  questionTypes: [
    { name: QuestionTypeDefinition.BOOLEAN, fakeId: 1 },
    { name: QuestionTypeDefinition.INPUT, fakeId: 2 },
    { name: QuestionTypeDefinition.OPTION, fakeId: 3 }
  ],
  questions: [
    {
      isInterDependent: false,
      order: '1',
      prompt: 'What is your date of birth?',
      productCategoryFakeId: 2,
      questionTypeFakeId: 2,
      inputTypeFakeId: 3,
      fakeId: 1
    },
    {
      isInterDependent: false,
      order: '2',
      prompt: 'What city do you live in?',
      productCategoryFakeId: 2,
      questionTypeFakeId: 2,
      inputTypeFakeId: 3,
      fakeId: 2
    },
    {
      isInterDependent: false,
      order: '3',
      prompt: 'What is your legal address zip code?',
      productCategoryFakeId: 2,
      questionTypeFakeId: 2,
      inputTypeFakeId: 3,
      fakeId: 3
    },
    {
      isInterDependent: false,
      order: '4',
      prompt: 'What is your gender?',
      productCategoryFakeId: 2,
      questionTypeFakeId: 3,
      inputTypeFakeId: 2,
      fakeId: 4
    },
    {
      isInterDependent: false,
      order: '5',
      prompt: 'Do you have children?',
      productCategoryFakeId: 2,
      questionTypeFakeId: 1,
      inputTypeFakeId: 2,
      fakeId: 5
    },
    {
      isInterDependent: true,
      order: '5.1',
      prompt: 'Are there any additional drivers who use this vehicle?',
      productCategoryFakeId: 2,
      questionTypeFakeId: 1,
      inputTypeFakeId: 2,
      fakeId: 6
    },
    {
      isInterDependent: false,
      order: '6',
      prompt: 'When did you purchase your vehicle?',
      productCategoryFakeId: 2,
      questionTypeFakeId: 2,
      inputTypeFakeId: 3,
      fakeId: 7
    },
    {
      isInterDependent: true,
      order: '6.1',
      prompt: 'What is the current mileage of your vehicle?',
      productCategoryFakeId: 2,
      questionTypeFakeId: 2,
      inputTypeFakeId: 3,
      fakeId: 8
    },
    {
      isInterDependent: false,
      order: '7',
      prompt: 'What type of vehicle are you insuring?',
      productCategoryFakeId: 2,
      questionTypeFakeId: 3,
      inputTypeFakeId: 2,
      fakeId: 9
    },
    {
      isInterDependent: true,
      order: '7.1',
      prompt: 'How many doors does your vehicle have?',
      productCategoryFakeId: 2,
      questionTypeFakeId: 3,
      inputTypeFakeId: 2,
      fakeId: 10
    },
    {
      isInterDependent: true,
      order: '7.2',
      prompt: 'Where is the steering wheel location in your vehicle?',
      productCategoryFakeId: 2,
      questionTypeFakeId: 3,
      inputTypeFakeId: 2,
      fakeId: 11
    }
  ],
  options: [
    {
      value: 'Male',
      questionFakeId: 4,
      fakeId: 1
    },
    {
      value: 'Female',
      questionFakeId: 4,
      fakeId: 2
    },
    {
      value: 'Car',
      questionFakeId: 9,
      fakeId: 3
    },
    {
      value: 'Motorbike',
      questionFakeId: 9,
      fakeId: 4
    },
    {
      value: 'Truck',
      questionFakeId: 9,
      fakeId: 5
    },
    {
      value: '2',
      questionFakeId: 10,
      fakeId: 6
    },
    {
      value: '4',
      questionFakeId: 10,
      fakeId: 7
    },
    {
      value: '5',
      questionFakeId: 10,
      fakeId: 8
    },
    {
      value: 'Left',
      questionFakeId: 11,
      fakeId: 9
    },
    {
      value: 'Right',
      questionFakeId: 11,
      fakeId: 10
    }
  ],
  inputOutputTriggers: [
    {
      inputWhen: 1,
      outputWith: '*',
      questionTypeFakeId: 1,
      fakeId: 1
    },
    {
      inputWhen: '*',
      outputWith: '*',
      questionTypeFakeId: 1,
      fakeId: 2
    },
    {
      inputWhen: [3, 5],
      outputWith: [6, 7, 8],
      questionTypeFakeId: 3,
      fakeId: 3
    },
    {
      inputWhen: [3, 5],
      outputWith: [9, 10],
      questionTypeFakeId: 3,
      fakeId: 4
    }
  ],
  questionsOnInterDependentQuestion: [
    {
      leadingQuestionFakeId: 5,
      interDependentQuestionFakeId: 6,
      inputOutputTriggerFakeId: 1,
      fakeId: 1
    },
    {
      leadingQuestionFakeId: 7,
      interDependentQuestionFakeId: 8,
      inputOutputTriggerFakeId: 2,
      fakeId: 2
    },
    {
      leadingQuestionFakeId: 9,
      interDependentQuestionFakeId: 10,
      inputOutputTriggerFakeId: 3,
      fakeId: 3
    },
    {
      leadingQuestionFakeId: 9,
      interDependentQuestionFakeId: 11,
      inputOutputTriggerFakeId: 4,
      fakeId: 3
    }
  ]
};

async function main() {
  console.log(`Start seeding...`);

  const user = await prisma.user.create({
    data: _.omit(seeds.user, ['fakeId'])
  });
  const productCategories = await Promise.all(
    seeds.productCategories.map(async (productCategory) => {
      return {
        ...(await prisma.productCategory.create({
          data: _.omit(productCategory, ['fakeId'])
        })),
        fakeId: productCategory.fakeId
      };
    })
  );
  const inputTypes = await Promise.all(
    seeds.inputTypes.map(async (inputType) => {
      return {
        ...(await prisma.inputType.create({
          data: _.omit(inputType, ['fakeId'])
        })),
        fakeId: inputType.fakeId
      };
    })
  );
  const questionTypes = await Promise.all(
    seeds.questionTypes.map(async (questionType) => {
      return {
        ...(await prisma.questionType.create({
          data: _.omit(questionType, ['fakeId'])
        })),
        fakeId: questionType.fakeId
      };
    })
  );
  const questions = await Promise.all(
    seeds.questions.map(async (question) => {
      const data = {
        ..._.omit(question, [
          'productCategoryFakeId',
          'questionTypeFakeId',
          'inputTypeFakeId',
          'fakeId'
        ]),
        productCategoryId: productCategories.find(
          (p) => p.fakeId === question.productCategoryFakeId
        )!.id,
        inputTypeId: inputTypes.find(
          (i) => i.fakeId === question.inputTypeFakeId
        )!.id,
        questionTypeId: questionTypes.find(
          (q) => q.fakeId === question.questionTypeFakeId
        )!.id
      };

      return {
        ...(await prisma.question.create({ data })),
        fakeId: question.fakeId
      };
    })
  );
  const options = await Promise.all(
    seeds.options.map(async (option) => {
      const data = {
        ..._.omit(option, ['fakeId', 'questionFakeId']),
        questionId: questions.find((q) => q.fakeId === option.questionFakeId)!
          .id
      };

      return {
        ...(await prisma.option.create({
          data
        })),
        fakeId: option.fakeId
      };
    })
  );
  const inputOutputTriggers = await Promise.all(
    seeds.inputOutputTriggers.map(async (inputOutputTrigger) => {
      let inputWhen: unknown;
      let outputWith: unknown;

      const questionType = questionTypes.find(
        (q) => q.fakeId === inputOutputTrigger.questionTypeFakeId
      )!.name;

      if (questionType === QuestionTypeDefinition.OPTION) {
        inputWhen = options
          .filter((o) =>
            (inputOutputTrigger.inputWhen as number[]).includes(o.fakeId)
          )
          .map((o) => o.id);

        outputWith = options
          .filter((o) =>
            (inputOutputTrigger.outputWith as number[]).includes(o.fakeId)
          )
          .map((o) => o.id);
      } else {
        inputWhen = inputOutputTrigger.inputWhen;
        outputWith = inputOutputTrigger.outputWith;
      }

      return {
        ...(await prisma.inputOutputTrigger.create({
          data: {
            inputWhen: JSON.stringify(inputWhen),
            outputWith: JSON.stringify(outputWith)
          }
        })),
        fakeId: inputOutputTrigger.fakeId
      };
    })
  );

  const questionsOnInterDependentQuestion = await Promise.all(
    seeds.questionsOnInterDependentQuestion.map(async (qoidq) => {
      const data = {
        leadingQuestionId: questions.find(
          (q) => q.fakeId === qoidq.leadingQuestionFakeId
        )!.id,
        interDependentQuestionId: questions.find(
          (q) => q.fakeId === qoidq.interDependentQuestionFakeId
        )!.id,
        inputOutputTriggerId: inputOutputTriggers.find(
          (t) => t.fakeId === qoidq.inputOutputTriggerFakeId
        )!.id
      };

      return {
        ...(await prisma.questionsOnInterDependentQuestions.create({ data })),
        fakeId: qoidq.fakeId
      };
    })
  );

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
