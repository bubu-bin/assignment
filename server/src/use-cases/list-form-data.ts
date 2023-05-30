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

    let formData = await repository.formDataStore.findMany({
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

    return await Promise.all(
      formData.map(async (f) => {
        const { question } = f;

        const interDependentQuestions =
          await repository.questionStore.findInterDependentQuestions({
            where: {
              leadingQuestionId: f.question.id
            }
          });

        let options = f.question.options;

        if (
          question.isInterDependent &&
          question.questionType.name === QuestionTypeDefinition.OPTION
        ) {
          // TODO: Refactor getOutput method
          const output = await QuestionService.getOutput({
            repository,
            formId: form.id,
            interDependentQuestionId: question.id
          });

          options = options.filter((option) => output.includes(option.id));
        }

        return {
          ...f,
          question: {
            ...f.question,
            options,
            interDependentQuestions
          }
        };
      })
    );
  };

  return { execute };
};

export default makeListFormData;

export type ListFormData = ReturnType<typeof makeListFormData>;
