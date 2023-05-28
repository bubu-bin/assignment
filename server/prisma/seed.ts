import {
  FormTypeDefinition,
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
  formTypes: [
    { name: FormTypeDefinition.PURCHASE, fakeId: 1 },
    { name: FormTypeDefinition.SEARCH, fakeId: 2 }
  ],
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
      fakeId: 1,
      name: 'birthDate',
      formTypeFakeId: 2,
      textFieldType: 'text',
      isMulti: null
    },
    {
      isInterDependent: false,
      order: '2',
      prompt: 'What city do you live in?',
      productCategoryFakeId: 2,
      questionTypeFakeId: 2,
      inputTypeFakeId: 3,
      fakeId: 2,
      name: 'city',
      formTypeFakeId: 2,
      textFieldType: 'text',
      isMulti: null
    },
    {
      isInterDependent: false,
      order: '3',
      prompt: 'What is your legal address zip code?',
      productCategoryFakeId: 2,
      questionTypeFakeId: 2,
      inputTypeFakeId: 3,
      fakeId: 3,
      name: 'zipCode',
      formTypeFakeId: 2,
      textFieldType: 'text',
      isMulti: null
    },
    {
      isInterDependent: false,
      order: '4',
      prompt: 'What is your gender?',
      productCategoryFakeId: 2,
      questionTypeFakeId: 3,
      inputTypeFakeId: 2,
      fakeId: 4,
      name: 'gender',
      formTypeFakeId: 2,
      textFieldType: null,
      isMulti: false
    },
    {
      isInterDependent: false,
      order: '5',
      prompt: 'Do you have children?',
      productCategoryFakeId: 2,
      questionTypeFakeId: 1,
      inputTypeFakeId: 2,
      fakeId: 5,
      name: 'children',
      formTypeFakeId: 2,
      textFieldType: null,
      isMulti: false
    },
    {
      isInterDependent: true,
      order: '6',
      prompt: 'Are there any additional drivers who use this vehicle?',
      productCategoryFakeId: 2,
      questionTypeFakeId: 1,
      inputTypeFakeId: 2,
      fakeId: 6,
      name: 'additionalDrivers',
      formTypeFakeId: 2,
      textFieldType: null,
      isMulti: false
    },
    {
      isInterDependent: false,
      order: '7',
      prompt: 'When did you purchase your vehicle?',
      productCategoryFakeId: 2,
      questionTypeFakeId: 2,
      inputTypeFakeId: 3,
      fakeId: 7,
      name: 'vehiclePurchase',
      formTypeFakeId: 2,
      textFieldType: 'text',
      isMulti: null
    },
    {
      isInterDependent: true,
      order: '8',
      prompt: 'What is the current mileage of your vehicle?',
      productCategoryFakeId: 2,
      questionTypeFakeId: 2,
      inputTypeFakeId: 3,
      fakeId: 8,
      name: 'currentMileage',
      formTypeFakeId: 2,
      textFieldType: 'number',
      isMulti: null
    },
    {
      isInterDependent: false,
      order: '9',
      prompt: 'What type of vehicle are you insuring?',
      productCategoryFakeId: 2,
      questionTypeFakeId: 3,
      inputTypeFakeId: 2,
      fakeId: 9,
      name: 'vehicleType',
      formTypeFakeId: 2,
      textFieldType: null,
      isMulti: false
    },
    {
      isInterDependent: true,
      order: '10',
      prompt: 'How many doors does your vehicle have?',
      productCategoryFakeId: 2,
      questionTypeFakeId: 3,
      inputTypeFakeId: 2,
      fakeId: 10,
      name: 'vehicleDoors',
      formTypeFakeId: 2,
      textFieldType: null,
      isMulti: false
    },
    {
      isInterDependent: true,
      order: '11',
      prompt: 'Where is the steering wheel location in your vehicle?',
      productCategoryFakeId: 2,
      questionTypeFakeId: 3,
      inputTypeFakeId: 2,
      fakeId: 11,
      name: 'steeringWheelLocation',
      formTypeFakeId: 2,
      textFieldType: null,
      isMulti: false
    },
    {
      isInterDependent: false,
      order: '1',
      prompt:
        'Are you looking for a new car, a used car, or are you open to both?',
      productCategoryFakeId: 1,
      questionTypeFakeId: 3,
      inputTypeFakeId: 2,
      fakeId: 12,
      name: 'carLife',
      formTypeFakeId: 2,
      textFieldType: null,
      isMulti: false
    },
    {
      isInterDependent: false,
      order: '2',
      prompt: 'What is your budget range for purchasing the car?',
      productCategoryFakeId: 1,
      questionTypeFakeId: 3,
      inputTypeFakeId: 2,
      fakeId: 13,
      name: 'budgetRange',
      formTypeFakeId: 2,
      textFieldType: null,
      isMulti: false
    },
    {
      isInterDependent: false,
      order: '3',
      prompt: 'Which manufacturers are you interested in?',
      productCategoryFakeId: 1,
      questionTypeFakeId: 3,
      inputTypeFakeId: 1,
      fakeId: 14,
      name: 'manufacturers',
      formTypeFakeId: 2,
      textFieldType: null,
      isMulti: true
    },
    {
      isInterDependent: true,
      order: '4',
      prompt: 'Which car model are you interested in?',
      productCategoryFakeId: 1,
      questionTypeFakeId: 3,
      inputTypeFakeId: 2,
      fakeId: 15,
      name: 'carModel',
      formTypeFakeId: 2,
      textFieldType: null,
      isMulti: false
    },
    {
      isInterDependent: false,
      order: '5',
      prompt: 'Do you prefer a certain type of transmission?',
      productCategoryFakeId: 1,
      questionTypeFakeId: 3,
      inputTypeFakeId: 2,
      fakeId: 16,
      name: 'transmissionType',
      formTypeFakeId: 2,
      textFieldType: null,
      isMulti: false
    },
    {
      isInterDependent: false,
      order: '6',
      prompt: 'Which production year are you looking for?',
      productCategoryFakeId: 1,
      questionTypeFakeId: 2,
      inputTypeFakeId: 3,
      fakeId: 18,
      name: 'productionYear',
      formTypeFakeId: 2,
      textFieldType: 'number',
      isMulti: null
    },
    {
      isInterDependent: false,
      order: '7',
      prompt: 'Are you looking for a car within a specific area or city?',
      productCategoryFakeId: 1,
      questionTypeFakeId: 3,
      inputTypeFakeId: 2,
      fakeId: 19,
      name: 'specificAreaOrCity',
      formTypeFakeId: 2,
      textFieldType: null,
      isMulti: false
    },
    {
      isInterDependent: false,
      order: '8',
      prompt:
        'Are there any specific features you want in the car? (You can select multiple)',
      productCategoryFakeId: 1,
      questionTypeFakeId: 3,
      inputTypeFakeId: 1,
      fakeId: 20,
      name: 'specificFeatures',
      formTypeFakeId: 2,
      textFieldType: null,
      isMulti: true
    },
    {
      isInterDependent: false,
      order: '9',
      prompt: 'Do you have a preferred color for your car?',
      productCategoryFakeId: 1,
      questionTypeFakeId: 3,
      inputTypeFakeId: 2,
      fakeId: 21,
      name: 'preferredColor',
      formTypeFakeId: 2,
      textFieldType: null,
      isMulti: false
    },
    {
      isInterDependent: false,
      order: '10',
      prompt: 'How many doors do you prefer your car to have?',
      productCategoryFakeId: 1,
      questionTypeFakeId: 3,
      inputTypeFakeId: 2,
      fakeId: 22,
      name: 'preferDoors',
      formTypeFakeId: 2,
      textFieldType: null,
      isMulti: false
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
    },
    {
      value: 'New',
      questionFakeId: 12,
      fakeId: 11
    },
    {
      value: 'Used',
      questionFakeId: 12,
      fakeId: 12
    },
    {
      value: 'Both',
      questionFakeId: 12,
      fakeId: 13
    },
    {
      value: '10000 - 20000 zł',
      questionFakeId: 13,
      fakeId: 14
    },
    {
      value: '20000 - 30000 zł',
      questionFakeId: 13,
      fakeId: 15
    },
    {
      value: '> 30000 zł',
      questionFakeId: 13,
      fakeId: 16
    },
    {
      value: 'Toyota',
      questionFakeId: 14,
      fakeId: 17
    },
    {
      value: 'Ford',
      questionFakeId: 14,
      fakeId: 18
    },
    {
      value: 'BMW',
      questionFakeId: 14,
      fakeId: 19
    },
    {
      value: 'Camry',
      questionFakeId: 15,
      fakeId: 20
    },
    {
      value: 'Mustang',
      questionFakeId: 15,
      fakeId: 21
    },
    {
      value: 'X5',
      questionFakeId: 15,
      fakeId: 22
    },
    {
      value: 'Automatic',
      questionFakeId: 16,
      fakeId: 23
    },
    {
      value: 'Manual',
      questionFakeId: 16,
      fakeId: 24
    },
    {
      value: 'Navigiation System',
      questionFakeId: 20,
      fakeId: 27
    },
    {
      value: 'Sunroof',
      questionFakeId: 20,
      fakeId: 28
    },
    {
      value: 'Leather Seats',
      questionFakeId: 20,
      fakeId: 29
    },
    {
      value: 'Backup Camera',
      questionFakeId: 20,
      fakeId: 30
    },
    {
      value: 'Red',
      questionFakeId: 21,
      fakeId: 31
    },
    {
      value: 'Black',
      questionFakeId: 21,
      fakeId: 32
    },
    {
      value: 'Green',
      questionFakeId: 21,
      fakeId: 33
    },
    {
      value: '2',
      questionFakeId: 22,
      fakeId: 33
    },
    {
      value: '4',
      questionFakeId: 22,
      fakeId: 34
    },
    {
      value: '5',
      questionFakeId: 22,
      fakeId: 35
    },
    {
      value: 'Specific area',
      questionFakeId: 19,
      fakeId: 35
    },
    {
      value: 'City',
      questionFakeId: 19,
      fakeId: 35
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
      questionTypeFakeId: 2,
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
    },
    {
      inputWhen: [17],
      outputWith: [20],
      questionTypeFakeId: 3,
      fakeId: 5
    },
    {
      inputWhen: [18],
      outputWith: [21],
      questionTypeFakeId: 3,
      fakeId: 6
    },
    {
      inputWhen: [19],
      outputWith: [22],
      questionTypeFakeId: 3,
      fakeId: 7
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
      fakeId: 4
    },
    {
      leadingQuestionFakeId: 14,
      interDependentQuestionFakeId: 15,
      inputOutputTriggerFakeId: 5,
      fakeId: 5
    },
    {
      leadingQuestionFakeId: 14,
      interDependentQuestionFakeId: 15,
      inputOutputTriggerFakeId: 6,
      fakeId: 6
    },
    {
      leadingQuestionFakeId: 14,
      interDependentQuestionFakeId: 15,
      inputOutputTriggerFakeId: 7,
      fakeId: 7
    }
  ]
};

async function main() {
  console.log(`Start seeding...`);

  const user = await prisma.user.create({
    data: _.omit(seeds.user, ['fakeId'])
  });
  const formTypes = await Promise.all(
    seeds.formTypes.map(async (formType) => {
      return {
        ...(await prisma.formType.create({
          data: _.omit(formType, ['fakeId'])
        })),
        fakeId: formType.fakeId
      };
    })
  );
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
          'fakeId',
          'formTypeFakeId'
        ]),
        productCategoryId: productCategories.find(
          (p) => p.fakeId === question.productCategoryFakeId
        )!.id,
        inputTypeId: inputTypes.find(
          (i) => i.fakeId === question.inputTypeFakeId
        )!.id,
        questionTypeId: questionTypes.find(
          (q) => q.fakeId === question.questionTypeFakeId
        )!.id,
        formTypeId: formTypes.find((f) => f.fakeId === question.formTypeFakeId)!
          .id
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
