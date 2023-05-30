import { QuestionTypeDefinition } from '@prisma/client';
import { USER_ID } from '..';
import { GetFormDataRequestParams } from '../controllers/get-form-data';
import { Repository } from '../repository';
import QuestionService from '../services/QuestionService';

const makeListFormData = ({ repository }: { repository: Repository }) => {
  const execute = async (params: GetFormDataRequestParams) => {
    const form = await repository.formStore.find({
      where: {
        formType: {
          name: params.formType
        },
        productCategory: {
          name: params.productCategory
        },
        userId: USER_ID
      },
      include: undefined
    });

    const formData = await repository.formDataStore.findMany({
      where: {
        formId: form.id
      },
      include: {
        question: {
          include: {
            inputType: true,
            questionType: true,
            options: true,
            productCategory: true
          }
        }
      }
    });

    const formDataWithInterDependentQuestions = await Promise.all(
      formData.map(async (formData) => {
        const { question } = formData;

        const interDependentQuestions =
          await repository.questionStore.findInterDependentQuestions({
            where: {
              leadingQuestionId: question.id
            }
          });

        return {
          ...formData,
          question: {
            ...question,
            interDependentQuestions
          }
        };
      })
    );

    // TODO: Refactor this logic to many nesting
    return await Promise.all(
      formDataWithInterDependentQuestions.map(async (formData) => {
        const { question } = formData;

        let options = question.options;

        if (
          question.isInterDependent &&
          question.questionType.name === QuestionTypeDefinition.OPTION
        ) {
          const leadingQuestionWithAnswer =
            await QuestionService.getLeadingQuestionWithAnswer({
              repository,
              formId: form.id,
              interDependentQuestionId: question.id
            });

          if (leadingQuestionWithAnswer.isMulti) {
            const passedOptions = await QuestionService.getPassedMultiOptions({
              repository,
              interDependentQuestionId: question.id,
              leadingQuestionAnswer: leadingQuestionWithAnswer.value
            });

            options = options.filter((option) =>
              passedOptions.includes(option.id)
            );
          }
        }

        return {
          ...formData,
          question: {
            ...question,
            options
          }
        };
      })
    );
  };

  return { execute };
};

export default makeListFormData;

export type ListFormData = ReturnType<typeof makeListFormData>;
