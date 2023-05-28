import { USER_ID } from '..';
import { PostFormBody } from '../controllers/post-form';
import { Repository } from '../repository';
import _ from 'lodash';

const makeAddPurchase = ({ repository }: { repository: Repository }) => {
  const execute = async ({ data }: { data: PostFormBody }) => {
    const formDataValues = _.omit(data, ['id']);

    const purchase = await repository.purchaseStore.create({
      data: {
        data: JSON.stringify(formDataValues),
        userId: USER_ID
      }
    });

    return purchase;
  };

  return { execute };
};

export default makeAddPurchase;

export type AddPurchase = ReturnType<typeof makeAddPurchase>;
