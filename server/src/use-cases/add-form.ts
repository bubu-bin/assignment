import { USER_ID } from '..';
import { PostFormBody } from '../controllers/post-form';
import { Repository } from '../repository';
import _ from 'lodash';

const makeAddForm = ({ repository }: { repository: Repository }) => {
  const execute = async ({ data }: { data: PostFormBody }) => {
    const formDataValues = _.omit(data, ['productCategory', 'formType']);

    const productCategory = await repository.productCategoryStore.find({
      where: { name: data.productCategory }
    });

    const formType = await repository.formStore.findFormType({
      where: { name: data.formType }
    });

    const formData = await Promise.all(
      Object.entries(formDataValues).map(async ([questionName, answer]) => {
        const question = await repository.questionStore.find({
          where: { name: questionName }
        });

        return {
          questionId: question.id,
          answer
        };
      })
    );

    const newForm = await repository.formStore.create({
      data: {
        userId: USER_ID,
        formTypeId: formType.id,
        productCategoryId: productCategory.id,
        formData: {
          create: formData
        }
      }
    });

    return newForm;
  };

  return { execute };
};

export default makeAddForm;

export type AddForm = ReturnType<typeof makeAddForm>;
