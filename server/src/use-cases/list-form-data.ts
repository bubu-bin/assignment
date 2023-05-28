import { USER_ID } from '..';
import { GetFormDataRequestParams } from '../controllers/get-form-data';
import { Repository } from '../repository';

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
            productCategory: true,
            interDependentQuestions: true
          }
        }
      }
    });

    // TODO: if not found return NULL, now is error which needs to be handled
    return formData;
  };

  return { execute };
};

export default makeListFormData;

export type ListFormData = ReturnType<typeof makeListFormData>;
