import _ from 'lodash';
import { USER_ID } from '..';
import { PatchFormBody } from '../controllers/patch-form';
import { Repository } from '../repository';

const makeEditForm = ({ repository }: { repository: Repository }) => {
  const execute = async (data: PatchFormBody) => {
    const formDataValues = _.omit(data, ['productCategory', 'formType']);

    const form = await repository.formStore.find({
      where: {
        formType: {
          name: data.formType
        },
        productCategory: {
          name: data.productCategory
        },
        userId: USER_ID
      },
      include: undefined
    });

    const updatedFormData = await Promise.all(
      Object.entries(formDataValues).map(async ([questionName, answer]) => {
        const question = await repository.questionStore.find({
          where: {
            name: questionName
          }
        });

        const formData = await repository.formDataStore.find({
          where: {
            questionId: question.id,
            formId: form.id
          },
          include: undefined
        });

        if (!formData) {
          const question = await repository.questionStore.find({
            where: { name: questionName }
          });

          return await repository.formDataStore.create({
            data: {
              answer,
              questionId: question.id,
              formId: form.id
            }
          });
        }

        return await repository.formDataStore.update({
          where: {
            id: formData.id
          },
          data: {
            answer
          }
        });
      })
    );

    return updatedFormData;
  };

  return { execute };
};

export default makeEditForm;

export type EditForm = ReturnType<typeof makeEditForm>;
